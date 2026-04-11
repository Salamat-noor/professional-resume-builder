import { ChatPromptTemplate, HumanMessagePromptTemplate } from "@langchain/core/prompts";
import { resumeSystemPrompt } from ".";

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