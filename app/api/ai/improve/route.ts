export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { improveResume, ImproveResumeInput, ImprovementType } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { section, content, improvementType, currentResume } = body;

    if (!section || typeof section !== "string") {
      return NextResponse.json(
        { error: "Section name is required" },
        { status: 400 }
      );
    }

    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { error: "Content to improve is required" },
        { status: 400 }
      );
    }

    if (!currentResume || typeof currentResume !== "object") {
      return NextResponse.json(
        { error: "Current resume data is required" },
        { status: 400 }
      );
    }

    const validTypes: ImprovementType[] = ["IMPACT", "CLARITY", "EXPAND", "PROFESSIONAL"];
    const type = validTypes.includes(improvementType) ? improvementType : "IMPACT";

    const input: ImproveResumeInput = {
      section,
      content,
      improvementType: type,
      currentResume,
    };

    const result = await improveResume(input);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Resume improvement API error:", error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Failed to improve resume" 
      },
      { status: 500 }
    );
  }
}
