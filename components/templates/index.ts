export { TemplateOne } from "./TemplateOne";

// Template registry for dynamic loading
export const templateRegistry = {
  executive: "TemplateOne",
  minimal: "TemplateOne", // Will be replaced with TemplateTwo when created
  creative: "TemplateOne", // Will be replaced with TemplateThree when created
} as const;

export type TemplateId = keyof typeof templateRegistry;
