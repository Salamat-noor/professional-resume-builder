"use client";
import { useState } from "react";
import { getTemplateComponent } from "@/lib/templates/registry";
import { Resume, TemplateId } from "@/types/builder";

interface Props {
  activeSection: string;
  resume: Resume;
  resumeId:TemplateId;
  templateRef: { current: HTMLDivElement | null };
  design: {
    color: string;
    font: string;
    spacing: number;
  };
}

const spacingMap: Record<0 | 1 | 2, string> = {
  0: "gap-3",  // ✅ Tighter (was gap-4)
  1: "gap-6",  // ✅ Tighter (was gap-8)
  2: "gap-10", // ✅ Tighter (was gap-12)
};

const fontMap = {
  Geist: "var(--font-geist-sans)",
  "Geist Mono": "var(--font-geist-mono)",
};

export function BuilderCanvas({
  activeSection,
  design,
  resume,
  templateRef,
  resumeId
}: Props) {
  const [zoom, setZoom] = useState(100);
  const zooms = [75, 100, 125];

    const Template = getTemplateComponent(resumeId)
  

  return (
    <div
      className="flex-1 bg-gray-100 overflow-auto flex flex-col items-center py-8 px-6 relative"
      style={{
        fontFamily:
          fontMap[design.font as keyof typeof fontMap] ||
          "var(--font-geist-sans)",
      }}
    >

<Template resume={resume} scale={zoom} design={design} activeSection={activeSection} templateRef={templateRef} />


      {/* Zoom controls */}
      <div className="sticky bottom-4 flex items-center gap-1 bg-white/90 backdrop-blur border border-gray-200 rounded-full px-2 py-1 shadow mt-6">
        {zooms.map((z) => (
          <button
            key={z}
            onClick={() => setZoom(z)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${zoom === z ? "bg-indigo-600 text-white" : "text-gray-600 hover:text-gray-900"}`}
          >
            {z}%
          </button>
        ))}
      </div>
    </div>
  );
}