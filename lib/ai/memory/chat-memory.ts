import { AIMessage, HumanMessage, SystemMessage, BaseMessage } from "@langchain/core/messages";

// Message type for storage
interface StoredMessage {
  role: "system" | "human" | "ai";
  content: string;
  timestamp: number;
}

// In-memory store for chat sessions (use Redis in production)
const sessionStore = new Map<string, StoredMessage[]>();

// System message for resume assistant
const SYSTEM_MESSAGE: StoredMessage = {
  role: "system",
  content: `You are an expert resume writer and career coach with 20 years of experience. 
You help users improve their resumes, tailor them to job descriptions, and provide career advice.
Maintain context from previous messages to provide personalized, continuous assistance.`,
  timestamp: Date.now(),
};

export interface ChatSession {
  sessionId: string;
  messages: StoredMessage[];
}

// Create or retrieve a chat session
export function getOrCreateSession(sessionId?: string): ChatSession {
  const id = sessionId || generateSessionId();
  
  if (!sessionStore.has(id)) {
    sessionStore.set(id, [SYSTEM_MESSAGE]);
  }

  return { sessionId: id, messages: sessionStore.get(id)! };
}

// Add messages to session
export async function addMessagesToSession(
  sessionId: string,
  humanMessage: string,
  aiMessage: string
): Promise<void> {
  const messages = sessionStore.get(sessionId);
  if (!messages) return;

  messages.push({
    role: "human",
    content: humanMessage,
    timestamp: Date.now(),
  });
  messages.push({
    role: "ai",
    content: aiMessage,
    timestamp: Date.now(),
  });
}

// Convert stored messages to LangChain messages
export function toLangChainMessages(messages: StoredMessage[]): BaseMessage[] {
  return messages.map((msg) => {
    switch (msg.role) {
      case "system":
        return new SystemMessage(msg.content);
      case "human":
        return new HumanMessage(msg.content);
      case "ai":
        return new AIMessage(msg.content);
      default:
        return new HumanMessage(msg.content);
    }
  });
}

// Get chat history for a session
export function getChatHistory(sessionId: string): StoredMessage[] {
  return sessionStore.get(sessionId) || [];
}

// Get LangChain format history
export function getLangChainHistory(sessionId: string): BaseMessage[] {
  const messages = sessionStore.get(sessionId);
  if (!messages) return [];
  return toLangChainMessages(messages);
}

// Clear a session
export function clearSession(sessionId: string): void {
  sessionStore.delete(sessionId);
}

// Generate unique session ID
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// Get all active sessions (for admin/debugging)
export function getActiveSessions(): string[] {
  return Array.from(sessionStore.keys());
}
