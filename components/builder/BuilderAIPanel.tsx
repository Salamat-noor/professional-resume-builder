"use client";

import { Resume } from "@/types/builder";
import { useEffect, useRef, useState, useCallback } from "react";
import { useAIChat, useResumeImprove } from "@/hooks/useAI";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  resume: Resume | null;
  setResume: React.Dispatch<React.SetStateAction<Resume>>;
}

export function BuilderAIPanel({ resume, setResume }: Props) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; content: string }[]
  >([]);
  const [sessionId, setSessionId] = useState<string | undefined>();

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Use new AI hooks
  const { mutate: sendMessage, isPending: chatLoading } = useAIChat();
  const { mutate: improveResume, isPending: improveLoading } = useResumeImprove();

  const loading = chatLoading || improveLoading;

  // Load messages on mount
  useEffect(() => {
    const stored = localStorage.getItem("chatMessages");
    const storedSession = localStorage.getItem("chatSessionId");
    if (stored) setMessages(JSON.parse(stored));
    if (storedSession) setSessionId(storedSession);
  }, []);

  // Save messages whenever they change
  useEffect(() => {
    if (messages?.length > 0) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  // Save session ID
  useEffect(() => {
    if (sessionId) {
      localStorage.setItem("chatSessionId", sessionId);
    }
  }, [sessionId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Handle quick action clicks
  const handleQuickAction = useCallback((action: string) => {
    if (!resume) return;

    const prompts: Record<string, string> = {
      "Improve Writing": "Please improve the writing in my resume to be more professional and impactful",
      "Add Metrics": "Help me add quantifiable metrics and achievements to my resume",
      "Match Job": "I want to tailor my resume for a specific job. What should I focus on?",
      "Expand Details": "Please help me expand the details in my work experience sections",
    };

    setInput(prompts[action] || "");
  }, [resume]);

  async function handleSendQuery() {
    if (!input.trim() || !resume) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");

    // Use non-streaming version for now since streaming doesn't return structured data
    sendMessage(
      { question: userMessage, resume, sessionId },
      {
        onSuccess: (data) => {
          setMessages((prev) => [
            ...prev,
            { role: "ai", content: data.message },
          ]);

          // Update resume if returned
          if (data.resume) {
            setResume((prev) => ({
              ...prev,
              contact: data.resume.contact || prev.contact,
              summary: data.resume.summary || prev.summary,
              experience: data.resume.experience || prev.experience,
              education: data.resume.education || prev.education,
              skills: data.resume.skills || prev.skills,
            }));
          }

          // Update session ID
          if (data.sessionId) {
            setSessionId(data.sessionId);
          }
        },
        onError: () => {
          setMessages((prev) => [
            ...prev,
            { role: "ai", content: "⚠️ Something went wrong." },
          ]);
        },
      }
    );
  }

  return (
    <div className="p-4 flex flex-col gap-4 h-full min-h-0">
      {/* QUICK ACTIONS */}
      <div className="shrink-0">
        <p className="text-xs font-semibold text-foreground mb-2.5">
          Quick Actions
        </p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: "ri-magic-line", label: "Improve Writing" },
            { icon: "ri-bar-chart-line", label: "Add Metrics" },
            { icon: "ri-briefcase-line", label: "Match Job" },
            { icon: "ri-expand-up-down-line", label: "Expand Details" },
          ].map((a) => (
            <Button
              key={a.label}
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction(a.label)}
              className="justify-start gap-2 h-auto py-2.5"
            >
              <i className={`${a.icon} text-base`} />
              {a.label}
            </Button>
          ))}
        </div>
      </div>

      {/* CHAT AREA - takes remaining space */}
      <div className="flex-1 min-h-0 flex flex-col border border-border rounded-lg overflow-hidden">
        {/* Messages scroll area */}
        <div className="flex-1 min-h-0 px-3 py-4 space-y-3 overflow-y-auto">
          {messages.length === 0 && !loading && (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              <p>Start a conversation with AI...</p>
            </div>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] text-sm px-4 py-2 rounded-2xl shadow-sm transition-all duration-300 ease-in-out ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {(chatLoading || improveLoading) && (
            <div className="flex justify-start">
              <div className="bg-muted px-4 py-2 rounded-2xl text-sm text-muted-foreground flex items-center gap-2 animate-pulse">
                <span>Thinking...</span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* INPUT - fixed at bottom */}
        <div className="shrink-0 border-t border-border p-3 bg-card">
          <Textarea
            placeholder="Ask AI to improve your resume..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendQuery();
              }
            }}
            className="min-h-16 resize-none"
            rows={2}
          />
          <Button
            onClick={handleSendQuery}
            disabled={loading}
            className="w-full mt-2"
          >
            {loading ? "Generating..." : "Generate with AI"}
          </Button>
        </div>
      </div>

      {/* CREDITS */}
      <div className="shrink-0 text-center text-xs text-muted-foreground border-t border-border pt-3">
        <span className="font-medium text-foreground">8 AI credits</span>{" "}
        remaining today ·{" "}
        <Button variant="link" size="sm" className="h-auto p-0 text-primary">
          Upgrade
        </Button>
      </div>
    </div>
  );
}
