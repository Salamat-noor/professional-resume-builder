import { ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate } from "@langchain/core/prompts";

// System prompt for all resume operations
export const resumeSystemPrompt = SystemMessagePromptTemplate.fromTemplate(
  `You are an expert resume writer and career coach with 20 years of experience helping professionals secure jobs at top-tier companies.
  
Your expertise includes:
- ATS optimization and keyword matching
- Quantifying achievements with metrics
- Tailoring resumes to specific job descriptions
- Industry-specific best practices
- Clear, impactful writing

Always provide structured output in the requested format. Be concise but thorough.`
);

// Tailor resume to job description
export const tailorResumePrompt = ChatPromptTemplate.fromMessages([
  resumeSystemPrompt,
  HumanMessagePromptTemplate.fromTemplate(
    `Please tailor the following resume to match this job description.

## Job Description:
{jobDescription}

## Current Resume:
{resume}

Instructions:
1. Analyze the job description for key requirements and keywords
2. Rewrite the professional summary to highlight relevant qualifications
3. Reorder and reword experience bullets to prioritize matching skills
4. Add quantifiable metrics where possible
5. Ensure all relevant keywords from the job description are naturally incorporated
6. Return the complete tailored resume with an explanation of changes made`
  ),
]);

// General resume improvement
export const improveResumePrompt = ChatPromptTemplate.fromMessages([
  resumeSystemPrompt,
  HumanMessagePromptTemplate.fromTemplate(
    `Please improve the following resume section.

## Section to Improve: {section}

## Current Content:
{content}

## Improvement Type: {improvementType}

Instructions:
- IMPACT: Add metrics, numbers, and quantify achievements
- CLARITY: Make bullet points clearer and more concise
- EXPAND: Add more detail and context
- PROFESSIONAL: Elevate the language and tone

Provide the improved content with a brief explanation of changes.`
  ),
]);


export const resumeEditPrompt = ChatPromptTemplate.fromMessages([
  resumeSystemPrompt,
  HumanMessagePromptTemplate.fromTemplate(`
You are editing a structured resume.

Task:
{question}

Rules:
- Always return valid structured output
- Always return a resume object
- Modify the resume only if the task asks for edits
- Preserve existing facts unless explicitly told otherwise
- Never invent metrics, dates, job titles, employers, tools, certifications, or achievements
- If information is missing, keep that part unchanged and mention the gap in the message
- Keep the output concise, professional, and ATS-friendly

## Current Resume:
{resume}
`),
]);

// Chat/QA prompt
export const resumeChatPrompt = ChatPromptTemplate.fromMessages([
  resumeSystemPrompt,
  HumanMessagePromptTemplate.fromTemplate(
    `The user has a question about their resume or job search.

## Current Resume:
{resume}

## User Question:
{question}

Provide helpful advice. If the question suggests changes to the resume, include the updated resume. Otherwise, return the original resume unchanged.`
  ),
]);

// Cover letter generation
export const coverLetterPrompt = ChatPromptTemplate.fromMessages([
  resumeSystemPrompt,
  HumanMessagePromptTemplate.fromTemplate(
    `Generate a compelling cover letter based on the following information.

## Resume:
{resume}

## Job Description:
{jobDescription}

## Target Company: {company}
## Hiring Manager (if known): {hiringManager}
## Desired Tone: {tone}

Instructions:
1. Hook the reader with a strong opening
2. Connect 2-3 specific experiences from the resume to job requirements
3. Show enthusiasm for the company and role
4. Include a clear call to action
5. Keep it concise (300-400 words)`
  ),
]);
