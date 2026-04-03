export const runtime = "nodejs";

import { groqModel } from "@/lib/ai/models/groq-model";
import { chatPromptWithMemory } from "@/lib/ai/chains/chat-assistant-with-memory";
import {
  getOrCreateSession,
  addMessagesToSession,
  getLangChainHistory,
} from "@/lib/ai/memory/chat-memory";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, resume, sessionId } = body;

    if (!question || typeof question !== "string") {
      return new Response("Question is required", { status: 400 });
    }

    // Get or create session
    const { sessionId: sid } = getOrCreateSession(sessionId);
    const history = getLangChainHistory(sid);

    // Create streaming chain
    const chain = RunnableSequence.from([
      chatPromptWithMemory,
      groqModel,
      new StringOutputParser(),
    ]);

    // Create stream
    const stream = await chain.stream({
      history: history,
      input: question,
      resume: resume ? JSON.stringify(resume, null, 2) : "No resume provided",
    });

    // Create readable stream
    const readableStream = new ReadableStream({
      async start(controller) {
        let fullResponse = "";

        try {
          for await (const chunk of stream) {
            fullResponse += chunk;
            controller.enqueue(new TextEncoder().encode(chunk));
          }

          // Store the conversation after streaming completes
          await addMessagesToSession(sid, question, fullResponse);

          // Send session ID at the end
          controller.enqueue(
            new TextEncoder().encode(`\n\n__SESSION_ID__:${sid}`)
          );

          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Streaming chat API error:", error);
    return new Response(
      error instanceof Error ? error.message : "Streaming failed",
      { status: 500 }
    );
  }
}
