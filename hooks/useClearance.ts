"use client";

import { useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

async function fetchClearance() {
  const res = await fetch("/api/clearance");
  if (!res.ok) throw new Error("Failed to fetch clearance");
  return res.json();
}

async function initiateClearance() {
  const res = await fetch("/api/clearance", { method: "POST" });
  if (!res.ok) throw new Error("Failed to initiate clearance");
  return res.json();
}

async function updateApproval(data: {
  approvalId: string;
  status: "APPROVED" | "REJECTED";
  notes?: string;
}) {
  const res = await fetch("/api/clearance", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update approval");
  return res.json();
}

export function useClearance() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["clearance"],
    queryFn: fetchClearance,
    staleTime: 2 * 60_000,
  });

  const initiateMutation = useMutation({
    mutationFn: initiateClearance,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clearance"] }),
  });

  const approveMutation = useMutation({
    mutationFn: updateApproval,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clearance"] }),
  });

  return {
    clearanceRequest: query.data?.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    initiate: useCallback(() => initiateMutation.mutateAsync(), [initiateMutation]),
    isInitiating: initiateMutation.isPending,
    approve: useCallback(
      (approvalId: string, status: "APPROVED" | "REJECTED", notes?: string) =>
        approveMutation.mutateAsync({ approvalId, status, notes }),
      [approveMutation]
    ),
    isApproving: approveMutation.isPending,
  };
}
