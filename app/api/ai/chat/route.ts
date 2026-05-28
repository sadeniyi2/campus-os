import { NextResponse, type NextRequest } from "next/server";
import { openai, EDUCATIONAL_SYSTEM_PROMPT } from "@/lib/openai/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, courseContext } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    const systemPrompt = courseContext
      ? `${EDUCATIONAL_SYSTEM_PROMPT}\n\nCurrent course context: ${courseContext}`
      : EDUCATIONAL_SYSTEM_PROMPT;

    const stream = await openai.chat.completions.create({
      model: "gpt-4o",
      stream: true,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.slice(-20),
      ],
      max_tokens: 2048,
      temperature: 0.7,
    });

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const data = JSON.stringify(chunk);
            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("POST /api/ai/chat error:", error);
    return NextResponse.json({ error: "AI service unavailable" }, { status: 500 });
  }
}
