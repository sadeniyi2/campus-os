"use client";

import { useState } from "react";
import { Sparkles, CheckCircle, XCircle, RotateCcw, Trophy, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { QuizQuestion } from "@/types";

export function QuizGenerator() {
  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState("5");
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const generateQuiz = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, numQuestions: parseInt(numQuestions), difficulty: "medium" }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to generate quiz");
      setQuiz(json.data as QuizQuestion[]);
      setAnswers({});
      setSubmitted(false);
      setCurrentQuestion(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsGenerating(false);
    }
  };

  const score = quiz
    ? quiz.filter((q) => answers[q.id] === q.correctIndex).length
    : 0;

  if (submitted && quiz) {
    return (
      <div className="space-y-4">
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-6 text-center">
            <Trophy className="size-12 text-amber-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold">Quiz Complete!</h3>
            <p className="text-3xl font-bold mt-2 gradient-text">{score}/{quiz.length}</p>
            <p className="text-muted-foreground text-sm mt-1">
              {score === quiz.length ? "Perfect score! 🎉" : score >= quiz.length * 0.7 ? "Great job! 👏" : "Keep studying! 📚"}
            </p>
            <div className="flex gap-2 justify-center mt-4">
              <Button variant="outline" size="sm" onClick={() => { setSubmitted(false); setAnswers({}); setCurrentQuestion(0); }}>
                <RotateCcw className="size-3.5 mr-1" /> Retry
              </Button>
              <Button variant="gradient" size="sm" onClick={() => { setQuiz(null); setTopic(""); }}>
                New Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
        {quiz.map((q, i) => (
          <Card key={q.id}>
            <CardContent className="p-4">
              <p className="text-sm font-medium mb-3">
                {i + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, j) => (
                  <div
                    key={j}
                    className={cn(
                      "flex items-center gap-2 p-2.5 rounded-lg text-sm",
                      j === q.correctIndex && "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800",
                      answers[q.id] === j && j !== q.correctIndex && "bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800"
                    )}
                  >
                    {j === q.correctIndex ? <CheckCircle className="size-4 text-emerald-500 shrink-0" /> :
                     answers[q.id] === j ? <XCircle className="size-4 text-red-500 shrink-0" /> :
                     <div className="size-4 rounded-full border border-current shrink-0" />}
                    {opt}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3 p-2.5 bg-muted rounded-lg">{q.explanation}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (quiz) {
    const question = quiz[currentQuestion];
    const answered = answers[question.id] !== undefined;
    const progress = ((currentQuestion + 1) / quiz.length) * 100;

    return (
      <div className="space-y-4">
        {/* Progress */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Question {currentQuestion + 1} of {quiz.length}</span>
          <span className="font-medium">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardContent className="p-5">
                <p className="font-semibold text-sm mb-4">{question.question}</p>
                <div className="space-y-2">
                  {question.options.map((opt, j) => (
                    <button
                      key={j}
                      onClick={() => !answered && setAnswers({ ...answers, [question.id]: j })}
                      className={cn(
                        "w-full text-left p-3 rounded-lg text-sm border transition-all",
                        !answered && "hover:border-primary hover:bg-primary/5 cursor-pointer",
                        answered && j === question.correctIndex && "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700",
                        answered && answers[question.id] === j && j !== question.correctIndex && "border-red-500 bg-red-50 dark:bg-red-950/30 text-red-700",
                        answers[question.id] === j && j === question.correctIndex && "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
                        !answered ? "border-border" : j !== question.correctIndex && answers[question.id] !== j && "border-border opacity-50"
                      )}
                    >
                      <span className="font-mono text-xs mr-2 opacity-60">{String.fromCharCode(65 + j)}.</span>
                      {opt}
                    </button>
                  ))}
                </div>
                {answered && (
                  <p className="text-xs text-muted-foreground mt-3 p-3 bg-muted rounded-lg">{question.explanation}</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between">
          <Button variant="outline" size="sm" disabled={currentQuestion === 0} onClick={() => setCurrentQuestion((c) => c - 1)}>
            Previous
          </Button>
          {currentQuestion < quiz.length - 1 ? (
            <Button size="sm" disabled={!answered} onClick={() => setCurrentQuestion((c) => c + 1)}>
              Next
            </Button>
          ) : (
            <Button variant="gradient" size="sm" disabled={Object.keys(answers).length < quiz.length} onClick={() => setSubmitted(true)}>
              Submit Quiz
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          AI Quiz Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Topic / Course</Label>
          <Input
            placeholder="e.g. Data Structures, Operating Systems, Networking..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Number of Questions</Label>
          <div className="flex gap-2">
            {["5", "10", "15", "20"].map((n) => (
              <button
                key={n}
                onClick={() => setNumQuestions(n)}
                className={cn(
                  "flex-1 py-2 rounded-lg text-sm font-medium border transition-colors",
                  numQuestions === n ? "bg-primary text-primary-foreground border-transparent" : "border-border hover:bg-accent"
                )}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
        {error && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400">
            <AlertCircle className="size-4 shrink-0 mt-0.5" />
            <p className="text-xs">{error}</p>
          </div>
        )}
        <Button
          variant="gradient"
          className="w-full gap-2"
          onClick={generateQuiz}
          loading={isGenerating}
          disabled={!topic.trim()}
        >
          <Sparkles className="size-4" />
          Generate Quiz
        </Button>
      </CardContent>
    </Card>
  );
}
