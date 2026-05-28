"use client";

import { useState } from "react";
import { Send, Paperclip, Calendar, AlertCircle, Eye, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ANNOUNCEMENT_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { AnnouncementCategory } from "@/types";

interface AnnouncementEditorProps {
  onSubmit?: (data: {
    title: string;
    content: string;
    category: AnnouncementCategory;
    isUrgent: boolean;
    isPinned: boolean;
  }) => void;
  onCancel?: () => void;
}

export function AnnouncementEditor({ onSubmit, onCancel }: AnnouncementEditorProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<AnnouncementCategory>("ACADEMIC");
  const [isUrgent, setIsUrgent] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [preview, setPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    onSubmit?.({ title, content, category, isUrgent, isPinned });
    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">New Announcement</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPreview(!preview)}
            className="gap-1.5 text-xs"
          >
            {preview ? <Edit2 className="size-3.5" /> : <Eye className="size-3.5" />}
            {preview ? "Edit" : "Preview"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {preview ? (
          <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
            <h3 className="font-semibold">{title || "Untitled announcement"}</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{content || "No content yet..."}</p>
            <div className="flex gap-2">
              <Badge className={ANNOUNCEMENT_CATEGORIES.find((c) => c.value === category)?.color}>{category}</Badge>
              {isUrgent && <Badge variant="destructive">Urgent</Badge>}
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Announcement title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Write your announcement here... Markdown is supported."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label>Category</Label>
          <div className="flex flex-wrap gap-2">
            {ANNOUNCEMENT_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value as AnnouncementCategory)}
                className={cn(
                  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  category === cat.value ? "bg-primary text-primary-foreground border-transparent" : "border-border hover:bg-accent"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isUrgent}
              onChange={(e) => setIsUrgent(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm flex items-center gap-1">
              <AlertCircle className="size-3.5 text-red-500" />
              Mark as Urgent
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Pin announcement</span>
          </label>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <Paperclip className="size-3.5" />
            Attach file
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <Calendar className="size-3.5" />
            Schedule
          </Button>
          <div className="flex-1" />
          {onCancel && (
            <Button variant="ghost" size="sm" onClick={onCancel}>Cancel</Button>
          )}
          <Button
            variant="gradient"
            size="sm"
            className="gap-1.5"
            onClick={handleSubmit}
            loading={isSubmitting}
            disabled={!title.trim() || !content.trim()}
          >
            <Send className="size-3.5" />
            Post
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
