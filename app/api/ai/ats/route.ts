export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { analyzeATS, quickScanATS, ATSAnalysisInput, ATSQuickScanInput } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { resume, jobDescription, targetRole, mode = "full" } = body;

    if (!resume || typeof resume !== "object") {
      return NextResponse.json(
        { error: "Resume data is required" },
        { status: 400 }
      );
    }

    let result;

    if (mode === "full" && jobDescription) {
      // Full ATS analysis with job description
      const input: ATSAnalysisInput = {
        resume,
        jobDescription,
      };
      result = await analyzeATS(input);
    } else {
      // Quick scan without job description
      const input: ATSQuickScanInput = {
        resume,
        targetRole,
      };
      result = await quickScanATS(input);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("ATS analysis API error:", error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Failed to analyze ATS" 
      },
      { status: 500 }
    );
  }
}
