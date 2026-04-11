"use client";
import { useState } from "react";
import { DesignState, Resume, TemplateId } from "@/types/builder";
import ResumeTemplateRenderer from "../ResumeTemplateRenderer";
import { Button } from "@/components/ui/button";

interface Props {
  activeSection: string;
  resume: Resume;
  resumeId: TemplateId;
  templateRef: { current: HTMLDivElement | null };
  design: DesignState;
}

export function BuilderCanvas({
  activeSection,
  design,
  resume,
  templateRef,
  resumeId,
}: Props) {
  const [zoom, setZoom] = useState(100);
  const zooms = [75, 100, 125];


  return (
    <div className="flex-1 bg-background text-foreground overflow-auto flex flex-col items-center py-8 px-6 relative">
      <ResumeTemplateRenderer
        templateId={resumeId}
        resume={resume}
        scale={zoom}
        design={design}
        activeSection={activeSection}
        templateRef={templateRef}
      />


      {/* Zoom controls */}
      <div className="sticky bottom-4 flex items-center gap-1 bg-background/90 backdrop-blur border border-border rounded-full px-2 py-1 shadow mt-6">
        {zooms.map((z) => (
          <Button
            key={z}
            variant={zoom === z ? "default" : "ghost"}
            size="sm"
            onClick={() => setZoom(z)}
            className="px-3 py-1.5 rounded-full text-xs font-medium"
          >
            {z}%
          </Button>
        ))}
      </div>
    </div>
  );
}