"use client";

import { useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GEOMARK_URL, MOCK_ATTENDANCE } from "@/lib/constants";

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
      // Mock data returned since GeoMark is the external system
      return {
        data: MOCK_ATTENDANCE,
        total: MOCK_ATTENDANCE.length,
        averageAttendance: Math.round(
          MOCK_ATTENDANCE.reduce((sum, c) => sum + c.percentage, 0) / MOCK_ATTENDANCE.length
        ),
        atRisk: MOCK_ATTENDANCE.filter((c) => c.percentage < 75).length,
        geomarkUrl: GEOMARK_URL,
      };
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
