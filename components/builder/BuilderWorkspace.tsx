"use client";
import { useEffect, useRef, useState } from "react";
import {BuilderTopBar} from "./BuilderTopBar";
import {BuilderSidebar} from "./BuilderSidebar";
import {BuilderCanvas} from "./BuilderCanvas";
import {BuilderAIPanel} from "./BuilderAIPanel";
import {BuilderDesignPanel} from "./BuilderDesignPanel";
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
  const [rightTab, setRightTab] = useState<"AI" | "Design" | "Score" | "Tips">("AI");
  const [activeSection, setActiveSection] = useState("experience");
  const [showExport, setShowExport] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const [resume, setResume] = useState<Resume>(sampleResume);
  const templateRef = useRef<HTMLDivElement | null>(null);

  // ✅ GLOBAL DESIGN STATE
 const [design, setDesign] = useState<DesignState>({
  color: "#4F46E5",
  font: "Inter",
  spacing: 0, // ✅ Changed from 1 to 0 for tighter layout
  });


  useEffect(() => {
    const getStoredResume = () => {
      const storedResume = localStorage.getItem("currentResume");
      if (
        storedResume &&
        storedResume.trim() !== JSON.stringify(sampleResume).trim()
      ) {
        setResume(JSON.parse(storedResume));
      }
    };
    getStoredResume();
  }, []);

  useEffect(() => {
    localStorage.setItem("currentResume", JSON.stringify(resume));
  }, [resume]);

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
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

        <div className="w-[400px] bg-white border-l border-gray-100 flex flex-col">
          <div className="flex border-b border-gray-100">
            {(["AI", "Design", "Score", "Tips"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setRightTab(t)}
                className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                  rightTab === t
                    ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto">
            {rightTab === "AI" && (
              <BuilderAIPanel resume={resume} setResume={setResume} />
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