import { RunnableSequence } from "@langchain/core/runnables";
import { groqModel } from "@/lib/ai/models/groq-model";
import {
  AIResponseSchema,
  type Resume,
} from "@/lib/ai/schemas/resume-schemas";
import {
  getOrCreateSession,
  // addMessagesToSession,
  getLangChainHistory,
  clearSession,
} from "@/lib/ai/memory/chat-memory";
import { resumeEditPrompt } from "../prompts/resume-prompts";
import { type AIChatResponse } from "@/types/builder";

// Typed interface for chain input
export interface ChatWithMemoryInput {
  question: string;
  resume: Resume;
  sessionId?: string;
}

// Main chat function with memory
export async function chatWithMemory(
  input: ChatWithMemoryInput
): Promise<AIChatResponse> {
  // Get or create session
  const { sessionId } = getOrCreateSession(input.sessionId);

  try {
    // const history = getLangChainHistory(sessionId);

    const updateChain = RunnableSequence.from([
      resumeEditPrompt,
      groqModel.withStructuredOutput(AIResponseSchema, {
        name: "resume_chat_response",
      }),
    ]);

    const result = await updateChain.invoke({
      question: input.question,
      resume: input.resume,
    });

    // await addMessagesToSession(sessionId, input.question, result?.message);

    return { ...result, sessionId };
  } catch (error) {
    console.error("Chat with memory failed:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to get AI response";

    throw new Error(
      errorMessage
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
