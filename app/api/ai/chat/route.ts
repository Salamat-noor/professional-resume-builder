import { NextRequest, NextResponse } from "next/server";
import { chatWithMemory, type ChatWithMemoryInput } from "@/lib/ai/chains/chat-assistant-with-memory";
import { ResumeSchema } from "@/lib/ai/schemas/resume-schemas";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, resume, sessionId }: ChatWithMemoryInput= body;

    if (!question || !resume) {
      return NextResponse.json(
        { error: "Question and resume are required" },
        { status: 400 }
      );
    }

    const parsedResume = ResumeSchema.safeParse(resume);
    if (!parsedResume.success) {
      return NextResponse.json(
        { error: "Resume payload is invalid" },
        { status: 400 }
      );
    }
    const sanitizedResume = parsedResume.data;

    const input: ChatWithMemoryInput = {
      question,
      resume: sanitizedResume,
      sessionId,
    };

    const result = await chatWithMemory(input);

    return NextResponse.json({
      message: result.message,
      resume: result?.resume,
      sessionId: result.sessionId,
    });
  } catch (error) {
    console.error("AI chat error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to process AI request",
        message: "Sorry, I encountered an error. Please try again.",
      },
      { status: 500 }
    );
  }
}
