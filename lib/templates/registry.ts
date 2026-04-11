// lib/templates/registry.ts

import { TemplateConfig, TemplateId, TemplateProps } from "@/types/builder";
import { TemplateOne } from "@/components/templates/TemplateOne";
import { TemplateTwo } from "@/components/templates/TemplateTwo";
import { TemplateThree } from "@/components/templates/TemplateThree";
import { TemplateFour } from "@/components/templates/TemplateFour";
import { TemplateFive } from "@/components/templates/TemplateFive";
import { TemplateSix } from "@/components/templates/TemplateSix";
import React from "react";

export const templates: TemplateConfig[] = [
  {
    id: "template-1",
    name: "Minimal",
    description: "Clean and simple design with a focus on readability",
    category: "Professional",
    thumbnail: "/templates/minimal.png",
    isPremium: false,
    sections: [
      { id: "contact", label: "Contact", icon: "ri-user-line" },
      { id: "summary", label: "Summary", icon: "ri-file-text-line" },
      { id: "experience", label: "Experience", icon: "ri-briefcase-line" },
      { id: "education", label: "Education", icon: "ri-school-line" },
      { id: "skills", label: "Skills", icon: "ri-tools-line" },
    ],
  },
  {
    id: "template-2",
    name: "Executive",
    description: "Bold sidebar layout with dark accent colors",
    category: "Professional",
    thumbnail: "/templates/executive.png",
    isPremium: false,
    sections: [
      { id: "contact", label: "Contact", icon: "ri-user-line" },
      { id: "summary", label: "Summary", icon: "ri-file-text-line" },
      { id: "experience", label: "Experience", icon: "ri-briefcase-line" },
      { id: "education", label: "Education", icon: "ri-school-line" },
      { id: "skills", label: "Skills", icon: "ri-tools-line" },
      { id: "achievements", label: "Achievements", icon: "ri-trophy-line", isPremium: true },
    ],
  },
  {
    id: "template-3",
    name: "Modern",
    description: "Contemporary layout with grid-based design",
    category: "Creative",
    thumbnail: "/templates/modern.png",
    isPremium: false,
    sections: [
      { id: "contact", label: "Contact", icon: "ri-user-line" },
      { id: "summary", label: "Summary", icon: "ri-file-text-line" },
      { id: "experience", label: "Experience", icon: "ri-briefcase-line" },
      { id: "projects", label: "Projects", icon: "ri-code-line" },
      { id: "skills", label: "Skills", icon: "ri-tools-line" },
    ],
  },
  {
    id: "template-4",
    name: "Classic",
    description: "Traditional format with elegant typography",
    category: "Professional",
    thumbnail: "/templates/classic.png",
    isPremium: false,
    sections: [
      { id: "contact", label: "Contact", icon: "ri-user-line" },
      { id: "summary", label: "Objective", icon: "ri-target-line" },
      { id: "experience", label: "Experience", icon: "ri-briefcase-line" },
      { id: "education", label: "Education", icon: "ri-school-line" },
      { id: "skills", label: "Skills", icon: "ri-tools-line" },
    ],
  },
  {
    id: "template-5",
    name: "Creative",
    description: "Stand out design with unique layout",
    category: "Creative",
    thumbnail: "/templates/creative.png",
    isPremium: true,
    sections: [
      { id: "contact", label: "Contact", icon: "ri-user-line" },
      { id: "summary", label: "Summary", icon: "ri-file-text-line" },
      { id: "experience", label: "Experience", icon: "ri-briefcase-line" },
      { id: "projects", label: "Portfolio", icon: "ri-image-line", isPremium: true },
      { id: "skills", label: "Skills", icon: "ri-tools-line" },
      { id: "interests", label: "Interests", icon: "ri-heart-line" },
    ],
  },
  {
    id: "template-6",
    name: "Professional",
    description: "Industry standard with comprehensive sections",
    category: "Professional",
    thumbnail: "/templates/professional.png",
    isPremium: true,
    sections: [
      { id: "contact", label: "Contact", icon: "ri-user-line" },
      { id: "summary", label: "Summary", icon: "ri-file-text-line" },
      { id: "experience", label: "Experience", icon: "ri-briefcase-line" },
      { id: "education", label: "Education", icon: "ri-school-line" },
      { id: "certifications", label: "Certifications", icon: "ri-award-line", isPremium: true },
      { id: "skills", label: "Skills", icon: "ri-tools-line" },
    ],
  },
];

const templateComponents: Record<TemplateId, React.ComponentType<TemplateProps>> = {
  "template-1": TemplateOne,
  "template-2": TemplateTwo,
  "template-3": TemplateThree,
  "template-4": TemplateFour,
  "template-5": TemplateFive,
  "template-6": TemplateSix,
};

export function getTemplateComponent(templateId: TemplateId) {
  return templateComponents[templateId] || TemplateOne;
}

export function getAllTemplates(): TemplateConfig[] {
  return templates;
}

export function getTemplateConfig(templateId: TemplateId): TemplateConfig | undefined {
  return templates.find(
    (t) =>
      (typeof t.id === "string" && t.id === templateId) ||
      t.template_id === templateId
  );
}

export function getTemplatesByCategory(category: string): TemplateConfig[] {
  return templates.filter((t) => t.category === category);
}

export function getTemplateIds(): TemplateId[] {
  return templates
    .map((t) => (typeof t.id === "string" ? t.id : t.template_id))
    .filter((id): id is TemplateId => Boolean(id));
}
