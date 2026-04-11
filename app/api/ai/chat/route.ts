import { NextRequest, NextResponse } from "next/server";
import { chatWithMemory } from "@/lib/ai/chains/chat-assistant-with-memory";
import type { ChatWithMemoryInput } from "@/types/builder";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, resume, sessionId }: ChatWithMemoryInput = body;

    if (!question?.trim() || !resume) {
      return NextResponse.json(
        { message: "Question and resume are required" },
        { status: 400 }
      );
    }

    const result = await chatWithMemory({
      question,
      resume,
      sessionId,
    });

    return NextResponse.json({
      message: result.message,
      resume: result.resume ?? null,
      sessionId: result.sessionId,
    });

  } catch (error) {
    console.error("AI chat error:", error);
    // ✅ consistent shape — frontend always gets { message, resume, sessionId }
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to process AI request" },
      { status: 500 }
    );
  }
}