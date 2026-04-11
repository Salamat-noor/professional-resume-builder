// types/builder.ts

import { Resume as AIResume } from "@/lib/ai/schemas/resume-schemas";

// Resume type from AI schemas
export type Resume = AIResume;

// Template ID type - all available templates
export type TemplateId = 
  | "template-1"
  | "template-2"
  | "template-3"
  | "template-4"
  | "template-5"
  | "template-6";

// Design state for resume customization
export interface DesignState {
  color: string;
  font: string;
  spacing: 0 | 1 | 2;
}

// Template section for sidebar navigation
export interface TemplateSection {
  id: string;
  label?: string;
  icon?: string;
  isPremium?: boolean;
}

// Props passed to template components
export interface TemplateProps {
  resume: Resume;
  design: DesignState;
  activeSection?: string;
  templateRef?: React.RefObject<HTMLDivElement | null>;
  scale:number;
}

// Template configuration
export interface TemplateConfig {
  id: number | TemplateId;
  template_id?: TemplateId;
  name?: string;
  description: string;
  category: string;
  thumbnail: string;
  isPremium?: boolean;
  sections: TemplateSection[];
}

// Resume card data for dashboard
export interface ResumeCardData {
  id: string;
  title: string;
  company?: string;
  date: string;
  ats?: number;
  status?: "Active" | "Draft";
  img?: string;
  templateId?: TemplateId;
}

// Builder Workspace Props
export interface BuilderWorkspaceProps {
  resumeId: string;
  templateId?: string;
}

// Builder Canvas Props
export interface BuilderCanvasProps {
  activeSection: string;
  resume: Resume;
  templateRef: React.RefObject<HTMLDivElement | null>;
  design: DesignState;
}

// Builder Design Panel Props
export interface BuilderDesignPanelProps {
  design: DesignState;
  setDesign: React.Dispatch<React.SetStateAction<DesignState>>;
}

// Builder AI Panel Props
export interface BuilderAIPanelProps {
  resume: Resume | null;
  setResume: React.Dispatch<React.SetStateAction<Resume>>;
  templateId: TemplateId;
}

// Builder Sidebar Props
export interface BuilderSidebarProps {
  activeSection: string;
  templateId: TemplateId;
  onSelect: (section: string) => void;
}

// Builder Score Panel Props
export interface BuilderScorePanelProps {
  score?: number;
}

// Builder Suggestions Panel Props
export interface BuilderSuggestionsPanelProps {
  resume: Resume | null;
  setResume: React.Dispatch<React.SetStateAction<Resume>>;
}

// Builder Top Bar Props
export interface BuilderTopBarProps {
  onExport: () => void;
  onUpgrade: () => void;
  resumeId: string;
}

// AI Chat Message
export interface AIChatMessage {
  role: "user" | "ai";
  content: string;
}

// AI Chat Input
export interface AIChatInput {
  question: string;
  resume: Resume;
  sessionId?: string;
  templateId: TemplateId;
}

// AI Chat Response
export interface AIChatResponse {
  message: string;
  shouldUpdateResume?: boolean;
  resume?: Resume | null;
  sessionId?: string;
}

// Export Modal Props
export interface ExportModalProps {
  onClose: () => void;
  resume: Resume;
  templateRef: React.RefObject<HTMLDivElement | null>;
}

// Upgrade Modal Props
export interface UpgradeModalProps {
  onClose: () => void;
}
