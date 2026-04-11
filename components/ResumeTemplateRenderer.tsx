// components/ResumeTemplateRenderer.tsx

"use client";

import { Resume, DesignState, TemplateId, TemplateProps } from "@/types/builder";
import { TemplateOne } from "@/components/templates/TemplateOne";
import { TemplateTwo } from "@/components/templates/TemplateTwo";
import { TemplateThree } from "@/components/templates/TemplateThree";
import { TemplateFour } from "@/components/templates/TemplateFour";
import { TemplateFive } from "@/components/templates/TemplateFive";
import { TemplateSix } from "@/components/templates/TemplateSix";
import { useEffect } from "react";

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
  Inter: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  Georgia: "Georgia, 'Times New Roman', serif",
  Geist_Mono: "'Geist Mono', 'Courier New', 'SF Mono', Monaco, 'Cascadia Code', monospace",
  Geist: "'Geist', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  Poppins: "'Poppins', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  Merriweather: "'Merriweather', Georgia, 'Times New Roman', serif",
  Roboto: "'Roboto', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  Pacifico: "'Pacifico', cursive",
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

  // Ensure print styles are available
  useEffect(() => {
    const printStyles = `
      @media print {
        .print\\:shadow-none {
          box-shadow: none !important;
        }
        .print\\:rounded-none {
          border-radius: 0 !important;
        }
        .print\\:max-w-none {
          max-width: none !important;
        }
      }
    `;

    const existingStyle = document.getElementById('resume-print-styles');
    if (!existingStyle) {
      const style = document.createElement('style');
      style.id = 'resume-print-styles';
      style.textContent = printStyles;
      document.head.appendChild(style);
    }

    return () => {
      const style = document.getElementById('resume-print-styles');
      if (style) {
        document.head.removeChild(style);
      }
    };
  }, []);

  const props: TemplateProps = {
    resume,
    design: finalDesign,
    activeSection,
    templateRef,
    scale,
  };

  const templateElement = (() => {
    switch (templateId) {
      case "template-2":
        return <TemplateTwo {...props} />;
      case "template-3":
        return <TemplateThree {...props} />;
      case "template-4":
        return <TemplateFour {...props} />;
      case "template-5":
        return <TemplateFive {...props} />;
      case "template-6":
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
        fontFamily: finalDesign.font
          ? fontMap[finalDesign.font]
          : "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        transform: `scale(${scale / 100})`,
        transformOrigin: "top center",
        width: "680px",
        maxWidth: "100%",
        minWidth: "680px",
        minHeight: "auto",
        '--accent-color': finalDesign.color,
      } as React.CSSProperties}
      className={`bg-white text-foreground shadow-2xl flex max-w-full print:shadow-none print:rounded-none print:max-w-none ${className}`}
    >
      {templateElement}
    </div>
  );
}

export default ResumeTemplateRenderer;