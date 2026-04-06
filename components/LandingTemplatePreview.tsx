// components/LandingTemplatePreview.tsx

"use client";

import { ResumeTemplateRenderer } from "@/components/ResumeTemplateRenderer";
import { Resume, TemplateId } from "@/types/builder";
import { useState } from "react";

interface LandingTemplatePreviewProps {
  templateId: TemplateId;
  resume: Resume;
}

export function LandingTemplatePreview({ templateId, resume }: LandingTemplatePreviewProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden rounded-xl shadow-lg border border-gray-200">
        <ResumeTemplateRenderer
          templateId={templateId}
          resume={resume}
          scale={0.5}
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center rounded-xl">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white text-primary font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-gray-50 transition-colors">
            Use This Template
          </button>
        </div>
      </div>
    </div>
  );
}