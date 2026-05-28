"use client";

import { useState, useCallback, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import type { AIMessage, QuizQuestion, Flashcard } from "@/types";

export function useAIChat(courseContext?: string) {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      const userMessage: AIMessage = { role: "user", content, id: crypto.randomUUID() };
      setMessages((prev) => [...prev, userMessage]);
      setIsStreaming(true);

      const assistantId = crypto.randomUUID();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "", id: assistantId },
      ]);

      abortRef.current = new AbortController();

      try {
        const res = await fetch("/api/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, userMessage].map(({ role, content }) => ({ role, content })),
            courseContext,
          }),
          signal: abortRef.current.signal,
        });

        if (!res.ok) throw new Error("Chat request failed");

        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const text = decoder.decode(value);
          const lines = text.split("\n");

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6).trim();
            if (data === "[DONE]") break;
            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices?.[0]?.delta?.content ?? "";
              accumulated += delta;
              setMessages((prev) =>
                prev.map((m) => (m.id === assistantId ? { ...m, content: accumulated } : m))
              );
            } catch {
              // skip malformed SSE chunk
            }
          }
        }
      } catch (err: unknown) {
        if ((err as Error).name !== "AbortError") {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: "Sorry, I encountered an error. Please try again." }
                : m
            )
          );
        }
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, courseContext]
  );

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const clearMessages = useCallback(() => setMessages([]), []);

  return { messages, isStreaming, sendMessage, stopStreaming, clearMessages };
}

export function useQuizGenerator() {
  const mutation = useMutation({
    mutationFn: async ({
      topic,
      course,
      count,
      difficulty,
    }: {
      topic: string;
      course?: string;
      count: number;
      difficulty: string;
    }) => {
      const res = await fetch("/api/ai/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, course, count, difficulty }),
      });
      if (!res.ok) throw new Error("Quiz generation failed");
      const data = await res.json();
      return data.data.questions as QuizQuestion[];
    },
  });

  return {
    questions: mutation.data ?? [],
    isGenerating: mutation.isPending,
    isError: mutation.isError,
    generate: mutation.mutate,
    reset: mutation.reset,
  };
}

export function useFlashcardGenerator() {
  const mutation = useMutation({
    mutationFn: async ({ topic, course }: { topic: string; course?: string }) => {
      const res = await fetch("/api/ai/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: topic, course, type: "flashcard" }),
      });
      if (!res.ok) throw new Error("Flashcard generation failed");
      const data = await res.json();
      // Parse summary into flashcards format
      const lines = (data.data.summary as string)
        .split("\n")
        .filter((l: string) => l.trim().length > 0);
      const cards: Flashcard[] = lines
        .filter((_: string, i: number) => i % 2 === 0)
        .map((front: string, i: number) => ({
          id: crypto.randomUUID(),
          front: front.replace(/^[*#\d.]+\s*/, "").trim(),
          back: lines[i * 2 + 1]?.replace(/^[*#\d.]+\s*/, "").trim() ?? "Review this concept.",
          known: false,
        }));
      return cards;
    },
  });

  return {
    flashcards: mutation.data ?? [],
    isGenerating: mutation.isPending,
    isError: mutation.isError,
    generate: mutation.mutate,
    reset: mutation.reset,
  };
}

export function useSummarizer() {
  const mutation = useMutation({
    mutationFn: async ({
      text,
      course,
      type,
    }: {
      text: string;
      course?: string;
      type?: string;
    }) => {
      const res = await fetch("/api/ai/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, course, type }),
      });
      if (!res.ok) throw new Error("Summarization failed");
      const data = await res.json();
      return data.data.summary as string;
    },
  });

  return {
    summary: mutation.data ?? "",
    isSummarizing: mutation.isPending,
    isError: mutation.isError,
    summarize: mutation.mutate,
    reset: mutation.reset,
  };
}
