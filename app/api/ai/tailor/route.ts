export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { tailorResume, TailorResumeInput } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { jobDescription, resume } = body;

    if (!jobDescription || typeof jobDescription !== "string") {
      return NextResponse.json(
        { error: "Job description is required" },
        { status: 400 }
      );
    }

    if (!resume || typeof resume !== "object") {
      return NextResponse.json(
        { error: "Resume data is required" },
        { status: 400 }
      );
    }

    const input: TailorResumeInput = {
      jobDescription,
      resume,
    };

    const result = await tailorResume(input);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Resume tailoring API error:", error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Failed to tailor resume" 
      },
      { status: 500 }
    );
  }
}
