"use client";

import { FileText, Clock, CheckCircle, AlertCircle, Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, formatRelativeTime, cn } from "@/lib/utils";

const ASSIGNMENTS = [
  { id: "1", title: "Data Structures Lab Report", course: "CSC 301", dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), submitted: false, maxScore: 20 },
  { id: "2", title: "Network Topology Design Project", course: "CSC 307", dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), submitted: false, maxScore: 30 },
  { id: "3", title: "Technical Report Draft", course: "ENG 301", dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), submitted: true, score: 17, maxScore: 20 },
  { id: "4", title: "OS Process Scheduling Analysis", course: "CSC 305", dueDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), submitted: true, score: 24, maxScore: 30 },
  { id: "5", title: "Software Requirements Specification", course: "CSC 309", dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), submitted: false, maxScore: 25 },
];

export default function StudentAssignmentsPage() {
  const pending = ASSIGNMENTS.filter((a) => !a.submitted);
  const submitted = ASSIGNMENTS.filter((a) => a.submitted);

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Assignments</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {pending.length} pending · {submitted.length} submitted
        </p>
      </div>

      {pending.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Pending</h2>
          {pending.map((a) => {
            const isOverdue = new Date(a.dueDate) < new Date();
            return (
              <Card key={a.id} className={cn("card-hover", isOverdue && "border-red-200 dark:border-red-900")}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={cn("flex items-center justify-center size-9 rounded-xl shrink-0", isOverdue ? "bg-red-100 dark:bg-red-950" : "bg-amber-100 dark:bg-amber-950")}>
                        {isOverdue ? <AlertCircle className="size-4 text-red-500" /> : <FileText className="size-4 text-amber-600" />}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{a.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{a.course} · {a.maxScore} marks</p>
                        <div className="flex items-center gap-1 mt-1.5 text-xs">
                          <Clock className="size-3" />
                          <span className={isOverdue ? "text-red-500" : "text-muted-foreground"}>
                            {isOverdue ? "Overdue" : "Due"} {formatRelativeTime(a.dueDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs shrink-0">
                      <Upload className="size-3.5" />
                      Submit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {submitted.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Submitted</h2>
          {submitted.map((a) => (
            <Card key={a.id} className="card-hover opacity-80">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center size-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 shrink-0">
                      <CheckCircle className="size-4 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{a.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{a.course} · {a.maxScore} marks</p>
                      <p className="text-xs text-muted-foreground mt-1">Submitted {formatRelativeTime(a.dueDate)}</p>
                    </div>
                  </div>
                  {a.score !== undefined && (
                    <Badge variant="success" className="shrink-0">
                      {a.score}/{a.maxScore}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
