import { NextResponse, type NextRequest } from "next/server";
import { getModel } from "@/lib/gemini/client";
import type { QuizQuestion } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, numQuestions = 5, difficulty = "medium", course } = body;

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const prompt = `Generate ${numQuestions} multiple-choice questions about "${topic}"${course ? ` for the course "${course}"` : ""}.

Difficulty: ${difficulty}

Return a valid JSON array of objects with this exact structure:
[
  {
    "id": "1",
    "question": "Question text here",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Brief explanation of the correct answer"
  }
]

Requirements:
- 4 options per question
- correctIndex is 0-3 (index of correct option)
- explanations should be educational and concise
- Questions should be appropriate for university level
- Return ONLY the JSON array, no other text`;

    const model = getModel();
    const result = await model.generateContent(prompt);
    const content = result.response.text().trim();
    const jsonText = content.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/, "").trim();

    let questions: QuizQuestion[];
    try {
      const parsed = JSON.parse(jsonText);
      questions = Array.isArray(parsed) ? parsed : parsed.questions ?? [];
    } catch {
      return NextResponse.json({ error: "Failed to parse quiz response" }, { status: 500 });
    }

    return NextResponse.json({ data: questions });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Failed to generate quiz";
    console.error("POST /api/ai/quiz error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
