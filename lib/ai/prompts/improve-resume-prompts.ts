import { ChatPromptTemplate, HumanMessagePromptTemplate } from "@langchain/core/prompts";
import { resumeSystemPrompt } from ".";


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


// Chat/QA prompt
export const resumeChatPrompt = ChatPromptTemplate.fromMessages([
  resumeSystemPrompt,
  HumanMessagePromptTemplate.fromTemplate(
    `The user has a question about their resume or job search.

## Conversation History:
{history}

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

