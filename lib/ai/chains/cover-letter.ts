import { RunnableSequence } from "@langchain/core/runnables";
import { creativeModel } from "@/lib/ai/models/groq-model";
import { coverLetterPrompt } from "@/lib/ai/prompts/cover-letter-prompts";
import type { Resume } from "@/lib/ai/schemas/resume-schemas";
import { type CoverLetter, CoverLetterSchema } from "../schemas/cover-letter-schema";

// Cover letter generation chain
export const coverLetterChain = RunnableSequence.from([
  coverLetterPrompt,
  creativeModel.withStructuredOutput(CoverLetterSchema, {
    name: "cover_letter",
  }),
]);

// Tone options
export type CoverLetterTone = "Professional" | "Enthusiastic" | "Confident" | "Creative";

// Typed interface for chain input
export interface GenerateCoverLetterInput {
  resume: Resume;
  jobDescription: string;
  company: string;
  hiringManager?: string;
  tone: CoverLetterTone;
}

// Helper function with error handling
export async function generateCoverLetter(
  input: GenerateCoverLetterInput
): Promise<CoverLetter> {
  try {
    const result = await coverLetterChain.invoke({
      resume: JSON.stringify(input.resume, null, 2),
      jobDescription: input.jobDescription,
      company: input.company,
      hiringManager: input.hiringManager || "Hiring Manager",
      tone: input.tone,
    });
    return result;
  } catch (error) {
    console.error("Cover letter generation failed:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to generate cover letter"
    );
  }
}
