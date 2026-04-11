import { ChatGroq } from "@langchain/groq";

// Initialize Groq model with configuration
export const groqModel = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: process.env.GROQ_LLM_MODEL || "llama-3.3-70b-versatile",
  temperature: 0.1, // Low temperature for consistent structured output
  maxTokens: 10000,
});

// Higher temperature model for creative tasks
export const creativeModel = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: process.env.GROQ_LLM_MODEL || "llama-3.3-70b-versatile",
  temperature: 0.3,
  maxTokens: 4096,
});
