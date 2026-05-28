import OpenAI from "openai";

let _openai: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (!_openai) {
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  }
  return _openai;
}

// Convenience named export for direct use in route handlers
export const openai = {
  get chat() {
    return getOpenAIClient().chat;
  },
};

export const EDUCATIONAL_SYSTEM_PROMPT = `You are CampusAI, an intelligent academic assistant for African university students and lecturers. You help with:
- Explaining course concepts clearly and concisely
- Generating study materials, quizzes, and flashcards
- Summarizing lectures and reading materials
- Creating structured study plans
- Answering questions about assignments and coursework

Always be encouraging, clear, and academically rigorous. Format responses with markdown when helpful. Be culturally aware and relevant to the African educational context.`;
