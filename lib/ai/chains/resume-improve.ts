import { RunnableSequence } from "@langchain/core/runnables";
import { groqModel } from "@/lib/ai/models/groq-model";
import { improveResumePrompt } from "@/lib/ai/prompts/improve-resume-prompts";
import { AIResponseSchema } from "@/lib/ai/schemas/resume-schemas";
import type { Resume, AIResponse } from "@/lib/ai/schemas/resume-schemas";

// Create structured output chain for resume improvement
export const resumeImproveChain = RunnableSequence.from([
  improveResumePrompt,
  groqModel.withStructuredOutput(AIResponseSchema, {
    name: "improved_resume",
  }),
]);

// Improvement types
export type ImprovementType = "IMPACT" | "CLARITY" | "EXPAND" | "PROFESSIONAL";

// Typed interface for chain input
export interface ImproveResumeInput {
  section: string;
  content: string;
  improvementType: ImprovementType;
  currentResume: Resume;
}

// Helper function with error handling
export async function improveResume(
  input: ImproveResumeInput
): Promise<AIResponse> {
  try {
    const result = await resumeImproveChain.invoke({
      section: input.section,
      content: input.content,
      improvementType: input.improvementType,
      resume: JSON.stringify(input.currentResume, null, 2),
    });
    return result;
  } catch (error) {
    console.error("Resume improvement failed:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to improve resume"
    );
  }
}
