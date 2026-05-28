"use client";

import { useEffect, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useNotificationStore } from "@/store/useNotificationStore";
import type { Notification } from "@/types";

async function fetchNotifications(page = 1, limit = 20) {
  const res = await fetch(`/api/notifications?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch notifications");
  return res.json();
}

async function markNotificationsRead(ids?: string[]) {
  const res = await fetch("/api/notifications", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ids ? { ids } : { markAll: true }),
  });
  if (!res.ok) throw new Error("Failed to mark notifications as read");
  return res.json();
}

export function useNotifications(page = 1) {
  const queryClient = useQueryClient();
  const { addNotification, markRead, markAllRead, setNotifications } =
    useNotificationStore();

  const query = useQuery({
    queryKey: ["notifications", page],
    queryFn: () => fetchNotifications(page),
    staleTime: 30_000,
  });

  useEffect(() => {
    if (query.data?.data) {
      setNotifications(query.data.data);
    }
  }, [query.data, setNotifications]);

  const markReadMutation = useMutation({
    mutationFn: (ids: string[]) => markNotificationsRead(ids),
    onSuccess: (_, ids) => {
      ids.forEach((id) => markRead(id));
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const markAllReadMutation = useMutation({
    mutationFn: () => markNotificationsRead(),
    onSuccess: () => {
      markAllRead();
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  // Supabase Realtime subscription
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "Notification" },
        (payload) => {
          const notification = payload.new as Notification;
          addNotification(notification);
          queryClient.invalidateQueries({ queryKey: ["notifications"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [addNotification, queryClient]);

  const handleMarkRead = useCallback(
    (ids: string[]) => markReadMutation.mutate(ids),
    [markReadMutation]
  );

  const handleMarkAllRead = useCallback(
    () => markAllReadMutation.mutate(),
    [markAllReadMutation]
  );

  return {
    notifications: query.data?.data ?? [],
    total: query.data?.total ?? 0,
    unreadCount: query.data?.unreadCount ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    markRead: handleMarkRead,
    markAllRead: handleMarkAllRead,
  };
}
