import { RunnableSequence } from "@langchain/core/runnables";
import { groqModel } from "@/lib/ai/models/groq-model";
import { AIResponseSchema } from "@/lib/ai/schemas/resume-schemas";
import type { Resume, AIResponse } from "@/lib/ai/schemas/resume-schemas";
import {
  getOrCreateSession,
  addMessagesToSession,
  getLangChainHistory,
  clearSession,
} from "@/lib/ai/memory/chat-memory";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";

// Create prompt template with memory - exported for use in streaming route
export const chatPromptWithMemory = ChatPromptTemplate.fromMessages([
  ["system", `You are an expert resume writer and career coach with 20 years of experience helping professionals secure jobs at top-tier companies.

Your expertise includes:
- ATS optimization and keyword matching
- Quantifying achievements with metrics
- Tailoring resumes to specific job descriptions
- Industry-specific best practices
- Clear, impactful writing

{templateContext}

Current Resume Data:
{resume}

IMPORTANT INSTRUCTIONS:
1. Only fill sections that are listed in the template schema above.
2. Keep existing data unless specifically asked to change it.
3. Return the complete resume object with your changes.
4. For empty/missing sections, provide realistic placeholder content if asked to add content.

Use the conversation history to maintain context and provide personalized assistance.`],
  new MessagesPlaceholder("history"),
  ["human", "{input}"],
]);

// Typed interface for chain input
export interface ChatWithMemoryInput {
  question: string;
  resume: Resume | null;
  sessionId?: string;
  templateContext?: string;
}

// Typed interface for chain output
export interface ChatWithMemoryOutput extends AIResponse {
  sessionId: string;
}

// Main chat function with memory
export async function chatWithMemory(
  input: ChatWithMemoryInput
): Promise<ChatWithMemoryOutput> {
  try {
    // Get or create session
    const { sessionId } = getOrCreateSession(input.sessionId);

    // Get conversation history in LangChain format
    const history = getLangChainHistory(sessionId);

    // Create chain with memory
    const chain = RunnableSequence.from([
      chatPromptWithMemory,
      groqModel.withStructuredOutput(AIResponseSchema, {
        name: "chat_response",
      }),
    ]);

    // Invoke chain with history
    const result = await chain.invoke({
      history: history,
      input: input.question,
      resume: input.resume ? JSON.stringify(input.resume, null, 2) : "No resume provided",
      templateContext: input.templateContext || "No template context provided - use all available sections.",
    });

    // Add messages to session history
    await addMessagesToSession(sessionId, input.question, result.message);

    return {
      ...result,
      sessionId,
    };
  } catch (error) {
    console.error("Chat with memory failed:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to get AI response"
    );
  }
}

// Get conversation history for a session
export function getSessionHistory(sessionId: string) {
  return getLangChainHistory(sessionId);
}

// Clear conversation history
export function clearChatSession(sessionId: string): void {
  clearSession(sessionId);
}
