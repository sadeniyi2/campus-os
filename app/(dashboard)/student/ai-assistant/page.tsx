"use client";

import { useState } from "react";
import { Sparkles, MessageSquare, Brain, Layers } from "lucide-react";
import { AIChat } from "@/components/ai/AIChat";
import { QuizGenerator } from "@/components/ai/QuizGenerator";
import { FlashcardGenerator } from "@/components/ai/FlashcardGenerator";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "chat", label: "AI Chat", icon: MessageSquare, description: "Ask anything about your courses" },
  { id: "quiz", label: "Quiz", icon: Brain, description: "Generate practice MCQs" },
  { id: "flashcards", label: "Flashcards", icon: Layers, description: "Create study flashcards" },
];

export default function AIAssistantPage() {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center size-12 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shrink-0">
          <Sparkles className="size-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Study Assistant</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Powered by Gemini — your intelligent academic companion
          </p>
        </div>
      </div>

      {/* Tab selector */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground border-transparent shadow-sm"
                  : "border-border hover:bg-accent text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="size-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className={cn(activeTab === "chat" ? "h-[calc(100vh-280px)] min-h-96" : "")}>
        {activeTab === "chat" && <AIChat />}
        {activeTab === "quiz" && <QuizGenerator />}
        {activeTab === "flashcards" && <FlashcardGenerator />}
      </div>
    </div>
  );
}
