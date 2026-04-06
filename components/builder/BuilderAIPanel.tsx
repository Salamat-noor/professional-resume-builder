"use client";
import { Resume } from "@/types/builder";
import { useEffect, useRef, useState } from "react";

interface Props {
  resume: Resume;
  setResume: React.Dispatch<React.SetStateAction<Resume>>;
}

export function BuilderAIPanel(_props: Props) {
  void _props;
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; content: string }[]
  >([]);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // 1️⃣ Load messages on mount
useEffect(() => {
  const stored = localStorage.getItem("chatMessages");
  if (stored) setMessages(JSON.parse(stored));
}, []);

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

      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "AI is not integrated yet" },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "⚠️ Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
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

          {loading && (
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