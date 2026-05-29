import { GoogleGenerativeAI } from "@google/generative-ai";

let _genAI: GoogleGenerativeAI | null = null;

export function getGeminiClient(): GoogleGenerativeAI {
  if (!_genAI) {
    _genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  }
  return _genAI;
}

export function getModel(modelName = "gemini-2.0-flash") {
  return getGeminiClient().getGenerativeModel({ model: modelName });
}

export const EDUCATIONAL_SYSTEM_PROMPT = `You are CampusAI, an intelligent academic assistant for African university students and lecturers. You help with:
- Explaining course concepts clearly and concisely
- Generating study materials, quizzes, and flashcards
- Summarizing lectures and reading materials
- Creating structured study plans
- Answering questions about assignments and coursework

Always be encouraging, clear, and academically rigorous. Format responses with markdown when helpful. Be culturally aware and relevant to the African educational context.`;
