'use client';

import { useState } from "react";

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

export default function BuilderTipsPanel() {
    const [applied, setApplied] = useState<number[]>([]);

    return (
        <div className="p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2.5">
          AI Suggestions
        </p>
        <div className="space-y-3">
          {suggestions.map((s, i) => (
            <div
              key={i}
              className={`border rounded-xl p-3.5 transition-all ${
                applied.includes(i)
                  ? "border-emerald-500/40 bg-emerald-500/10"
                  : "border-border bg-card/30"
              }`}
            >
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  s.type === "IMPACT"
                    ? "bg-orange-500/15 text-orange-700 dark:text-orange-300"
                    : "bg-blue-500/15 text-blue-700 dark:text-blue-300"
                }`}
              >
                {s.type}
              </span>
              <p className="text-xs text-muted-foreground/80 line-through mt-2">
                {s.original}
              </p>
              <p className="text-xs text-foreground mt-1 bg-accent/50 border border-border/60 p-2 rounded-lg leading-relaxed geist-mono-font">
                {s.improved}
              </p>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-1">
                {s.score}
              </p>
              {!applied.includes(i) ? (
                <div className="flex gap-2 mt-2.5">
                  <button
                    onClick={() => setApplied([...applied, i])}
                    className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:bg-primary/90 cursor-pointer whitespace-nowrap"
                  >
                    Apply
                  </button>
                  <button className="text-xs text-muted-foreground hover:text-foreground px-2 cursor-pointer whitespace-nowrap">
                    Dismiss
                  </button>
                </div>
              ) : (
                <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-2 font-medium">
                  ✓ Applied
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    )
}
