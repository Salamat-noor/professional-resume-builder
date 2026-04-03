import { RunnableSequence } from "@langchain/core/runnables";
import { groqModel } from "@/lib/ai/models/groq-model";
import { atsAnalysisPrompt, atsQuickScanPrompt } from "@/lib/ai/prompts/ats-prompts";
import { ATSAnalysisSchema } from "@/lib/ai/schemas/resume-schemas";
import type { Resume, ATSAnalysis } from "@/lib/ai/schemas/resume-schemas";

// Full ATS analysis chain (with job description)
export const atsAnalysisChain = RunnableSequence.from([
  atsAnalysisPrompt,
  groqModel.withStructuredOutput(ATSAnalysisSchema, {
    name: "ats_analysis",
  }),
]);

// Quick ATS scan chain (without job description)
export const atsQuickScanChain = RunnableSequence.from([
  atsQuickScanPrompt,
  groqModel.withStructuredOutput(ATSAnalysisSchema, {
    name: "ats_quick_scan",
  }),
]);

// Typed interfaces
export interface ATSAnalysisInput {
  resume: Resume;
  jobDescription: string;
}

export interface ATSQuickScanInput {
  resume: Resume;
  targetRole?: string;
}

// Full ATS analysis with job description
export async function analyzeATS(input: ATSAnalysisInput): Promise<ATSAnalysis> {
  try {
    const result = await atsAnalysisChain.invoke({
      jobDescription: input.jobDescription,
      resume: JSON.stringify(input.resume, null, 2),
    });
    return result;
  } catch (error) {
    console.error("ATS analysis failed:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to analyze ATS compatibility"
    );
  }
}

// Quick ATS scan without job description
export async function quickScanATS(input: ATSQuickScanInput): Promise<ATSAnalysis> {
  try {
    const result = await atsQuickScanChain.invoke({
      resume: JSON.stringify(input.resume, null, 2),
      targetRole: input.targetRole || "Not specified",
    });
    return result;
  } catch (error) {
    console.error("ATS quick scan failed:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to perform ATS scan"
    );
  }
}
