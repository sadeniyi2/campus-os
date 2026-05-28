"use client";

import { useState } from "react";
import { Pin, AlertCircle, ThumbsUp, CheckCheck, MessageCircle, MoreHorizontal, Clock } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatRelativeTime, getInitials } from "@/lib/utils";
import { ANNOUNCEMENT_CATEGORIES } from "@/lib/constants";
import type { Announcement } from "@/types";

interface AnnouncementCardProps {
  announcement: Omit<Announcement, "author"> & {
    author: { name: string; avatarUrl?: string | null };
    _count: { reactions: number; comments: number };
  };
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const [liked, setLiked] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const categoryInfo = ANNOUNCEMENT_CATEGORIES.find((c) => c.value === announcement.category);
  const likeCount = announcement._count.reactions + (liked ? 1 : 0);

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-md",
      announcement.isUrgent && "border-red-200 dark:border-red-900",
      announcement.isPinned && "border-primary/30"
    )}>
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="size-9 shrink-0">
              <AvatarFallback>{getInitials(announcement.author.name)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{announcement.author.name}</p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="size-3" />
                {formatRelativeTime(announcement.createdAt)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {announcement.isPinned && (
              <Pin className="size-4 text-primary rotate-45" />
            )}
            {announcement.isUrgent && (
              <Badge variant="destructive" className="text-xs gap-1">
                <AlertCircle className="size-3" /> Urgent
              </Badge>
            )}
            {categoryInfo && (
              <Badge className={cn("text-xs", categoryInfo.color)}>
                {categoryInfo.label}
              </Badge>
            )}
            <Button variant="ghost" size="icon" className="size-7">
              <MoreHorizontal className="size-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <h3 className="font-semibold text-sm mb-2">{announcement.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{announcement.content}</p>

        {/* Reaction bar */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            className={cn("gap-1.5 text-xs h-8", liked && "text-primary")}
            onClick={() => setLiked(!liked)}
          >
            <ThumbsUp className={cn("size-3.5", liked && "fill-current")} />
            {likeCount > 0 && likeCount}
            Like
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn("gap-1.5 text-xs h-8", acknowledged && "text-emerald-600")}
            onClick={() => setAcknowledged(!acknowledged)}
          >
            <CheckCheck className="size-3.5" />
            Acknowledge
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-xs h-8 ml-auto"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="size-3.5" />
            {announcement._count.comments} Comments
          </Button>
        </div>

        {/* Comments section placeholder */}
        {showComments && (
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground text-center py-3">
              Comments will appear here. Login to comment.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
