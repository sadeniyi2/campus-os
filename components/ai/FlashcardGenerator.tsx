"use client";

import { useState } from "react";
import { Sparkles, ChevronLeft, ChevronRight, RotateCcw, ThumbsUp, ThumbsDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Flashcard } from "@/types";

const SAMPLE_CARDS: Flashcard[] = [
  { id: "1", front: "What is a Binary Search Tree?", back: "A BST is a tree data structure where each node has at most two children, and for each node, all values in the left subtree are smaller and all values in the right subtree are larger.", known: false },
  { id: "2", front: "Define Big-O notation", back: "Big-O notation describes the upper bound of an algorithm's time or space complexity, representing the worst-case scenario as input size grows towards infinity.", known: false },
  { id: "3", front: "What is polymorphism in OOP?", back: "Polymorphism allows objects of different classes to be treated as objects of a common superclass. It enables the same interface to be used for different underlying forms (data types).", known: false },
  { id: "4", front: "Explain TCP vs UDP", back: "TCP (Transmission Control Protocol) is connection-oriented, reliable, and ordered. UDP (User Datagram Protocol) is connectionless, faster but unreliable. TCP guarantees delivery; UDP prioritizes speed.", known: false },
];

export function FlashcardGenerator() {
  const [topic, setTopic] = useState("");
  const [cards, setCards] = useState<Flashcard[] | null>(null);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [direction, setDirection] = useState(1);

  const generate = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 1200));
    setCards(SAMPLE_CARDS.map((c) => ({ ...c, known: false })));
    setCurrent(0);
    setFlipped(false);
    setIsGenerating(false);
  };

  const navigate = (dir: number) => {
    if (!cards) return;
    setDirection(dir);
    setFlipped(false);
    setCurrent((c) => Math.max(0, Math.min(cards.length - 1, c + dir)));
  };

  const markKnown = (known: boolean) => {
    if (!cards) return;
    setCards(cards.map((c, i) => i === current ? { ...c, known } : c));
    if (current < cards.length - 1) navigate(1);
  };

  if (!cards) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            Flashcard Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Topic / Course</Label>
            <Input
              placeholder="e.g. Computer Networks, Algorithms, Databases..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <Button
            variant="gradient"
            className="w-full gap-2"
            onClick={generate}
            loading={isGenerating}
            disabled={!topic.trim()}
          >
            <Sparkles className="size-4" />
            Generate Flashcards
          </Button>
        </CardContent>
      </Card>
    );
  }

  const card = cards[current];
  const knownCount = cards.filter((c) => c.known).length;

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{current + 1} / {cards.length}</span>
        <span className="text-emerald-600 font-medium">{knownCount} known</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-violet-500 to-emerald-500 rounded-full transition-all duration-300"
          style={{ width: `${((current + 1) / cards.length) * 100}%` }} />
      </div>

      {/* Card */}
      <div className="relative h-56 cursor-pointer" onClick={() => setFlipped(!flipped)}>
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.4, type: "spring", bounce: 0.1 }}
        >
          {/* Front */}
          <Card className="absolute inset-0 flex items-center justify-center p-6 text-center" style={{ backfaceVisibility: "hidden" }}>
            <CardContent className="p-0">
              <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Question</p>
              <p className="text-base font-semibold">{card.front}</p>
              <p className="text-xs text-muted-foreground mt-4">Click to reveal answer</p>
            </CardContent>
          </Card>

          {/* Back */}
          <Card className="absolute inset-0 flex items-center justify-center p-6 text-center bg-primary/5 border-primary/20"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            <CardContent className="p-0">
              <p className="text-xs text-primary mb-3 uppercase tracking-wider font-medium">Answer</p>
              <p className="text-sm text-foreground leading-relaxed">{card.back}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" disabled={current === 0} onClick={() => navigate(-1)}>
          <ChevronLeft className="size-4" />
        </Button>

        <div className="flex gap-2 flex-1">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-1.5 text-red-600 border-red-200 hover:bg-red-50"
            onClick={() => markKnown(false)}
          >
            <ThumbsDown className="size-3.5" /> Review Again
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-1.5 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
            onClick={() => markKnown(true)}
          >
            <ThumbsUp className="size-3.5" /> I Know This
          </Button>
        </div>

        <Button variant="outline" size="icon" disabled={current === cards.length - 1} onClick={() => navigate(1)}>
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="w-full gap-1.5 text-xs"
        onClick={() => { setCards(null); setTopic(""); }}
      >
        <RotateCcw className="size-3.5" /> New Flashcard Set
      </Button>
    </div>
  );
}
