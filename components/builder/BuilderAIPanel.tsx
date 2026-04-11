"use client";
import { sampleResume } from "@/assets/templates";
import { Resume } from "@/types/builder";
import { useEffect, useRef, useState } from "react";

interface Props {
  resume: Resume;
  setResume: React.Dispatch<React.SetStateAction<Resume>>;
}

interface ChatApiResponse {
  message?: string;
  resume?: Resume | null;
  sessionId?: string;
}
const QUICK_ACTIONS = [
  {
    icon: "ri-magic-line",
    label: "Improve Writing",
    prompt: "Operation: improve_writing. Rewrite the resume for stronger clarity, action verbs, conciseness, and professionalism. Keep all facts unchanged. Do not invent anything.",
  },
  {
    icon: "ri-bar-chart-line",
    label: "Add Metrics",
    prompt: "Operation: add_metrics. Strengthen achievement statements with measurable impact only where supported by the existing resume. Do not invent numbers. Mention missing metrics in the message.",
  },
  {
    icon: "ri-briefcase-line",
    label: "Match Job",
    prompt: "Operation: match_job. Improve ATS alignment and general relevance using only existing resume content. Do not invent new keywords, skills, or experience. Mention if a job description is needed for better tailoring.",
  },
  {
    icon: "ri-expand-up-down-line",
    label: "Expand Details",
    prompt: "Operation: expand_details. Make vague bullet points more specific using only details already present in the resume. Do not invent scope, tools, metrics, or responsibilities.",
  },
];
export function BuilderAIPanel({ resume, setResume }: Props) {
  const [sessionId, setSessionId] = useState<string | undefined>();

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; content: string }[]
  >([]);

  // 1️⃣ Load messages on mount
useEffect(() => {
  const stored = localStorage.getItem("chatMessages");
  if (stored) setMessages(JSON.parse(stored));
}, [setMessages]);

// 2️⃣ Save messages whenever they change
useEffect(() => {
  if (messages?.length > 0) {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }
}, [messages]);

// 3️⃣ Scroll to bottom on new messages
useEffect(() => {
  chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages, loading]);

  async function handleSendQuery() {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: userMessage,
          resume,
          sessionId,
        }),
      });

      const data: ChatApiResponse = await response.json();

      if (!response.ok) {
        const apiError = data?.message || "Failed to get AI response";
        throw new Error(apiError);
      }

      const assistantMessage =
        data.message?.trim() ||
        "I hit a response issue. Please try asking that one more time.";

      // Update messages with AI response
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: assistantMessage },
      ]);

      // Update session ID for conversation continuity
      if (data.sessionId) {
        setSessionId(data.sessionId);
      }

      // Update resume only when explicitly requested by server and payload is valid.
      if (data.resume) {
        setResume((prev) => ({...prev,...data.resume}));
      }
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "⚠️ Something went wrong.";
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: errorMessage },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const handleQuickAction = (prompt: string) => {
    setInput(prompt);
    // Set focus to textarea for better UX
    setTimeout(() => {
      document.querySelector<HTMLInputElement>('textarea[placeholder="Ask AI to improve your resume..."]')?.focus();
    }, 0);
  };

  const handleClearChat = () => {
    localStorage.removeItem("chatMessages");
    setMessages([]);
  };

  const handleResetResume = () => {
    setResume(sampleResume);
  };

  return (
    <div className="p-4 flex flex-col gap-4 h-full">
      {/* QUICK ACTIONS */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2.5">
          Quick Actions
        </p>
        <div className="grid grid-cols-2 gap-2">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.label}
              onClick={() => handleQuickAction(action.prompt)}
              disabled={loading}
              className="flex items-center gap-2 border border-border bg-card/40 hover:border-primary/40 hover:bg-primary/10 text-foreground hover:text-primary rounded-xl px-3 py-2.5 text-xs font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <i className={`${action.icon}`}></i>
              </div>
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col border-t border-border rounded-lg min-h-0">
        <div className="flex-1 px-3 py-4 space-y-3 overflow-y-auto">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`geist-mono-font max-w-[75%] text-sm px-4 py-2 rounded-2xl shadow-sm transition-all duration-300 ease-in-out fade-in ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted text-foreground border border-border/60 rounded-bl-sm"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="geist-mono-font bg-muted text-muted-foreground border border-border/60 px-4 py-2 rounded-2xl text-sm flex items-center gap-2 animate-slide-up">
                <span>Thinking</span>
                <span className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* INPUT */}
        <div className="border-t border-border p-3 bg-background/95 backdrop-blur-sm sticky bottom-0">
          <textarea
          rows={4}
            placeholder="Ask AI to improve your resume..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendQuery();
              }
            }}
            className="w-full border border-border bg-background text-foreground placeholder:text-muted-foreground rounded-lg px-3 py-2 text-sm geist-mono-font focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none transition"
          />
          <button
            onClick={handleSendQuery}
            disabled={loading}
            className="w-full mt-2 bg-primary text-primary-foreground text-sm font-semibold py-2 rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate with AI"}
          </button>

          {/* ACTION BUTTONS */}
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleClearChat}
              disabled={loading || messages.length === 0}
              className="flex-1 flex items-center justify-center gap-2 border border-border bg-card/40 hover:border-destructive/40 hover:bg-destructive/10 text-foreground hover:text-destructive rounded-lg px-3 py-2 text-xs font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              title="Clear chat history"
            >
              <i className="ri-delete-bin-line"></i>
              Clear Chat
            </button>
            <button
              onClick={handleResetResume}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 border border-border bg-card/40 hover:border-warning/40 hover:bg-warning/10 text-foreground hover:text-warning rounded-lg px-3 py-2 text-xs font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              title="Reset to initial resume"
            >
              <i className="ri-refresh-line"></i>
              Reset Resume
            </button>
          </div>
        </div>
      </div>

      {/* CREDITS */}
      <div className="text-center text-xs text-muted-foreground border-t border-border pt-3">
        <span className="font-medium text-foreground">8 AI credits</span>{" "}
        remaining today ·{" "}
        <button className="text-primary hover:underline cursor-pointer whitespace-nowrap">
          Upgrade
        </button>
      </div>
    </div>
  );
}
