import { RunnableSequence } from "@langchain/core/runnables";
import { groqModel } from "@/lib/ai/models/groq-model";
import { tailorResumePrompt } from "@/lib/ai/prompts/resume-prompts";
import { AIResponseSchema } from "@/lib/ai/schemas/resume-schemas";
import type { Resume, AIResponse } from "@/lib/ai/schemas/resume-schemas";

// Create structured output chain for resume tailoring
export const resumeTailorChain = RunnableSequence.from([
  tailorResumePrompt,
  groqModel.withStructuredOutput(AIResponseSchema, {
    name: "tailored_resume",
  }),
]);

// Typed interface for chain input
export interface TailorResumeInput {
  jobDescription: string;
  resume: Resume;
}

// Typed interface for chain output
export type TailorResumeOutput = AIResponse;

// Helper function with error handling
export async function tailorResume(
  input: TailorResumeInput
): Promise<TailorResumeOutput> {
  try {
    const result = await resumeTailorChain.invoke({
      jobDescription: input.jobDescription,
      resume: JSON.stringify(input.resume, null, 2),
    });
    return result;
  } catch (error) {
    console.error("Resume tailoring failed:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to tailor resume"
    );
  }
}
