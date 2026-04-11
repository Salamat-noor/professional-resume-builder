// components/dashboard/ResumePreview.tsx

"use client";

import { ResumeTemplateRenderer } from "@/components/ResumeTemplateRenderer";
import { Resume, TemplateId, DesignState } from "@/types/builder";

const defaultPreviewDesign: DesignState = {
  color: "#4F46E5",
  font: "Inter",
  spacing: 1,
};

interface ResumePreviewProps {
  resume: Resume;
  templateId: TemplateId;
  width?: number;
}

export function ResumePreview({ resume, templateId, width = 300 }: ResumePreviewProps) {
  const scale = width / 680; // 680 is the base width of the template

  return (
    <div className="overflow-hidden rounded-lg shadow-md border border-border bg-surface text-foreground">
      <ResumeTemplateRenderer
        templateId={templateId}
        resume={resume}
        design={defaultPreviewDesign}
        scale={scale}
      />
    </div>
  );
}