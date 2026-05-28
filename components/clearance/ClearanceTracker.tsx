"use client";

import { CheckCircle, Clock, XCircle, Minus, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, getClearanceStatusColor, formatDate } from "@/lib/utils";
import { CLEARANCE_MODULES } from "@/lib/constants";
import type { ClearanceStatus } from "@/types";

interface ModuleStatus {
  key: string;
  status: ClearanceStatus;
  approver?: string;
  approvedAt?: string;
  notes?: string;
}

interface ClearanceTrackerProps {
  modules: ModuleStatus[];
  overallStatus: ClearanceStatus;
  onRequestClearance?: () => void;
}

function StatusIcon({ status }: { status: ClearanceStatus }) {
  switch (status) {
    case "APPROVED":
      return <CheckCircle className="size-5 text-emerald-500" />;
    case "REJECTED":
      return <XCircle className="size-5 text-red-500" />;
    case "PENDING":
      return <Clock className="size-5 text-amber-500" />;
    default:
      return <Minus className="size-4 text-muted-foreground" />;
  }
}

export function ClearanceTracker({ modules, overallStatus, onRequestClearance }: ClearanceTrackerProps) {
  const approvedCount = modules.filter((m) => m.status === "APPROVED").length;
  const progress = (approvedCount / CLEARANCE_MODULES.length) * 100;

  return (
    <div className="space-y-6">
      {/* Overall status banner */}
      <Card className={cn(
        "border-2",
        overallStatus === "APPROVED" ? "border-emerald-300 bg-emerald-50 dark:bg-emerald-950/20" :
        overallStatus === "REJECTED" ? "border-red-300 bg-red-50 dark:bg-red-950/20" :
        "border-amber-300 bg-amber-50 dark:bg-amber-950/20"
      )}>
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <StatusIcon status={overallStatus} />
              <div>
                <p className="font-semibold text-sm">
                  {overallStatus === "APPROVED" ? "Clearance Complete" :
                   overallStatus === "REJECTED" ? "Clearance Rejected" :
                   "Clearance In Progress"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {approvedCount} of {CLEARANCE_MODULES.length} modules cleared
                </p>
              </div>
            </div>
            {overallStatus === "APPROVED" && (
              <Button variant="gradient" size="sm" className="gap-1.5 text-xs">
                Download Certificate
              </Button>
            )}
            {overallStatus === "PENDING" && approvedCount === 0 && (
              <Button variant="default" size="sm" onClick={onRequestClearance}>
                Request Clearance
              </Button>
            )}
          </div>
          <div className="mt-4">
            <div className="h-2 w-full bg-white/50 dark:bg-black/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-emerald-500 rounded-full transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{progress.toFixed(0)}% complete</p>
          </div>
        </CardContent>
      </Card>

      {/* Steps */}
      <div className="space-y-3">
        {CLEARANCE_MODULES.map((module, index) => {
          const moduleStatus = modules.find((m) => m.key === module.key);
          const status = moduleStatus?.status ?? "PENDING";
          const isActive = index === modules.findIndex((m) => m.status === "PENDING");

          return (
            <Card
              key={module.key}
              className={cn(
                "transition-all duration-200",
                isActive && "ring-2 ring-primary/30"
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "flex items-center justify-center size-10 rounded-xl text-xl shrink-0",
                    status === "APPROVED" ? "bg-emerald-100 dark:bg-emerald-950" :
                    status === "REJECTED" ? "bg-red-100 dark:bg-red-950" :
                    "bg-muted"
                  )}>
                    {module.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-sm">{module.label}</p>
                      <Badge className={cn("text-xs shrink-0", getClearanceStatusColor(status))}>
                        {status === "NOT_REQUIRED" ? "N/A" : status.charAt(0) + status.slice(1).toLowerCase()}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{module.description}</p>
                    {moduleStatus?.approver && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {status === "APPROVED" ? "Approved by" : "Pending with"}: {moduleStatus.approver}
                        {moduleStatus.approvedAt && ` • ${formatDate(moduleStatus.approvedAt)}`}
                      </p>
                    )}
                    {moduleStatus?.notes && (
                      <p className="text-xs text-amber-600 mt-1">{moduleStatus.notes}</p>
                    )}
                  </div>
                  <ChevronRight className="size-4 text-muted-foreground shrink-0" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
