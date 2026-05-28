"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AnnouncementEditor } from "@/components/announcements/AnnouncementEditor";
import { AnnouncementFeed } from "@/components/announcements/AnnouncementFeed";
import { Button } from "@/components/ui/button";

export default function CourseRepAnnouncementsPage() {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Announcements</h1>
          <p className="text-sm text-muted-foreground mt-1">Post and manage class announcements</p>
        </div>
        <Button variant="gradient" size="sm" className="gap-2" onClick={() => setShowEditor(!showEditor)}>
          <Plus className="size-4" /> Post
        </Button>
      </div>
      {showEditor && <AnnouncementEditor onCancel={() => setShowEditor(false)} />}
      <AnnouncementFeed />
    </div>
  );
}
