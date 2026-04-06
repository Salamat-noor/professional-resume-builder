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
    id: "template-one",
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
    id: "template-two",
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
    id: "template-three",
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
    id: "template-four",
    name: "Classic",
    description: "Traditional format with elegant typography",
    category: "Professional",
    thumbnail: "/templates/classic.png",
    isPremium: false,
    sections: [
      { id: "contact", label: "Contact", icon: "ri-user-line" },
      { id: "objective", label: "Objective", icon: "ri-target-line" },
      { id: "experience", label: "Experience", icon: "ri-briefcase-line" },
      { id: "education", label: "Education", icon: "ri-school-line" },
      { id: "skills", label: "Skills", icon: "ri-tools-line" },
    ],
  },
  {
    id: "template-five",
    name: "Creative",
    description: "Stand out design with unique layout",
    category: "Creative",
    thumbnail: "/templates/creative.png",
    isPremium: true,
    sections: [
      { id: "contact", label: "Contact", icon: "ri-user-line" },
      { id: "summary", label: "Summary", icon: "ri-file-text-line" },
      { id: "experience", label: "Experience", icon: "ri-briefcase-line" },
      { id: "portfolio", label: "Portfolio", icon: "ri-image-line", isPremium: true },
      { id: "skills", label: "Skills", icon: "ri-tools-line" },
      { id: "interests", label: "Interests", icon: "ri-heart-line" },
    ],
  },
  {
    id: "template-six",
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
  "template-one": TemplateOne,
  "template-two": TemplateTwo,
  "template-three": TemplateThree,
  "template-four": TemplateFour,
  "template-five": TemplateFive,
  "template-six": TemplateSix,
};

export function getTemplateComponent(templateId: TemplateId) {
  return templateComponents[templateId] || TemplateOne;
}

export function getAllTemplates(): TemplateConfig[] {
  return templates;
}

export function getTemplateConfig(templateId: TemplateId): TemplateConfig | undefined {
  return templates.find((t) => t.id === templateId);
}

export function getTemplatesByCategory(category: string): TemplateConfig[] {
  return templates.filter((t) => t.category === category);
}

export function getTemplateIds(): TemplateId[] {
  return templates.map((t) => t.id);
}