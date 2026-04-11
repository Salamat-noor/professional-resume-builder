import z from "zod";

// ATS Analysis schema
export const ATSAnalysisSchema = z.object({
  score: z.number().min(0).max(100).describe("ATS compatibility score"),
  keywords: z.array(z.object({
    keyword: z.string(),
    found: z.boolean(),
    importance: z.enum(["high", "medium", "low"]),
  })).describe("Keywords from job description and their presence in resume"),
  suggestions: z.array(z.object({
    category: z.enum(["keywords", "formatting", "content", "structure"]),
    issue: z.string(),
    recommendation: z.string(),
  })).describe("Specific improvements to increase ATS score"),
  summary: z.string().describe("Brief overall assessment"),
});

export type ATSAnalysis = z.infer<typeof ATSAnalysisSchema>;
