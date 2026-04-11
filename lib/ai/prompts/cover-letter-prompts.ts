import { ChatPromptTemplate, HumanMessagePromptTemplate } from "@langchain/core/prompts";
import { resumeSystemPrompt } from ".";

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

