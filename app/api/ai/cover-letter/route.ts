export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { generateCoverLetter, GenerateCoverLetterInput, CoverLetterTone } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { resume, jobDescription, company, hiringManager, tone = "Professional" } = body;

    if (!resume || typeof resume !== "object") {
      return NextResponse.json(
        { error: "Resume data is required" },
        { status: 400 }
      );
    }

    if (!jobDescription || typeof jobDescription !== "string") {
      return NextResponse.json(
        { error: "Job description is required" },
        { status: 400 }
      );
    }

    if (!company || typeof company !== "string") {
      return NextResponse.json(
        { error: "Company name is required" },
        { status: 400 }
      );
    }

    const input: GenerateCoverLetterInput = {
      resume,
      jobDescription,
      company,
      hiringManager,
      tone: tone as CoverLetterTone,
    };

    const result = await generateCoverLetter(input);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Cover letter API error:", error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Failed to generate cover letter" 
      },
      { status: 500 }
    );
  }
}
