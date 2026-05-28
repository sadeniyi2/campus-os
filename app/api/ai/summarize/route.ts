import { NextResponse, type NextRequest } from "next/server";
import { openai } from "@/lib/openai/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, course, type = "lecture" } = body;

    if (!text?.trim()) {
      return NextResponse.json({ error: "Text content is required" }, { status: 400 });
    }

    if (text.length > 50000) {
      return NextResponse.json({ error: "Text too long. Maximum 50,000 characters." }, { status: 400 });
    }

    const prompt = `You are summarizing ${type === "lecture" ? "lecture notes" : "course material"}${course ? ` for "${course}"` : ""}.

Create a comprehensive yet concise summary that includes:
1. **Key Concepts** — Main ideas and definitions
2. **Important Points** — Critical facts to remember
3. **Examples** — Notable examples mentioned
4. **Summary** — 2-3 sentence overall summary

Content to summarize:
${text}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are an expert academic summarizer for university-level content. Create structured, clear summaries using markdown formatting." },
        { role: "user", content: prompt },
      ],
      max_tokens: 1500,
      temperature: 0.5,
    });

    const summary = response.choices[0]?.message?.content ?? "";
    return NextResponse.json({ data: { summary } });
  } catch (error) {
    console.error("POST /api/ai/summarize error:", error);
    return NextResponse.json({ error: "Failed to summarize content" }, { status: 500 });
  }
}
