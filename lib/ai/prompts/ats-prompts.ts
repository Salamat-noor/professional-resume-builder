import { ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate } from "@langchain/core/prompts";

// ATS Analysis system prompt
export const atsSystemPrompt = SystemMessagePromptTemplate.fromTemplate(
  `You are an ATS (Applicant Tracking System) expert with deep knowledge of how recruiters screen resumes.
  
Your analysis covers:
- Keyword matching against job descriptions
- Resume formatting and structure
- Content quality and completeness
- Industry-specific optimization

Provide actionable, specific recommendations.`
);

// Full ATS analysis prompt
export const atsAnalysisPrompt = ChatPromptTemplate.fromMessages([
  atsSystemPrompt,
  HumanMessagePromptTemplate.fromTemplate(
    `Analyze this resume for ATS compatibility against the job description.

## Job Description:
{jobDescription}

## Resume:
{resume}

Provide:
1. Overall ATS score (0-100)
2. Keyword analysis - which important keywords are present/missing
3. Specific suggestions to improve the score
4. Brief summary of strengths and weaknesses`
  ),
]);

// Quick ATS scan (without job description)
export const atsQuickScanPrompt = ChatPromptTemplate.fromMessages([
  atsSystemPrompt,
  HumanMessagePromptTemplate.fromTemplate(
    `Perform a general ATS optimization scan on this resume.

## Resume:
{resume}

## Target Role (if specified): {targetRole}

Check for:
1. Common ATS-friendly formatting issues
2. Missing standard sections
3. Action verbs and quantified achievements
4. Keyword density and variety
5. Overall professional presentation`
  ),
]);
