// Export all chains
export { tailorResume, type TailorResumeInput, type TailorResumeOutput } from "./chains/resume-tailor";
export { improveResume, type ImprovementType, type ImproveResumeInput } from "./chains/resume-improve";
export { analyzeATS, quickScanATS, type ATSAnalysisInput, type ATSQuickScanInput } from "./chains/ats-analyzer";
export { generateCoverLetter, type CoverLetterTone, type GenerateCoverLetterInput } from "./chains/cover-letter";
export { chatWithAssistant, type ChatInput } from "./chains/chat-assistant";

// Export memory-based chat (recommended)
export { 
  chatWithMemory, 
  type ChatWithMemoryInput, 
  getSessionHistory,
  clearChatSession,
} from "./chains/chat-assistant-with-memory";

// Export memory utilities
export {
  getOrCreateSession,
  addMessagesToSession,
  getChatHistory,
  getLangChainHistory,
  clearSession,
  type ChatSession,
} from "./memory/chat-memory";

// Export schemas and types
export {
  ContactSchema,
  ExperienceSchema,
  EducationSchema,
  ProjectSchema,
  CertificationSchema,
  LanguageSchema,
  AchievementSchema,
  ResumeSchema,
  AIResponseSchema,
  ATSAnalysisSchema,
  CoverLetterSchema,
  type Contact,
  type Experience,
  type Education,
  type Project,
  type Certification,
  type Language,
  type Achievement,
  type Resume,
  type AIResponse,
  type ATSAnalysis,
  type CoverLetter,
} from "./schemas/resume-schemas";

// Export models
export { groqModel, creativeModel } from "./models/groq-model";
