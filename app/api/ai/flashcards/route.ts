import { NextResponse, type NextRequest } from "next/server";
import { getModel } from "@/lib/gemini/client";
import type { Flashcard } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, numCards = 8, course } = body;

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const prompt = `Generate ${numCards} flashcards about "${topic}"${course ? ` for the course "${course}"` : ""}.

Return a valid JSON array with this exact structure:
[
  {
    "id": "1",
    "front": "Question or concept on the front of the card",
    "back": "Detailed explanation or answer on the back",
    "known": false
  }
]

Requirements:
- Each card should test a distinct concept or fact
- Front should be a clear question or concept prompt
- Back should be a comprehensive but concise explanation (2-4 sentences max)
- Appropriate for university level
- Return ONLY the JSON array, no other text`;

    const model = getModel();
    const result = await model.generateContent(prompt);
    const content = result.response.text().trim();
    const jsonText = content
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();

    let cards: Flashcard[];
    try {
      const parsed = JSON.parse(jsonText);
      cards = Array.isArray(parsed) ? parsed : parsed.cards ?? [];
    } catch {
      return NextResponse.json({ error: "Failed to parse flashcard response" }, { status: 500 });
    }

    return NextResponse.json({ data: cards });
  } catch (error) {
    console.error("POST /api/ai/flashcards error:", error);
    return NextResponse.json({ error: "Failed to generate flashcards" }, { status: 500 });
  }
}
