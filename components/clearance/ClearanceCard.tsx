"use client";

import { CheckCircle, XCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getClearanceStatusColor } from "@/lib/utils";
import type { ClearanceStatus } from "@/types";

interface ClearanceCardProps {
  module: string;
  moduleIcon: string;
  studentName: string;
  studentId: string;
  status: ClearanceStatus;
  notes?: string;
  isAdmin?: boolean;
  onApprove?: () => void;
  onReject?: () => void;
}

export function ClearanceCard({
  module, moduleIcon, studentName, studentId, status, notes, isAdmin, onApprove, onReject,
}: ClearanceCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="text-2xl">{moduleIcon}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold text-sm">{module}</p>
              <Badge className={getClearanceStatusColor(status)} variant="outline">
                {status === "APPROVED" && <CheckCircle className="size-3 mr-1" />}
                {status === "REJECTED" && <XCircle className="size-3 mr-1" />}
                {status === "PENDING" && <Clock className="size-3 mr-1" />}
                {status.charAt(0) + status.slice(1).toLowerCase()}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{studentName} • {studentId}</p>
            {notes && <p className="text-xs text-amber-600 mt-1">{notes}</p>}
            {isAdmin && status === "PENDING" && (
              <div className="flex gap-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs gap-1 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                  onClick={onApprove}
                >
                  <CheckCircle className="size-3" /> Approve
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs gap-1 text-red-600 border-red-200 hover:bg-red-50"
                  onClick={onReject}
                >
                  <XCircle className="size-3" /> Reject
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
