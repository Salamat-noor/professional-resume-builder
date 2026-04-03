"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  Resume,
  AIResponse,
  ATSAnalysis,
  CoverLetter,
  ImprovementType,
} from "@/lib/ai";

// Generic fetch helper
async function fetchAI<T>(endpoint: string, body: unknown): Promise<T> {
  const response = await fetch(`/api/ai/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || `AI request failed: ${response.status}`);
  }

  return response.json();
}

// Query keys for caching
export const aiKeys = {
  all: ["ai"] as const,
  tailor: (jobDesc: string) => [...aiKeys.all, "tailor", jobDesc.slice(0, 50)] as const,
  ats: (resumeId: string) => [...aiKeys.all, "ats", resumeId] as const,
  coverLetter: (company: string) => [...aiKeys.all, "cover-letter", company] as const,
};

// ==================== Resume Tailor ====================

interface TailorVariables {
  jobDescription: string;
  resume: Resume;
}

export function useResumeTailor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobDescription, resume }: TailorVariables) =>
      fetchAI<AIResponse>("tailor", { jobDescription, resume }),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: aiKeys.all });
    },
  });
}

// ==================== AI Chat with Memory ====================

interface ChatVariables {
  question: string;
  resume: Resume | null;
  sessionId?: string;
}

interface ChatResponse extends AIResponse {
  sessionId: string;
}

export function useAIChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ question, resume, sessionId }: ChatVariables) =>
      fetchAI<ChatResponse>("chat", { question, resume, sessionId }),
    onSuccess: (data) => {
      // Cache chat history by session
      if (data.sessionId) {
        queryClient.setQueryData(
          [...aiKeys.all, "chat", data.sessionId],
          (old: ChatResponse[] = []) => [...old, data]
        );
      }
    },
  });
}

// ==================== ATS Analysis ====================

interface ATSVariables {
  resume: Resume;
  jobDescription?: string;
  targetRole?: string;
  resumeId?: string;
}

export function useATSAnalysis() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ resume, jobDescription, targetRole }: ATSVariables) =>
      fetchAI<ATSAnalysis>("ats", {
        resume,
        jobDescription,
        targetRole,
        mode: jobDescription ? "full" : "quick",
      }),
    onSuccess: (data, variables) => {
      // Cache ATS results
      if (variables.resumeId) {
        queryClient.setQueryData(
          aiKeys.ats(variables.resumeId),
          data
        );
      }
    },
  });
}

// ==================== Cover Letter ====================

interface CoverLetterVariables {
  resume: Resume;
  jobDescription: string;
  company: string;
  hiringManager?: string;
  tone?: string;
}

export function useCoverLetter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ resume, jobDescription, company, hiringManager, tone }: CoverLetterVariables) =>
      fetchAI<CoverLetter>("cover-letter", {
        resume,
        jobDescription,
        company,
        hiringManager,
        tone,
      }),
    onSuccess: (data, variables) => {
      // Cache cover letter by company
      queryClient.setQueryData(
        aiKeys.coverLetter(variables.company),
        data
      );
    },
  });
}

// ==================== Resume Improvement ====================

interface ImproveVariables {
  section: string;
  content: string;
  improvementType: ImprovementType;
  currentResume: Resume;
}

export function useResumeImprove() {
  return useMutation({
    mutationFn: ({ section, content, improvementType, currentResume }: ImproveVariables) =>
      fetchAI<AIResponse>("improve", {
        section,
        content,
        improvementType,
        currentResume,
      }),
  });
}

// ==================== Streaming Support ====================

interface StreamCallbacks {
  onChunk?: (chunk: string) => void;
  onComplete?: (fullText: string) => void;
  onError?: (error: Error) => void;
}

export function useStreamingAI() {
  const streamChat = async (
    question: string,
    resume: Resume | null,
    callbacks: StreamCallbacks,
    sessionId?: string
  ) => {
    try {
      const response = await fetch("/api/ai/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, resume, sessionId }),
      });

      if (!response.ok) {
        throw new Error(`Streaming request failed: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      if (!reader) {
        throw new Error("No response body");
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        callbacks.onChunk?.(chunk);
      }

      callbacks.onComplete?.(fullText);
      return fullText;
    } catch (error) {
      const err = error instanceof Error ? error : new Error("Streaming failed");
      callbacks.onError?.(err);
      throw err;
    }
  };

  return { streamChat };
}
