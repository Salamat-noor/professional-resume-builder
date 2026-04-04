"use client";

import { Resume, DesignState } from "@/types/builder";
import { useState } from "react";
import { TemplateOne } from "@/components/templates";

interface Props {
  activeSection: string;
  resume: Resume;
  templateRef: React.RefObject<HTMLDivElement | null>;
  design: DesignState;
}

export function BuilderCanvas({
  activeSection,
  design,
  resume,
  templateRef,
}: Props) {
  const [zoom, setZoom] = useState(100);
  const zooms = [75, 100, 125];

  return (
    <div className="flex-1 bg-muted/30 overflow-auto flex flex-col items-center py-8 px-6 relative">
      <div
        style={{
          transform: `scale(${zoom / 100})`,
          transformOrigin: "top center",
          width: "680px",
          minHeight: "auto",
        }}
      >
        {/* Render template dynamically based on design.template */}
        <TemplateOne
          resume={resume}
          design={design}
          activeSection={activeSection}
          templateRef={templateRef}
        />
      </div>

      {/* Zoom controls */}
      <div className="sticky bottom-4 flex items-center gap-1 bg-card/90 backdrop-blur border border-border rounded-full px-2 py-1 shadow-lg mt-6">
        {zooms.map((z) => (
          <button
            key={z}
            onClick={() => setZoom(z)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
              zoom === z
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {z}%
          </button>
        ))}
      </div>
    </div>
  );
}
