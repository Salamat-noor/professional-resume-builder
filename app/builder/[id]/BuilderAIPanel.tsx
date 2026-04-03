"use client";
import { Resume } from "@/types/builder";
import { useEffect, useRef, useState, useCallback } from "react";
import { useAIChat, useResumeImprove } from "@/lib/hooks/useAI";

const suggestions = [
  {
    type: "IMPACT",
    original: "Led team to grow revenue",
    improved:
      "Spearheaded cross-functional team of 14 to drive 42% ARR growth through data-driven product strategy",
    score: "+38% impact",
  },
  {
    type: "CLARITY",
    original: "Worked on payments product",
    improved:
      "Owned end-to-end payments SDK product, adopted by 8,000+ enterprise customers within 12 months of launch",
    score: "+52% clarity",
  },
];

interface Props {
  resume: Resume | null;
  setResume: React.Dispatch<React.SetStateAction<Resume>>;
}

export default function BuilderAIPanel({ resume, setResume }: Props) {
  const [input, setInput] = useState("");
  const [applied, setApplied] = useState<number[]>([]);
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

  // Handle suggestion apply
  const handleApplySuggestion = useCallback((index: number, improved: string) => {
    setApplied((prev) => [...prev, index]);
    // Apply the improvement to the resume
    if (resume) {
      setResume((prev) => ({
        ...prev,
        summary: improved,
      }));
    }
  }, [resume, setResume]);

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
    <div className="p-4 flex flex-col gap-4 h-full">
      {/* QUICK ACTIONS */}
      <div>
        <p className="text-xs font-semibold text-gray-700 mb-2.5">
          Quick Actions
        </p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: "ri-magic-line", label: "Improve Writing" },
            { icon: "ri-bar-chart-line", label: "Add Metrics" },
            { icon: "ri-briefcase-line", label: "Match Job" },
            { icon: "ri-expand-up-down-line", label: "Expand Details" },
          ].map((a) => (
            <button
              key={a.label}
              onClick={() => handleQuickAction(a.label)}
              className="flex items-center gap-2 border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 rounded-xl px-3 py-2.5 text-xs font-medium transition-all cursor-pointer"
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <i className={`${a.icon}`}></i>
              </div>
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* AI SUGGESTIONS */}
      <div>
        <p className="text-xs font-semibold text-gray-700 mb-2.5">
          AI Suggestions
        </p>
        <div className="space-y-3">
          {suggestions.map((s, i) => (
            <div
              key={i}
              className={`border rounded-xl p-3.5 transition-all ${
                applied.includes(i)
                  ? "border-green-200 bg-green-50"
                  : "border-gray-200"
              }`}
            >
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  s.type === "IMPACT"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {s.type}
              </span>
              <p className="text-xs text-gray-400 line-through mt-2">
                {s.original}
              </p>
              <p className="text-xs text-gray-800 mt-1 bg-yellow-50 p-2 rounded-lg leading-relaxed geist-mono-font">
                {s.improved}
              </p>
              <p className="text-xs text-green-600 font-semibold mt-1">
                {s.score}
              </p>
              {!applied.includes(i) ? (
                <div className="flex gap-2 mt-2.5">
                  <button
                    onClick={() => handleApplySuggestion(i, s.improved)}
                    className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 cursor-pointer whitespace-nowrap"
                  >
                    Apply
                  </button>
                  <button className="text-xs text-gray-400 hover:text-gray-600 px-2 cursor-pointer whitespace-nowrap">
                    Dismiss
                  </button>
                </div>
              ) : (
                <p className="text-xs text-green-600 mt-2 font-medium">
                  ✓ Applied
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col border-t border-gray-100 rounded-lg">
        <div className="flex-1 px-3 py-4 space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`geist-mono-font max-w-[75%] text-sm px-4 py-2 rounded-2xl shadow-sm transition-all duration-300 ease-in-out fade-in ${
                  m.role === "user"
                    ? "bg-indigo-600 text-white rounded-br-sm"
                    : "bg-gray-100 text-gray-800 rounded-bl-sm"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {(chatLoading || improveLoading) && (
            <div className="flex justify-start">
              <div className="geist-mono-font bg-gray-100 px-4 py-2 rounded-2xl text-sm text-gray-500 flex items-center gap-2 animate-slide-up">
                <span>Thinking...</span>
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
        <div className="border-t border-gray-100 p-3 bg-white sticky bottom-0">
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
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm geist-mono-font focus:outline-none focus:border-indigo-500 resize-none transition"
          />
          <button
            onClick={handleSendQuery}
            disabled={loading}
            className="w-full mt-2 bg-indigo-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate with AI"}
          </button>
        </div>
      </div>

      {/* CREDITS */}
      <div className="text-center text-xs text-gray-400 border-t border-gray-100 pt-3">
        <span className="font-medium text-gray-600">8 AI credits</span>{" "}
        remaining today ·{" "}
        <button className="text-indigo-500 hover:underline cursor-pointer whitespace-nowrap">
          Upgrade
        </button>
      </div>
    </div>
  );
}
