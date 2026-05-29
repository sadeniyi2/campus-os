"use client";

import { useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GEOMARK_URL } from "@/lib/constants";

async function syncAttendance() {
  const res = await fetch("/api/attendance/sync", { method: "POST" });
  if (!res.ok) throw new Error("Sync failed");
  return res.json();
}

export function useAttendance() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["attendance"],
    queryFn: async () => {
      const res = await fetch("/api/attendance/sync");
      if (!res.ok) return { data: [], total: 0, averageAttendance: 0, atRisk: 0 };
      return res.json();
    },
    staleTime: 10 * 60_000,
  });

  const syncMutation = useMutation({
    mutationFn: syncAttendance,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["attendance"] }),
  });

  const openGeoMark = useCallback(() => {
    window.open(GEOMARK_URL, "_blank", "noopener,noreferrer");
  }, []);

  return {
    courses: query.data?.data ?? [],
    averageAttendance: query.data?.averageAttendance ?? 0,
    atRisk: query.data?.atRisk ?? 0,
    geomarkUrl: GEOMARK_URL,
    isLoading: query.isLoading,
    isError: query.isError,
    sync: useCallback(() => syncMutation.mutate(), [syncMutation]),
    isSyncing: syncMutation.isPending,
    openGeoMark,
  };
}
