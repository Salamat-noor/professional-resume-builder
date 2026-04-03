export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { chatWithMemory, ChatWithMemoryInput } from "@/lib/ai/chains/chat-assistant-with-memory";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, resume, sessionId } = body;

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    const input: ChatWithMemoryInput = {
      question,
      resume: resume || null,
      sessionId,
    };

    const result = await chatWithMemory(input);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Failed to get AI response" 
      },
      { status: 500 }
    );
  }
}
