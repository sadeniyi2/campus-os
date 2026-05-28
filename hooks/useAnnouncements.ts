"use client";

import { useEffect, useCallback } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Announcement, AnnouncementCategory } from "@/types";

interface FetchParams {
  category?: AnnouncementCategory;
  pageParam?: number;
  limit?: number;
}

async function fetchAnnouncements({ category, pageParam = 1, limit = 10 }: FetchParams) {
  const params = new URLSearchParams({ page: String(pageParam), limit: String(limit) });
  if (category) params.set("category", category);
  const res = await fetch(`/api/announcements?${params}`);
  if (!res.ok) throw new Error("Failed to fetch announcements");
  return res.json();
}

async function createAnnouncement(data: Partial<Announcement>) {
  const res = await fetch("/api/announcements", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create announcement");
  return res.json();
}

async function toggleReaction(announcementId: string, type: string) {
  const res = await fetch(`/api/announcements/${announcementId}/reactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type }),
  });
  if (!res.ok) throw new Error("Failed to toggle reaction");
  return res.json();
}

async function deleteAnnouncement(id: string) {
  const res = await fetch(`/api/announcements/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete announcement");
  return res.json();
}

export function useAnnouncements(category?: AnnouncementCategory) {
  const queryClient = useQueryClient();

  const query = useInfiniteQuery({
    queryKey: ["announcements", category],
    queryFn: ({ pageParam }) => fetchAnnouncements({ category, pageParam: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.flatMap((p) => p.data).length;
      return totalFetched < lastPage.total ? allPages.length + 1 : undefined;
    },
    staleTime: 60_000,
  });

  // Realtime subscription
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("announcements")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Announcement" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["announcements"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const createMutation = useMutation({
    mutationFn: createAnnouncement,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["announcements"] }),
  });

  const reactionMutation = useMutation({
    mutationFn: ({ id, type }: { id: string; type: string }) => toggleReaction(id, type),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["announcements"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAnnouncement,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["announcements"] }),
  });

  const announcements = query.data?.pages.flatMap((p) => p.data) ?? [];
  const pinned = announcements.filter((a: Announcement) => a.isPinned);
  const regular = announcements.filter((a: Announcement) => !a.isPinned);

  return {
    announcements,
    pinned,
    regular,
    total: query.data?.pages[0]?.total ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    create: useCallback((data: Partial<Announcement>) => createMutation.mutate(data), [createMutation]),
    toggleReaction: useCallback(
      (id: string, type: string) => reactionMutation.mutate({ id, type }),
      [reactionMutation]
    ),
    deleteAnnouncement: useCallback((id: string) => deleteMutation.mutate(id), [deleteMutation]),
    isCreating: createMutation.isPending,
  };
}
