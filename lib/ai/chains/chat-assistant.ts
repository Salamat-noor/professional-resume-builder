import { RunnableSequence } from "@langchain/core/runnables";
import { groqModel } from "@/lib/ai/models/groq-model";
import { resumeChatPrompt } from "@/lib/ai/prompts/resume-prompts";
import { AIResponseSchema } from "@/lib/ai/schemas/resume-schemas";
import type { Resume, AIResponse } from "@/lib/ai/schemas/resume-schemas";

// Chat assistant chain for general Q&A
export const chatAssistantChain = RunnableSequence.from([
  resumeChatPrompt,
  groqModel.withStructuredOutput(AIResponseSchema, {
    name: "chat_response",
  }),
]);

// Typed interface for chain input
export interface ChatInput {
  question: string;
  resume: Resume;
}

// Helper function with error handling
export async function chatWithAssistant(input: ChatInput): Promise<AIResponse> {
  try {
    const result = await chatAssistantChain.invoke({
      question: input.question,
      resume: JSON.stringify(input.resume, null, 2),
    });
    return result;
  } catch (error) {
    console.error("Chat assistant failed:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to get AI response"
    );
  }
}
