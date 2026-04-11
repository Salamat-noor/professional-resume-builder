import { NextRequest, NextResponse } from "next/server";
import { chatWithMemory, type ChatWithMemoryInput } from "@/lib/ai/chains/chat-assistant-with-memory";
import { ResumeSchema } from "@/lib/ai/schemas/resume-schemas";
import { getTemplateConfig } from "@/lib/templates/registry";
import { TemplateId } from "@/types/builder";

function normalizeTemplateSectionId(sectionId: string): string {
  switch (sectionId) {
    case "objective":
      return "summary";
    case "portfolio":
      return "projects";
    default:
      return sectionId;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, resume, sessionId, templateId }: ChatWithMemoryInput & { templateId?: string } = body;

    if (!question || !resume) {
      return NextResponse.json(
        { error: "Question and resume are required" },
        { status: 400 }
      );
    }

    const parsedResume = ResumeSchema.safeParse(resume);
    if (!parsedResume.success) {
      return NextResponse.json(
        { error: "Resume payload is invalid" },
        { status: 400 }
      );
    }
    const sanitizedResume = parsedResume.data;

    // Get template context for better AI responses
    const templateConfig = templateId ? getTemplateConfig(templateId as TemplateId) : null;
    const allowedSections = templateConfig
      ? templateConfig.sections.map((section) => normalizeTemplateSectionId(section.id))
      : null;
    const templateContext = templateConfig
      ? `Category: ${templateConfig.category}\nAvailable Sections: ${allowedSections?.join(', ')}`
      : "No template context provided - use all available sections.";

    const input: ChatWithMemoryInput = {
      question,
      resume: sanitizedResume,
      sessionId,
      templateContext,
    };

    const result = await chatWithMemory(input);

    const filteredResume = templateConfig && result.resume
      ? Object.fromEntries(
          Object.entries(result.resume || {}).filter(([key]) =>
            allowedSections?.includes(key)
          )
        )
      : result.resume ?? null;

    const shouldUpdateResume = Boolean(result.shouldUpdateResume && filteredResume);
    const mergedResume = shouldUpdateResume
      ? {
          ...sanitizedResume,
          ...filteredResume,
        }
      : null;

    return NextResponse.json({
      message: result.message,
      shouldUpdateResume,
      resume: mergedResume,
      sessionId: result.sessionId,
    });
  } catch (error) {
    console.error("AI chat error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to process AI request",
        message: "Sorry, I encountered an error. Please try again.",
      },
      { status: 500 }
    );
  }
}
