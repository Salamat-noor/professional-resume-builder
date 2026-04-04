"use client";

import { useEffect, useRef, useState } from "react";
import { BuilderTopBar } from "./BuilderTopBar";
import { BuilderSidebar } from "./BuilderSidebar";
import { BuilderCanvas } from "./BuilderCanvas";
import { BuilderAIPanel } from "./BuilderAIPanel";
import { BuilderDesignPanel } from "./BuilderDesignPanel";
import { BuilderScorePanel } from "./BuilderScorePanel";
import { BuilderSuggestionsPanel } from "./BuilderSuggestionsPanel";
import ExportModal from "@/components/ExportModal";
import UpgradeModal from "@/components/UpgradeModal";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DesignState, Resume } from "@/types/builder";
import { sampleTemplate1 } from "@/assets/templates";

interface Props {
  resumeId: string;
  templateId?: string;
}

export function BuilderWorkspace({ resumeId, templateId = "executive" }: Props) {
  const [activeSection, setActiveSection] = useState("experience");
  const [showExport, setShowExport] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const [resume, setResume] = useState<Resume>(sampleTemplate1);
  const templateRef = useRef<HTMLDivElement | null>(null);

  // ✅ GLOBAL DESIGN STATE
  const [design, setDesign] = useState<DesignState>({
    template: templateId as DesignState["template"],
    color: "#4F46E5",
    font: "Inter",
    spacing: 1,
  });

  useEffect(() => {
    const getStoredResume = () => {
      const storedResume = localStorage.getItem("currentResume");
      if (
        storedResume &&
        storedResume.trim() !== JSON.stringify(sampleTemplate1).trim()
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
    <SidebarProvider>
      <BuilderSidebar
        activeSection={activeSection}
        onSelect={setActiveSection}
      />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <BuilderTopBar
          onExport={() => setShowExport(true)}
          onUpgrade={() => setShowUpgrade(true)}
          resumeId={resumeId}
        />

        <div className="flex flex-1 min-h-0">
          {/* Canvas Area - takes remaining space */}
          <BuilderCanvas
            activeSection={activeSection}
            design={design}
            resume={resume}
            templateRef={templateRef}
          />

          {/* Right Panel with shadcn Tabs - fixed width, fills height */}
          <div className="w-80 lg:w-96 border-l border-border flex flex-col bg-card shrink-0">
            <Tabs defaultValue="ai" className="flex flex-col h-full min-h-0">
              <TabsList className="flex border-b border-border rounded-none bg-transparent p-0 h-auto shrink-0">
                <TabsTrigger
                  value="ai"
                  className="flex-1 py-3 text-xs font-semibold uppercase tracking-wide rounded-none border-b-2 border-transparent data-[active]:border-primary data-[active]:bg-primary/5 data-[active]:text-primary text-muted-foreground hover:text-foreground"
                >
                  AI
                </TabsTrigger>
                <TabsTrigger
                  value="design"
                  className="flex-1 py-3 text-xs font-semibold uppercase tracking-wide rounded-none border-b-2 border-transparent data-[active]:border-primary data-[active]:bg-primary/5 data-[active]:text-primary text-muted-foreground hover:text-foreground"
                >
                  Design
                </TabsTrigger>
                <TabsTrigger
                  value="score"
                  className="flex-1 py-3 text-xs font-semibold uppercase tracking-wide rounded-none border-b-2 border-transparent data-[active]:border-primary data-[active]:bg-primary/5 data-[active]:text-primary text-muted-foreground hover:text-foreground"
                >
                  Score
                </TabsTrigger>
                <TabsTrigger
                  value="suggestions"
                  className="flex-1 py-3 text-xs font-semibold uppercase tracking-wide rounded-none border-b-2 border-transparent data-[active]:border-primary data-[active]:bg-primary/5 data-[active]:text-primary text-muted-foreground hover:text-foreground"
                >
                  Tips
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 min-h-0 overflow-hidden">
                <TabsContent value="ai" className="m-0 h-full overflow-y-auto">
                  <BuilderAIPanel resume={resume} setResume={setResume} />
                </TabsContent>

                <TabsContent value="design" className="m-0 h-full overflow-y-auto">
                  <BuilderDesignPanel design={design} setDesign={setDesign} />
                </TabsContent>

                <TabsContent value="score" className="m-0 h-full overflow-y-auto">
                  <BuilderScorePanel />
                </TabsContent>

                <TabsContent value="suggestions" className="m-0 h-full overflow-y-auto">
                  <BuilderSuggestionsPanel resume={resume} setResume={setResume} />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </SidebarInset>

      {showExport && (
        <ExportModal
          onClose={() => setShowExport(false)}
          templateRef={templateRef}
          resume={resume}
        />
      )}
      {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}
    </SidebarProvider>
  );
}
