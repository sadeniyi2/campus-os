"use client";

import { Plus, FileText, Users, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatRelativeTime } from "@/lib/utils";

const ASSIGNMENTS = [
  { id: "1", title: "Binary Tree Implementation", course: "CSC 301", dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), submitted: 45, total: 87 },
  { id: "2", title: "SRS Document", course: "CSC 309", dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(), submitted: 30, total: 92 },
  { id: "3", title: "Neural Network Report", course: "CSC 401", dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), submitted: 64, total: 64 },
];

export default function LecturerAssignmentsPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Assignments</h1>
        <Button variant="gradient" size="sm" className="gap-2">
          <Plus className="size-4" /> Create Assignment
        </Button>
      </div>
      <div className="space-y-3">
        {ASSIGNMENTS.map((a) => (
          <Card key={a.id} className="card-hover">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center size-9 rounded-xl bg-primary/10 shrink-0">
                    <FileText className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{a.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{a.course}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="size-3" />{a.submitted}/{a.total} submitted</span>
                      <span className="flex items-center gap-1"><Clock className="size-3" />Due {formatRelativeTime(a.dueDate)}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-xs shrink-0">View</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
