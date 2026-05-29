"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Copy, RefreshCw, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, formatRelativeTime } from "@/lib/utils";
import type { ChatMessage } from "@/types";

const SUGGESTED_PROMPTS = [
  "Explain binary search trees with examples",
  "Summarize the OSI model layers",
  "Create a study plan for my exams",
  "Generate 10 MCQ questions on networking",
  "Help me understand Big-O notation",
  "Explain object-oriented programming concepts",
];

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex gap-3 mb-4", isUser ? "flex-row-reverse" : "flex-row")}
    >
      {!isUser && (
        <Avatar className="size-8 shrink-0 mt-0.5">
          <AvatarFallback className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white text-xs">
            AI
          </AvatarFallback>
        </Avatar>
      )}
      <div className={cn("max-w-[80%] space-y-1", isUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-sm"
              : "bg-muted text-foreground rounded-tl-sm"
          )}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        <div className={cn("flex items-center gap-2", isUser ? "flex-row-reverse" : "flex-row")}>
          <span className="text-xs text-muted-foreground">{formatRelativeTime(message.createdAt)}</span>
          {!isUser && (
            <button
              onClick={() => navigator.clipboard.writeText(message.content)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Copy className="size-3" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function AIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm CampusAI, your personal study assistant. I can help you understand course concepts, generate quiz questions, create flashcards, and build study plans. What would you like to explore today?",
      createdAt: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        throw new Error(errBody.error ?? `Server error ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let aiContent = "";

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMsg]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") break;
              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta?.content ?? "";
                aiContent += delta;
                setMessages((prev) =>
                  prev.map((m) => m.id === aiMsg.id ? { ...m, content: aiContent } : m)
                );
              } catch { /* ignore parse errors */ }
            }
          }
        }
      }
    } catch (err) {
      const isApiError = err instanceof Error && err.message !== "Failed to get response";
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: isApiError
            ? `Error: ${(err as Error).message}`
            : "The AI service is temporarily unavailable. This usually means the GEMINI_API_KEY environment variable is missing or invalid. Please contact your administrator.",
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background rounded-xl border border-border overflow-hidden">
      {/* Chat header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center size-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
            <Sparkles className="size-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold">CampusAI</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-emerald-500 inline-block" />
              Powered by Gemini
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="size-8" onClick={() => setMessages([messages[0]])}>
          <RefreshCw className="size-3.5" />
        </Button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)}
        {isLoading && (
          <div className="flex gap-3 mb-4">
            <Avatar className="size-8 shrink-0">
              <AvatarFallback className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white text-xs">AI</AvatarFallback>
            </Avatar>
            <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="size-1.5 rounded-full bg-muted-foreground"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Suggested prompts (only show initially) */}
        {messages.length === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendMessage(prompt)}
                className="text-left text-sm p-3 rounded-xl border border-border hover:bg-accent hover:border-primary/30 transition-colors"
              >
                <BookOpen className="size-3.5 text-primary mb-1" />
                <p className="line-clamp-2">{prompt}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2 items-end">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about your courses... (Enter to send, Shift+Enter for newline)"
            className="flex-1 min-h-[44px] max-h-32 resize-none"
            rows={1}
          />
          <Button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            size="icon"
            variant="gradient"
            className="shrink-0"
          >
            <Send className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
