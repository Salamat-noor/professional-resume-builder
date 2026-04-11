import { ChatGroq } from "@langchain/groq";

// Initialize Groq model with configuration

export const groqModel = new ChatGroq({
  model: process.env.GROQ_LLM_MODEL || "openai/gpt-oss-120b",
  temperature: 0.3,
  maxTokens: 4128,
  maxRetries: 2,
});

export const creativeModel = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: process.env.GROQ_LLM_MODEL || "llama-3.3-70b-versatile",
  temperature: 0.3,
  maxTokens: 4128,
});
