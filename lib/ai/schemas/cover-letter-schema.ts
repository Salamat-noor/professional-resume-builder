import z from "zod";

export const CoverLetterSchema = z.object({
  content: z.string().describe("Full cover letter text"),
  highlights: z.array(z.string()).describe("Key points emphasized in the letter"),
});


export type CoverLetter = z.infer<typeof CoverLetterSchema>;
