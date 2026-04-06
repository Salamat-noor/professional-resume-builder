// components/ResumeTemplateRenderer.tsx

"use client";

import { Resume, DesignState, TemplateId, TemplateProps } from "@/types/builder";
import { TemplateOne } from "@/components/templates/TemplateOne";
import { TemplateTwo } from "@/components/templates/TemplateTwo";
import { TemplateThree } from "@/components/templates/TemplateThree";
import { TemplateFour } from "@/components/templates/TemplateFour";
import { TemplateFive } from "@/components/templates/TemplateFive";
import { TemplateSix } from "@/components/templates/TemplateSix";

interface ResumeTemplateRendererProps {
  templateId: TemplateId;
  resume: Resume;
  design: DesignState;
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


const fontMap: Record<string, string> = {
  Inter: "var(--font-inter), system-ui, sans-serif",
  Georgia: "Georgia, 'Times New Roman', serif",
  Geist_Mono: "var(--font-geist-mono), 'Courier New', monospace",
  Geist: "var(--font-geist-sans), system-ui, sans-serif",
  Poppins: "var(--font-poppins), system-ui, sans-serif",
  Merriweather: "var(--font-merriweather), Georgia, serif",
  Roboto: "var(--font-roboto), system-ui, sans-serif",
  Pacifico: "var(--font-pacifico), cursive",
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

  const templateElement = (() => {
    switch (templateId) {
      case "template-two":
        return <TemplateTwo {...props} />;
      case "template-three":
        return <TemplateThree {...props} />;
      case "template-four":
        return <TemplateFour {...props} />;
      case "template-five":
        return <TemplateFive {...props} />;
      case "template-six":
        return <TemplateSix {...props} />;
      default:
        return <TemplateOne {...props} />;
    }
  })();

  return (
     <div
      id="resume-print-area"
      ref={templateRef}
      style={{
        fontFamily: design?.font ? fontMap[design?.font] : "var(--font-geist-sans)",
         transform: `scale(${scale / 100})`,
          transformOrigin: "top center",
          width: "680px",
          minHeight: "auto",
      }}
      className={`bg-white shadow-2xl rounded-sm flex ${className}`}
    >
      {templateElement}
    </div>
  );
}

export default ResumeTemplateRenderer;