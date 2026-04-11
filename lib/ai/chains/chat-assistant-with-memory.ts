// lib/ai/chains/chat-assistant-with-memory.ts
import { RunnableLambda, RunnableSequence } from "@langchain/core/runnables";
import { tool } from "@langchain/core/tools";
import {
  AIMessage,
  BaseMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { z } from "zod";

import { groqModel } from "@/lib/ai/models/groq-model";
import { AIResponse, AIResponseSchema } from "@/lib/ai/schemas/resume-schemas";
import {
  getOrCreateSession,
  addMessagesToSession,
  getLangChainHistory,
} from "@/lib/ai/memory/chat-memory";
import type { AIChatResponse, ChatWithMemoryInput, Resume } from "@/types/builder";
import { FINAL_RESPONSE_PROMPT, TOOL_ROUTER_PROMPT } from "../prompts/resume-prompts";

type StepOne = {
  conversation: BaseMessage[];
  resume: Resume | null;
};

type StepTwo = StepOne & {
  routerResponse: AIMessage;
};

type StepThree = {
  thread: BaseMessage[];
};

function makeGetResumeTool(resume: Resume | null) {
  return tool(
    async () => {
      if (!resume) {
        return JSON.stringify({
          ok: false,
          message: "No resume on file. Ask the user to share their details.",
          resume: null,
        });
      }

      return JSON.stringify({
        ok: true,
        message: "Current resume loaded.",
        resume,
      });
    },
    {
      name: "get_resume",
      description:
        "Fetch the user's current resume. Use when the user wants to read, review, edit, update, improve, or tailor the resume for a role or company.",
      schema: z.object({}).strict(),
    }
  );
}

const buildConversation = RunnableLambda.from(
  ({ question, history, resume }: ChatWithMemoryInput & { history: BaseMessage[] }): StepOne => {
    return {
      conversation: [...history, new HumanMessage(question)],
      resume,
    };
  }
);

const callToolRouter = RunnableLambda.from(
  async ({ conversation, resume }: StepOne): Promise<StepTwo> => {
    const toolEnabledModel = groqModel.bindTools([makeGetResumeTool(resume)]);

    const routerResponse = (await toolEnabledModel.invoke([
      new SystemMessage(TOOL_ROUTER_PROMPT),
      ...conversation,
    ])) as AIMessage;

    return { conversation, resume, routerResponse };
  }
);

const executeToolsIfNeeded = RunnableLambda.from(
  async ({ conversation, resume, routerResponse }: StepTwo): Promise<StepThree> => {
    const thread: BaseMessage[] = [...conversation, routerResponse];
    const toolCalls = routerResponse.tool_calls ?? [];

    for (const toolCall of toolCalls) {
      if (toolCall.name === "get_resume") {
        const toolMessage = await makeGetResumeTool(resume).invoke(toolCall);
        thread.push(toolMessage);
      }
    }

    return { thread };
  }
);

const finalStructuredModel = groqModel.withStructuredOutput(AIResponseSchema, {
  name: "resume_chat_response",
  method: "jsonSchema",
  includeRaw: true,
});

const callFinalStructuredModel = RunnableLambda.from(
  async ({ thread }: StepThree) => {
    return finalStructuredModel.invoke([
      new SystemMessage(FINAL_RESPONSE_PROMPT),
      ...thread,
    ]);
  }
);

const validateOutput = RunnableLambda.from(
  (result: { parsed: unknown; raw: unknown; parsing_error?: string }) => {
    if (result.parsing_error) {
      throw new Error(`LLM parse error: ${result.parsing_error}`);
    }

    if (!result.parsed) {
      throw new Error("No structured output parsed from model response");
    }

    return result.parsed as AIResponse;
  }
);

const agentChain = RunnableSequence.from([
  buildConversation,
  callToolRouter,
  executeToolsIfNeeded,
  callFinalStructuredModel,
  validateOutput,
]);

export async function chatWithMemory(
  input: ChatWithMemoryInput
): Promise<AIChatResponse> {
  const { sessionId } = getOrCreateSession(input.sessionId);
  const history = getLangChainHistory(sessionId);

  console.log("history",history)

  const result = await agentChain.invoke({ ...input, history });

  await addMessagesToSession(sessionId, input.question, result.message);

  return {
    message: result.message,
    resume: result.resume,
    sessionId,
  };
}