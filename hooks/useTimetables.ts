"use client";

import { useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Timetable, TimetableType } from "@/types";

interface TimetableFilters {
  semester?: string;
  type?: TimetableType;
  department?: string;
  search?: string;
}

async function fetchTimetables(filters: TimetableFilters) {
  const params = new URLSearchParams();
  if (filters.semester) params.set("semester", filters.semester);
  if (filters.type) params.set("type", filters.type);
  if (filters.department) params.set("department", filters.department);
  if (filters.search) params.set("search", filters.search);
  const res = await fetch(`/api/timetables?${params}`);
  if (!res.ok) throw new Error("Failed to fetch timetables");
  return res.json();
}

async function uploadTimetable(formData: FormData) {
  const res = await fetch("/api/timetables", { method: "POST", body: formData });
  if (!res.ok) throw new Error("Failed to upload timetable");
  return res.json();
}

export function useTimetables(filters: TimetableFilters = {}) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["timetables", filters],
    queryFn: () => fetchTimetables(filters),
    staleTime: 5 * 60_000,
  });

  const uploadMutation = useMutation({
    mutationFn: uploadTimetable,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["timetables"] }),
  });

  const timetables: Timetable[] = query.data?.data ?? [];
  const pinned = timetables.filter((t) => t.isPinned);
  const regular = timetables.filter((t) => !t.isPinned);

  return {
    timetables,
    pinned,
    regular,
    total: query.data?.total ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    upload: useCallback((formData: FormData) => uploadMutation.mutateAsync(formData), [uploadMutation]),
    isUploading: uploadMutation.isPending,
  };
}
