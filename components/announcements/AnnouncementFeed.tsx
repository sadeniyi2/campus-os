"use client";

import { useState } from "react";
import { Pin, Loader2, Bell } from "lucide-react";
import { AnnouncementCard } from "./AnnouncementCard";
import { AnnouncementFilters } from "./AnnouncementFilters";
import { MOCK_ANNOUNCEMENTS } from "@/lib/constants";
import type { Announcement } from "@/types";

type MockAnnouncement = (typeof MOCK_ANNOUNCEMENTS)[0];

type AugmentedAnnouncement = Omit<Announcement, "author"> & {
  author: { name: string; avatarUrl: null | string };
  _count: { reactions: number; comments: number };
};

function toAnnouncement(m: MockAnnouncement): AugmentedAnnouncement {
  return {
    id: m.id,
    title: m.title,
    content: m.content,
    authorId: "mock",
    category: m.category,
    isPinned: m.isPinned,
    isUrgent: m.isUrgent,
    isScheduled: false,
    attachments: [],
    targetRoles: [],
    createdAt: m.createdAt,
    updatedAt: m.createdAt,
    author: { name: m.author.name, avatarUrl: null },
    _count: m._count,
  };
}

export function AnnouncementFeed() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [search, setSearch] = useState("");

  const announcements = MOCK_ANNOUNCEMENTS.map(toAnnouncement);

  const pinned = announcements.filter((a) => a.isPinned);
  const rest = announcements.filter((a) => {
    const matchCat = selectedCategory === "ALL" || a.category === selectedCategory;
    const matchSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.content.toLowerCase().includes(search.toLowerCase());
    return !a.isPinned && matchCat && matchSearch;
  });

  return (
    <div className="space-y-4">
      <AnnouncementFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        search={search}
        onSearchChange={setSearch}
      />

      {pinned.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <Pin className="size-3.5 rotate-45" />
            Pinned
          </div>
          {pinned.map((a) => (
            <AnnouncementCard key={a.id} announcement={a} />
          ))}
        </div>
      )}

      <div className="space-y-3">
        {rest.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Bell className="size-10 text-muted-foreground opacity-30 mb-3" />
            <p className="font-medium text-sm">No announcements found</p>
            <p className="text-xs text-muted-foreground mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          rest.map((a) => <AnnouncementCard key={a.id} announcement={a} />)
        )}
      </div>
    </div>
  );
}
