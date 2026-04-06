// components/ResumeTemplateRenderer.tsx

"use client";

import { Resume, DesignState, TemplateId, TemplateProps } from "@/types/builder";
import { getTemplateComponent } from "@/lib/templates/registry";

interface ResumeTemplateRendererProps {
  templateId: TemplateId;
  resume: Resume;
  design?: Partial<DesignState>;
  activeSection?: string;
  templateRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
  scale?: number;
}

const defaultDesign: DesignState = {
  color: "#4F46E5",
  font: "Inter",
  spacing: 1,
};

export function ResumeTemplateRenderer({
  templateId,
  resume,
  design,
  activeSection = "",
  templateRef,
  className = "",
  scale = 1,
}: ResumeTemplateRendererProps) {
  const TemplateComponent = getTemplateComponent(templateId);
  
  const finalDesign: DesignState = {
    ...defaultDesign,
    ...design,
  };

  const props: TemplateProps = {
    resume,
    design: finalDesign,
    activeSection,
    templateRef,
    scale
  };

  return (
    <div
      className={className}
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: "top center",
      }}
    >
      <TemplateComponent {...props} />
    </div>
  );
}

export default ResumeTemplateRenderer;