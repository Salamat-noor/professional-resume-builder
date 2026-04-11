"use client";
import { sampleResume } from "@/assets/templates";
import { AIChatMessage, AIChatResponse, type Resume } from "@/types/builder";
import { useEffect, useRef, useState } from "react";

interface Props {
  resume: Resume;
  setResume: React.Dispatch<React.SetStateAction<Resume>>;
}

const STORAGE_KEYS = {
  messages: "chatMessages",
  sessionId: "chatSessionId", // ✅ persist sessionId too
} as const;

const QUICK_ACTIONS = [
  {
    icon: "ri-magic-line",
    label: "Improve Writing",
    prompt:
      "Operation: improve_writing. Rewrite the resume for stronger clarity, action verbs, conciseness, and professionalism. Keep all facts unchanged.",
  },
  {
    icon: "ri-bar-chart-line",
    label: "Add Metrics",
    prompt:
      "Operation: add_metrics. Strengthen achievement statements with measurable impact only where supported by existing resume content.",
  },
  {
    icon: "ri-briefcase-line",
    label: "Match Job",
    prompt:
      "Operation: match_job. Improve ATS alignment using only existing resume content. Mention if a job description is needed for better tailoring.",
  },
  {
    icon: "ri-expand-up-down-line",
    label: "Expand Details",
    prompt:
      "Operation: expand_details. Make vague bullet points more specific using only details already present. Do not invent anything.",
  },
];

export function BuilderAIPanel({ resume, setResume }: Props) {
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [sessionId, setSessionId] = useState<string | undefined>();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<AIChatMessage[]>([]);

  // ✅ Restore BOTH messages and sessionId on mount
  useEffect(() => {
    const storedMessages = localStorage.getItem(STORAGE_KEYS.messages);
    const storedSessionId = localStorage.getItem(STORAGE_KEYS.sessionId);

    if (storedMessages) {
      try {
        setMessages(JSON.parse(storedMessages));
      } catch {
        localStorage.removeItem(STORAGE_KEYS.messages);
      }
    }
    if (storedSessionId) {
      setSessionId(storedSessionId);
    }
  }, []); // ✅ empty deps — run once on mount

  // ✅ Persist messages on change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEYS.messages, JSON.stringify(messages));
    }
  }, [messages]);

  // ✅ Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSendQuery() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: trimmed,
          resume,
          sessionId,
        }),
      });

      const data: AIChatResponse = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to get AI response");
      }

      const assistantMessage =
        data.message?.trim() ||
        "I hit a response issue. Please try asking again.";

      setMessages((prev) => [
        ...prev,
        { role: "ai", content: assistantMessage },
      ]);

      // ✅ Persist sessionId to localStorage immediately
      if (data.sessionId) {
        setSessionId(data.sessionId);
        localStorage.setItem(STORAGE_KEYS.sessionId, data.sessionId);
      }

      // ✅ Deep merge — replace whole resume since AI returns full object
      if (data.resume) {
        // ✅ double guard
        setResume((prev) => ({
          ...prev,
          ...data.resume,
          personalInfo: {
            ...prev.contact,
            ...(data.resume?.contact ?? {}),
          },
        }));
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "⚠️ Something went wrong.";
      setMessages((prev) => [...prev, { role: "ai", content: errorMessage }]);
    } finally {
      setLoading(false);
    }
  }

  const handleQuickAction = (prompt: string) => {
    setInput(prompt);
    // ✅ Use ref instead of querySelector
    setTimeout(() => textareaRef.current?.focus(), 0);
  };

  const handleClearChat = () => {
    localStorage.removeItem(STORAGE_KEYS.messages);
    localStorage.removeItem(STORAGE_KEYS.sessionId); // ✅ also clear sessionId
    setMessages([]);
    setSessionId(undefined);
  };

  const handleResetResume = () => setResume(sampleResume);

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
              <i className={action.icon} />
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
                className={`geist-mono-font max-w-[75%] text-sm px-4 py-2 rounded-2xl shadow-sm transition-all duration-300 ease-in-out fade-in whitespace-pre-wrap wrap-break-word ${
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
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* INPUT */}
        <div className="border-t border-border p-3 bg-background/95 backdrop-blur-sm sticky bottom-0">
          <textarea
            ref={textareaRef} // ✅ use ref
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
            disabled={loading || !input.trim()} // ✅ also disable when empty
            className="w-full mt-2 bg-primary text-primary-foreground text-sm font-semibold py-2 rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate with AI"}
          </button>

          <div className="flex gap-2 mt-3">
            <button
              onClick={handleClearChat}
              disabled={loading || messages.length === 0}
              className="flex-1 flex items-center justify-center gap-2 border border-border bg-card/40 hover:border-destructive/40 hover:bg-destructive/10 text-foreground hover:text-destructive rounded-lg px-3 py-2 text-xs font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="ri-delete-bin-line" />
              Clear Chat
            </button>
            <button
              onClick={handleResetResume}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 border border-border bg-card/40 hover:border-warning/40 hover:bg-warning/10 text-foreground hover:text-warning rounded-lg px-3 py-2 text-xs font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="ri-refresh-line" />
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
