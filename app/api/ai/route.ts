export const runtime = "nodejs";

import { NextResponse } from "next/server";
import Groq from "groq-sdk";


const SYSTEM_PROMPT = `You are an expert resume writer and career coach with 20 years of experience helping professionals secure jobs at top-tier companies. Your goal is to rewrite resumes to be ATS-friendly and highly tailored to specific job descriptions.
`;

const RESUME_SCHEMA = {
  type: "object",
  properties: {
    message: { type: "string" },
    resume: {
      type: "object",
      properties: {
        contact: {
          type: "object",
          properties: {
            name: { type: "string" },
            role: { type: "string" },
            location: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" },
            linkedin: { type: "string" },
          },
          required: ["name", "role", "location", "email", "phone", "linkedin"],
          additionalProperties: false,
        },
        summary: { type: "string" },
        experience: {
          type: "array",
          items: {
            type: "object",
            properties: {
              title: { type: "string" },
              company: { type: "string" },
              period: { type: "string" },
              bullets: { type: "array", items: { type: "string" } },
            },
            required: ["title", "company", "period", "bullets"],
            additionalProperties: false,
          },
        },
        education: {
          type: "array",
          items: {
            type: "object",
            properties: {
              degree: { type: "string" },
              institution: { type: "string" },
              period: { type: "string" },
            },
            required: ["degree", "institution", "period"],
            additionalProperties: false,
          },
        },
        skills: { type: "array", items: { type: "string" } },
      },
      required: ["contact", "summary", "experience", "education", "skills"],
      additionalProperties: false,
    },
  },
  required: ["message", "resume"],
  additionalProperties: false,
};

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

interface JobExperience {
  title: string;
  company: string;
  period: string;
  bullets: string[];
}
interface ResumeData {
  contact: Record<string, string>;
  summary: string;
  experience: JobExperience[];
  education: Record<string, string>[];
  skills: string[];
}
interface AiResponse {
  message: string;
  resume: ResumeData;
}

function buildPrompt(userRequest: string, currentResume: unknown): string {
  return `
  I need to tailor my resume for a specific job application.

### Target Job Description:
Query message: ${userRequest}

### My Current Resume:
${JSON.stringify(currentResume)}

### Instructions:
0.  **Analyze** and understand the Query message before manking any changes to resume if user has not requested to improve resume then return back the current resume + resume perfection ideas in message 
1.  **Analyze** the job description to identify the top 10 keywords (hard skills, tools, job titles) if Query message is a job description.
2.  **Tailor** my professional summary to highlight qualifications relevant to this role.
3.  **Reword** my work experience bullet points to prioritize the skills mentioned in the job description.
4.  **Quantify** my achievements: If a bullet point is weak, suggest a way to add metrics (e.g., increased efficiency by X%).
5.  **Remove** any irrelevant experience to save space.

Return the updated, ATS-optimized resume in JSON format with fields: 

{
message : 'reply back to user',
resume: ${JSON.stringify(RESUME_SCHEMA)}
}

.

`;
}

async function requestFromLLM(userPrompt: string): Promise<AiResponse> {
  if (!process.env.GROQ_LLM_MODEL) throw new Error("model name is required");
  const response = await groq.chat.completions.create({
    model: process.env.GROQ_LLM_MODEL,
    temperature: 0.2,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "elite_resume_response",
        strict: true,
        schema: RESUME_SCHEMA,
      },
    },
  });

  return JSON.parse(response.choices[0].message.content || "{}");
}

function isDeepEqual(obj1: unknown, obj2: unknown): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function extractErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "An unexpected system error occurred.";
}

export async function POST(req: Request) {
  try {
    const { prompt, resume } = await req.json();
    if (!prompt) throw new Error("User prompt is required.");

    const aiResponse = await requestFromLLM(buildPrompt(prompt, resume));

    return NextResponse.json({
      message: aiResponse.message,
      // ✅ THE MAGIC: If the AI didn't change anything, the strings will match.
      // We return the original React object reference to prevent UI re-renders.
      resume: isDeepEqual(resume, aiResponse.resume)
        ? resume
        : aiResponse.resume,
    });
  } catch (error) {
    return NextResponse.json(
      { error: extractErrorMessage(error) },
      { status: 500 },
    );
  }
}
