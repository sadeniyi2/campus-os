"use client";

import { useState } from "react";
import { Search, CheckCheck, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClearanceCard } from "./ClearanceCard";
import { CLEARANCE_MODULES } from "@/lib/constants";
import type { ClearanceStatus } from "@/types";

const MOCK_REQUESTS = [
  { id: "1", studentName: "Adebayo Okonkwo", studentId: "CSC/2021/001", module: "BURSARY", status: "PENDING" as ClearanceStatus },
  { id: "2", studentName: "Fatima Abdullahi", studentId: "CSC/2021/002", module: "LIBRARY", status: "PENDING" as ClearanceStatus },
  { id: "3", studentName: "Chidi Eze", studentId: "CSC/2021/003", module: "BURSARY", status: "APPROVED" as ClearanceStatus },
  { id: "4", studentName: "Amina Yusuf", studentId: "CSC/2021/004", module: "MEDICAL", status: "PENDING" as ClearanceStatus },
];

export function ClearanceApproval() {
  const [search, setSearch] = useState("");
  const [filterModule, setFilterModule] = useState("ALL");

  const filtered = MOCK_REQUESTS.filter((r) => {
    const matchSearch =
      !search ||
      r.studentName.toLowerCase().includes(search.toLowerCase()) ||
      r.studentId.toLowerCase().includes(search.toLowerCase());
    const matchModule = filterModule === "ALL" || r.module === filterModule;
    return matchSearch && matchModule;
  });

  const pendingCount = MOCK_REQUESTS.filter((r) => r.status === "PENDING").length;

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
              onApprove={() => console.log("Approve", req.id)}
              onReject={() => console.log("Reject", req.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
