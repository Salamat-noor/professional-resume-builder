import { z } from "zod";

// ─── Nested schemas — every one needs .strict() ───────────────────────────────

export const ContactSchema = z.object({
  name: z.string().describe("Full name of the candidate"),
  role: z.string().describe("Current or target job title"),
  location: z.string().describe("City, State or remote"),
  email: z.string().describe("Professional email address"),
  phone: z.string().describe("Phone number"),
  linkedin: z.string().describe("LinkedIn profile URL"),
}).strict(); // ✅ additionalProperties: false

export const ExperienceSchema = z.object({
  title: z.string().describe("Job title"),
  company: z.string().describe("Company name"),
  period: z.string().describe("Employment period e.g. Jan 2020 - Present"),
  bullets: z.array(z.string()).describe("Achievement-focused bullet points"),
}).strict(); // ✅

export const EducationSchema = z.object({
  degree: z.string().describe("Degree or certification earned"),
  institution: z.string().describe("School or university name"),
  period: z.string().describe("Study period"),
}).strict(); // ✅

export const ProjectSchema = z.object({
  name: z.string().describe("Project name"),
  description: z.string().describe("Project description"),
  technologies: z.array(z.string()).describe("Technologies used"),
  // ✅ .nullish() → .nullable() — field stays in required array
  link: z.string().nullable().describe("Project URL or null"),
}).strict(); // ✅

export const CertificationSchema = z.object({
  name: z.string().describe("Certification name"),
  issuer: z.string().describe("Issuing organization"),
  date: z.string().describe("Date obtained"),
}).strict(); // ✅

export const LanguageSchema = z.object({
  name: z.string().describe("Language name"),
  proficiency: z
    .enum(["native", "fluent", "proficient", "conversational", "basic"])
    .describe("Proficiency level"),
}).strict(); // ✅

export const AchievementSchema = z.object({
  title: z.string().describe("Achievement title"),
  // ✅ .nullish() → .nullable()
  description: z.string().nullable().describe("Achievement description or null"),
}).strict(); // ✅

// ─── Root Resume schema ───────────────────────────────────────────────────────

export const ResumeSchema = z.object({
  contact: ContactSchema,
  summary: z.string().nullable().describe("Professional summary"),
  experience: z.array(ExperienceSchema).describe("Work experience, empty array if none"),
  education: z.array(EducationSchema).describe("Education, empty array if none"),
  skills: z.array(z.string()).describe("Skills, empty array if none"),
  projects: z.array(ProjectSchema).describe("Projects, empty array if none"),
  certifications: z.array(CertificationSchema).describe("Certifications, empty array if none"),
  languages: z.array(LanguageSchema).describe("Languages, empty array if none"),
  achievements: z.array(AchievementSchema).describe("Achievements, empty array if none"),
  interests: z.array(z.string()).describe("Interests, empty array if none"),
}).strict(); // ✅

// ─── AI response schema ───────────────────────────────────────────────────────

export const AIResponseSchema = z.object({
  message: z.string().describe("Response to user, max 3 sentences"),
  resume: ResumeSchema.nullable().describe(
    "Updated resume object, or null if no edits made"
  ),
}).strict(); // ✅

// ─── Types ────────────────────────────────────────────────────────────────────

export type Contact = z.infer<typeof ContactSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Certification = z.infer<typeof CertificationSchema>;
export type Language = z.infer<typeof LanguageSchema>;
export type Achievement = z.infer<typeof AchievementSchema>;
export type Resume = z.infer<typeof ResumeSchema>;
export type AIResponse = z.infer<typeof AIResponseSchema>;