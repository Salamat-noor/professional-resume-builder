import { RunnableSequence } from "@langchain/core/runnables";
import { groqModel } from "@/lib/ai/models/groq-model";
import {
  ChatAIResponse,
  ChatAIResponseSchema,
  type Resume,
} from "@/lib/ai/schemas/resume-schemas";
import {
  getOrCreateSession,
  addMessagesToSession,
  getLangChainHistory,
  clearSession,
} from "@/lib/ai/memory/chat-memory";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";

function isStructuredOutputError(message: string): boolean {
  const signals = [
    "OUTPUT_PARSING_FAILURE",
    "Failed to parse",
    "json_validate_failed",
    "Failed to generate JSON",
    "invalid_request_error",
  ];
  return signals.some((signal) => message.includes(signal));
}

// Structured update prompt
export const updateChatPromptWithMemory = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are ResumeForge AI — an expert resume strategist and ATS specialist.

ROUTING:
- User wants edits (improve/fix/optimize/rewrite/polish) → shouldUpdateResume=true, apply changes
- User wants advice (review/suggest/analyze/what's missing) → shouldUpdateResume=false, give numbered tips
- Unclear → ask one clarifying question, shouldUpdateResume=false

WRITING RULES:
- Bullets: [Power Verb] + [What] + [How] + [Result/Scope], 15–25 words, past tense (present for current role)
- No pronouns. No "Responsible for / Helped with / Worked on"
- Summary: 3–4 sentences, no clichés, embed 3–5 ATS keywords
- Never fabricate metrics, skills, or URLs not mentioned by user
- Only modify what the user requests — leave everything else untouched

{templateContext}
Resume: {resume}`,
  ],
  new MessagesPlaceholder("history"),
  ["human", "{input}"],
]);

// Typed interface for chain input
export interface ChatWithMemoryInput {
  question: string;
  resume: Resume;
  sessionId?: string;
  templateContext: string;
}

// Typed interface for chain output
export interface ChatWithMemoryOutput extends ChatAIResponse {
  sessionId: string;
}

// Main chat function with memory
export async function chatWithMemory(
  input: ChatWithMemoryInput
): Promise<ChatWithMemoryOutput> {
  // Get or create session
  const { sessionId } = getOrCreateSession(input.sessionId);

  const resumeContext = input.resume
    ? JSON.stringify(input.resume, null, 2)
    : "No resume provided";

  try {
    // Get conversation history in LangChain format
    const history = getLangChainHistory(sessionId);

    const updateChain = RunnableSequence.from([
      updateChatPromptWithMemory,
      groqModel.withStructuredOutput(ChatAIResponseSchema, {
        name: "chat_response",
      }),
    ]);

    const result = await updateChain.invoke({
      history,
      input: input.question,
      resume: resumeContext,
      templateContext:
        input.templateContext ||
        "No template context provided - use all available sections.",
    });

    const shouldUpdateResume = Boolean(result?.resume);
    const message =
      result?.message?.trim() ||
      "Updated. Let me know if you want another variation.";

    const normalizedResult: ChatAIResponse = {
      message,
      shouldUpdateResume,
      resume: shouldUpdateResume ? result?.resume : null,
    };

    await addMessagesToSession(sessionId, input.question, normalizedResult.message);

    return { ...normalizedResult, sessionId };
  } catch (error) {
    console.error("Chat with memory failed:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to get AI response";

    // Graceful fallback for JSON/structured-output failures.
    if (isStructuredOutputError(errorMessage)) {
      const fallbackMessage = "I had a response formatting hiccup. Ask again and I'll keep it concise.";

      await addMessagesToSession(sessionId, input.question, fallbackMessage);

      return {
        message: fallbackMessage,
        shouldUpdateResume: false,
        resume: null,
        sessionId,
      };
    }

    throw new Error(
      errorMessage
    );
  }
}

// Get conversation history for a session
export function getSessionHistory(sessionId: string) {
  return getLangChainHistory(sessionId);
}

// Clear conversation history
export function clearChatSession(sessionId: string): void {
  clearSession(sessionId);
}
