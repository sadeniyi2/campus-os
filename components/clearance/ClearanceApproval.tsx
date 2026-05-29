"use client";

import { useState } from "react";
import { Search, CheckCheck, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClearanceCard } from "./ClearanceCard";
import { CLEARANCE_MODULES } from "@/lib/constants";
import type { ClearanceStatus } from "@/types";

type ClearanceRequest = {
  id: string;
  studentName: string;
  studentId: string;
  module: string;
  status: ClearanceStatus;
};

export function ClearanceApproval() {
  const [search, setSearch] = useState("");
  const [filterModule, setFilterModule] = useState("ALL");

  const requests: ClearanceRequest[] = [];

  const filtered = requests.filter((r) => {
    const matchSearch =
      !search ||
      r.studentName.toLowerCase().includes(search.toLowerCase()) ||
      r.studentId.toLowerCase().includes(search.toLowerCase());
    const matchModule = filterModule === "ALL" || r.module === filterModule;
    return matchSearch && matchModule;
  });

  const pendingCount = requests.filter((r) => r.status === "PENDING").length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="warning">{pendingCount} pending</Badge>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 text-xs">
          <CheckCheck className="size-3.5" />
          Bulk Approve
        </Button>
      </div>

      <Input
        placeholder="Search students..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        startIcon={<Search className="size-4" />}
      />

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterModule("ALL")}
          className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${filterModule === "ALL" ? "bg-primary text-primary-foreground border-transparent" : "border-border hover:bg-accent"}`}
        >
          All Modules
        </button>
        {CLEARANCE_MODULES.map((m) => (
          <button
            key={m.key}
            onClick={() => setFilterModule(m.key)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${filterModule === m.key ? "bg-primary text-primary-foreground border-transparent" : "border-border hover:bg-accent"}`}
          >
            {m.icon} {m.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Award className="size-8 text-muted-foreground opacity-30 mb-2" />
          <p className="text-sm font-medium text-muted-foreground">No clearance requests</p>
          <p className="text-xs text-muted-foreground mt-1">Student requests will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((req) => {
            const moduleInfo = CLEARANCE_MODULES.find((m) => m.key === req.module);
            return (
              <ClearanceCard
                key={req.id}
                module={moduleInfo?.label ?? req.module}
                moduleIcon={moduleInfo?.icon ?? "📋"}
                studentName={req.studentName}
                studentId={req.studentId}
                status={req.status}
                isAdmin={true}
                onApprove={() => {}}
                onReject={() => {}}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
