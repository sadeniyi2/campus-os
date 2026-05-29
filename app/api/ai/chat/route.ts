import { NextResponse, type NextRequest } from "next/server";
import { getModel, EDUCATIONAL_SYSTEM_PROMPT } from "@/lib/gemini/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, courseContext } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    const systemPrompt = courseContext
      ? `${EDUCATIONAL_SYSTEM_PROMPT}\n\nCurrent course context: ${courseContext}`
      : EDUCATIONAL_SYSTEM_PROMPT;

    const model = getModel();

    // Build history: exclude the last message (sent separately) and any leading
    // assistant/model messages — Gemini requires history to start with 'user'.
    const rawHistory = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));
    const firstUserIdx = rawHistory.findIndex((m) => m.role === "user");
    const history = firstUserIdx >= 0 ? rawHistory.slice(firstUserIdx) : [];

    const lastMessage = messages[messages.length - 1].content as string;

    const chat = model.startChat({
      systemInstruction: systemPrompt,
      history,
    });

    const result = await chat.sendMessageStream(lastMessage);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              // Emit in same SSE shape the client already parses
              const data = JSON.stringify({ choices: [{ delta: { content: text } }] });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "AI service unavailable";
    console.error("POST /api/ai/chat error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
