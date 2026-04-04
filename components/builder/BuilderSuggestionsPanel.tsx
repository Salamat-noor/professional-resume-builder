"use client";

import { Resume } from "@/types/builder";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const suggestions = [
  {
    id: "suggestion-1",
    type: "IMPACT",
    section: "Experience",
    original: "Led team to grow revenue",
    improved:
      "Spearheaded cross-functional team of 14 to drive 42% ARR growth through data-driven product strategy",
    score: "+38% impact",
  },
  {
    id: "suggestion-2",
    type: "CLARITY",
    section: "Experience",
    original: "Worked on payments product",
    improved:
      "Owned end-to-end payments SDK product, adopted by 8,000+ enterprise customers within 12 months of launch",
    score: "+52% clarity",
  },
  {
    id: "suggestion-3",
    type: "QUANTIFY",
    section: "Summary",
    original: "Experienced product manager",
    improved:
      "5+ years of product management experience with proven track record of launching 12+ successful products",
    score: "+45% specificity",
  },
  {
    id: "suggestion-4",
    type: "ACTION",
    section: "Experience",
    original: "Responsible for managing team",
    improved:
      "Built and led a high-performing team of 8 engineers, achieving 100% sprint completion rate",
    score: "+40% action",
  },
];

interface Props {
  resume: Resume | null;
  setResume: React.Dispatch<React.SetStateAction<Resume>>;
}

export function BuilderSuggestionsPanel({ resume, setResume }: Props) {
  const [applied, setApplied] = useState<string[]>([]);
  const [dismissed, setDismissed] = useState<string[]>([]);

  const handleApplySuggestion = useCallback((id: string, improved: string, section: string) => {
    setApplied((prev) => [...prev, id]);
    
    if (resume) {
      setResume((prev) => {
        const updated = { ...prev };
        
        // Apply based on section
        if (section === "Summary") {
          updated.summary = improved;
        } else if (section === "Experience" && prev.experience.length > 0) {
          // Update first experience bullet for now
          updated.experience = [{
            ...prev.experience[0],
            bullets: [improved, ...prev.experience[0].bullets.slice(1)]
          }, ...prev.experience.slice(1)];
        }
        
        return updated;
      });
    }
  }, [resume, setResume]);

  const handleDismiss = useCallback((id: string) => {
    setDismissed((prev) => [...prev, id]);
  }, []);

  const visibleSuggestions = suggestions.filter(
    (s) => !applied.includes(s.id) && !dismissed.includes(s.id)
  );

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "IMPACT":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
      case "CLARITY":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "QUANTIFY":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "ACTION":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4 h-full min-h-0">
      {/* Header */}
      <div className="shrink-0">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-foreground">AI Suggestions</h3>
          <span className="text-xs text-muted-foreground">
            {visibleSuggestions.length} remaining
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          AI-powered improvements to make your resume more impactful.
        </p>
      </div>

      {/* Suggestions List */}
      <div className="flex-1 min-h-0 overflow-y-auto space-y-3">
        {visibleSuggestions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-3">
              <i className="ri-check-line text-2xl text-green-600 dark:text-green-400" />
            </div>
            <p className="text-sm font-medium text-foreground">All caught up!</p>
            <p className="text-xs text-muted-foreground mt-1">
              You&apos;ve addressed all suggestions.
            </p>
          </div>
        ) : (
          suggestions.map((s) => {
            if (applied.includes(s.id)) {
              return (
                <Card key={s.id} className="border-green-500/50 bg-green-500/5">
                  <CardContent className="p-3.5">
                    <div className="flex items-center gap-2">
                      <i className="ri-check-line text-green-600 dark:text-green-400" />
                      <span className="text-xs font-medium text-green-600 dark:text-green-400">
                        Applied to {s.section}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            }

            if (dismissed.includes(s.id)) {
              return null;
            }

            return (
              <Card key={s.id} className="border-border transition-all hover:border-primary/30">
                <CardContent className="p-3.5">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={`text-xs font-bold ${getTypeStyles(s.type)}`}>
                      {s.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{s.section}</span>
                  </div>

                  <p className="text-xs text-muted-foreground line-through mb-1">
                    {s.original}
                  </p>
                  
                  <p className="text-xs text-foreground bg-primary/5 p-2 rounded-lg leading-relaxed font-mono">
                    {s.improved}
                  </p>
                  
                  <p className="text-xs text-green-600 dark:text-green-400 font-semibold mt-2">
                    {s.score}
                  </p>

                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      onClick={() => handleApplySuggestion(s.id, s.improved, s.section)}
                      className="text-xs flex-1"
                    >
                      <i className="ri-check-line mr-1" />
                      Apply
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDismiss(s.id)}
                      className="text-xs text-muted-foreground"
                    >
                      <i className="ri-close-line mr-1" />
                      Dismiss
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="shrink-0 text-center text-xs text-muted-foreground border-t border-border pt-3">
        <span className="font-medium text-foreground">4 suggestions</span> available ·{" "}
        <Button variant="link" size="sm" className="h-auto p-0 text-primary">
          Get more
        </Button>
      </div>
    </div>
  );
}
