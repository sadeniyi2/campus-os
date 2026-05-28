import { BarChart2, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SUBMISSIONS = [
  { student: "Adebayo Okonkwo", id: "CSC/2021/001", assignment: "Binary Tree Implementation", course: "CSC 301", submitted: "2 hours ago", status: "pending" },
  { student: "Fatima Abdullahi", id: "CSC/2021/002", assignment: "Binary Tree Implementation", course: "CSC 301", submitted: "5 hours ago", status: "pending" },
  { student: "Chidi Eze", id: "CSC/2021/003", assignment: "SRS Document", course: "CSC 309", submitted: "1 day ago", status: "graded", score: 28 },
];

export default function LecturerGradingPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Grading</h1>
        <p className="text-sm text-muted-foreground mt-1">{SUBMISSIONS.filter((s) => s.status === "pending").length} submissions awaiting grade</p>
      </div>
      <div className="space-y-3">
        {SUBMISSIONS.map((s, i) => (
          <Card key={i} className="card-hover">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-sm">{s.student}</p>
                  <p className="text-xs text-muted-foreground">{s.id} · {s.assignment}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.course} · Submitted {s.submitted}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {s.status === "graded" ? (
                    <Badge variant="success" className="gap-1"><Star className="size-3" />{s.score}/30</Badge>
                  ) : (
                    <Button variant="default" size="sm" className="text-xs gap-1">
                      <BarChart2 className="size-3.5" /> Grade
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
