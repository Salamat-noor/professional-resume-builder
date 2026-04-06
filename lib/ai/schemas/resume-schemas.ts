import { z } from "zod";

// Contact schema
export const ContactSchema = z.object({
  name: z.string().describe("Full name of the candidate"),
  role: z.string().describe("Current or target job title"),
  location: z.string().describe("City, State or remote location"),
  email: z.string().describe("Professional email address"),
  phone: z.string().describe("Phone number"),
  linkedin: z.string().describe("LinkedIn profile URL"),
  website: z.string().nullable().describe("Personal website URL"),
  github: z.string().nullable().describe("GitHub profile URL"),
  portfolio: z.string().nullable().describe("Portfolio URL"),
});

// Experience schema
export const ExperienceSchema = z.object({
  title: z.string().describe("Job title"),
  company: z.string().describe("Company name"),
  location: z.string().nullable().describe("Job location"),
  period: z.string().describe("Employment period (e.g., 'Jan 2020 - Present')"),
  bullets: z.array(z.string()).describe("Achievement-focused bullet points with metrics"),
});

// Education schema
export const EducationSchema = z.object({
  degree: z.string().describe("Degree or certification earned"),
  institution: z.string().describe("School or university name"),
  location: z.string().nullable().describe("Institution location"),
  period: z.string().describe("Study period"),
  gpa: z.string().nullable().describe("GPA if notable"),
  honors: z.string().nullable().describe("Honors or awards"),
});

// Project schema
export const ProjectSchema = z.object({
  name: z.string().describe("Project name"),
  description: z.string().describe("Project description"),
  technologies: z.array(z.string()).describe("Technologies used"),
  link: z.string().optional().describe("Project link"),
  period: z.string().optional().describe("Project timeframe"),
});

// Certification schema
export const CertificationSchema = z.object({
  name: z.string().describe("Certification name"),
  issuer: z.string().describe("Issuing organization"),
  date: z.string().describe("Date obtained"),
  link: z.string().optional().describe("Credential link"),
  expires: z.string().optional().describe("Expiration date"),
});

// Language schema
export const LanguageSchema = z.object({
  name: z.string().describe("Language name"),
  proficiency: z.enum(["native", "fluent", "proficient", "conversational", "basic"]).describe("Proficiency level"),
});

// Achievement schema
export const AchievementSchema = z.object({
  title: z.string().describe("Achievement title"),
  description: z.string().optional().describe("Achievement description"),
  date: z.string().optional().describe("Date of achievement"),
});

// Volunteer schema
export const VolunteerSchema = z.object({
  role: z.string().describe("Volunteer role"),
  organization: z.string().describe("Organization name"),
  period: z.string().describe("Time period"),
  description: z.string().optional().describe("Description of work"),
});

// Publication schema
export const PublicationSchema = z.object({
  title: z.string().describe("Publication title"),
  publisher: z.string().describe("Publisher name"),
  date: z.string().describe("Publication date"),
  link: z.string().optional().describe("Publication link"),
});

// Full resume schema (superset - all possible sections)
export const ResumeSchema = z.object({
  contact: ContactSchema,
  summary: z.string().nullable().describe("Professional summary tailored to target role"),
  experience: z.array(ExperienceSchema).nullable().describe("Work experience in reverse chronological order"),
  education: z.array(EducationSchema).nullable().describe("Educational background"),
  skills: z.array(z.string()).nullable().describe("Relevant technical and soft skills"),
  projects: z.array(ProjectSchema).nullable().describe("Notable projects"),
  certifications: z.array(CertificationSchema).nullable().describe("Professional certifications"),
  languages: z.array(LanguageSchema).nullable().describe("Language proficiencies"),
  achievements: z.array(AchievementSchema).nullable().describe("Notable achievements and awards"),
  volunteer: z.array(VolunteerSchema).nullable().describe("Volunteer experience"),
  publications: z.array(PublicationSchema).nullable().describe("Publications"),
  interests: z.array(z.string()).nullable().describe("Personal interests"),
});

// AI response schema with message
export const AIResponseSchema = z.object({
  message: z.string().describe("Friendly explanation of changes made or advice given"),
  resume: ResumeSchema,
});

// ATS Analysis schema
export const ATSAnalysisSchema = z.object({
  score: z.number().min(0).max(100).describe("ATS compatibility score"),
  keywords: z.array(z.object({
    keyword: z.string(),
    found: z.boolean(),
    importance: z.enum(["high", "medium", "low"]),
  })).describe("Keywords from job description and their presence in resume"),
  suggestions: z.array(z.object({
    category: z.enum(["keywords", "formatting", "content", "structure"]),
    issue: z.string(),
    recommendation: z.string(),
  })).describe("Specific improvements to increase ATS score"),
  summary: z.string().describe("Brief overall assessment"),
});

// Cover letter schema
export const CoverLetterSchema = z.object({
  content: z.string().describe("Full cover letter text"),
  highlights: z.array(z.string()).describe("Key points emphasized in the letter"),
});

// Export types
export type Contact = z.infer<typeof ContactSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Certification = z.infer<typeof CertificationSchema>;
export type Language = z.infer<typeof LanguageSchema>;
export type Achievement = z.infer<typeof AchievementSchema>;
export type Volunteer = z.infer<typeof VolunteerSchema>;
export type Publication = z.infer<typeof PublicationSchema>;
export type Resume = z.infer<typeof ResumeSchema>;
export type AIResponse = z.infer<typeof AIResponseSchema>;
export type ATSAnalysis = z.infer<typeof ATSAnalysisSchema>;
export type CoverLetter = z.infer<typeof CoverLetterSchema>;
