"use client";
import { useEffect, useRef, useState } from "react";
import { BuilderTopBar } from "./BuilderTopBar";
import { BuilderSidebar } from "./BuilderSidebar";
import { BuilderCanvas } from "./BuilderCanvas";
import { BuilderAIPanel } from "./BuilderAIPanel";
import { BuilderDesignPanel } from "./BuilderDesignPanel";
import { BuilderScorePanel } from "./BuilderScorePanel";
import ExportModal from "@/components/ExportModal";
import UpgradeModal from "@/components/UpgradeModal";
import { DesignState, Resume, TemplateId } from "@/types/builder";
import BuilderTipsPanel from "./BuilderTipsPanel";
import { sampleResume } from "@/assets/templates";

interface Props {
  resumeId: TemplateId;
}

export function BuilderWorkspace({ resumeId }: Props) {
  const [rightTab, setRightTab] = useState<"AI" | "Design" | "Score" | "Tips">(
    "AI",
  );
  const [activeSection, setActiveSection] = useState("experience");
  const [showExport, setShowExport] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const [resume, setResume] = useState<Resume>(() => {
    if (typeof window !== "undefined") {
      const storedResume = localStorage.getItem("currentResume");
      if (storedResume) {
        return JSON.parse(storedResume);
      } else {
        return sampleResume;
      }
    } else {
      return sampleResume;
    }
  });
  const templateRef = useRef<HTMLDivElement | null>(null);

  // ✅ GLOBAL DESIGN STATE
  const [design, setDesign] = useState<DesignState>({
    color: "#4F46E5",
    font: "Inter",
    spacing: 0, // ✅ Changed from 1 to 0 for tighter layout
  });

  useEffect(() => {
    localStorage.setItem("currentResume", JSON.stringify(resume));
    console.log("resume updated, ", resume);
  }, [resume]);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      <BuilderTopBar
        onExport={() => setShowExport(true)}
        onUpgrade={() => setShowUpgrade(true)}
        resumeId={resumeId}
      />

      <div className="flex flex-1 overflow-hidden">
        <BuilderSidebar
          activeSection={activeSection}
          onSelect={setActiveSection}
        />

        {/* ✅ PASS DESIGN TO CANVAS */}
        <BuilderCanvas
          resumeId={resumeId}
          activeSection={activeSection}
          design={design}
          resume={resume}
          templateRef={templateRef}
        />

        <div className="w-[400px] bg-background border-l border-border flex flex-col overflow-hidden">
          <div className="flex border-b border-border bg-background">
            {(["AI", "Design", "Score", "Tips"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setRightTab(t)}
                className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wide transition-all cursor-pointer whitespace-nowrap border-b-2 ${
                  rightTab === t
                    ? "text-primary border-b-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground border-b-transparent"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto bg-background">
            {rightTab === "AI" && (
              <BuilderAIPanel
                resume={resume}
                setResume={setResume}
                templateId={resumeId}
              />
            )}

            {/* ✅ PASS STATE + SETTER */}
            {rightTab === "Design" && (
              <BuilderDesignPanel design={design} setDesign={setDesign} />
            )}

            {rightTab === "Score" && <BuilderScorePanel />}

            {rightTab === "Tips" && <BuilderTipsPanel />}
          </div>
        </div>
      </div>

      {showExport && (
        <ExportModal
          onClose={() => setShowExport(false)}
          templateRef={templateRef}
          resume={resume}
        />
      )}
      {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}
    </div>
  );
}
