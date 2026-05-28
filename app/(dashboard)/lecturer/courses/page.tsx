import { BookOpen, Users, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const COURSES = [
  { code: "CSC 301", title: "Data Structures & Algorithms", enrolled: 87, level: 300, semester: 1, pending: 12 },
  { code: "CSC 309", title: "Software Engineering", enrolled: 92, level: 300, semester: 1, pending: 8 },
  { code: "CSC 401", title: "Artificial Intelligence", enrolled: 64, level: 400, semester: 1, pending: 18 },
];

export default function LecturerCoursesPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">My Courses</h1>
        <Badge variant="secondary">{COURSES.length} Active</Badge>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {COURSES.map((c) => (
          <Card key={c.code} className="card-hover">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-xs">{c.code}</Badge>
                <Badge variant="secondary" className="text-xs">{c.level}L</Badge>
              </div>
              <CardTitle className="text-sm">{c.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Users className="size-3" />{c.enrolled} enrolled</span>
                <span className="flex items-center gap-1"><FileText className="size-3" />{c.pending} to grade</span>
              </div>
              <Button variant="outline" size="sm" className="w-full text-xs">Manage Course</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
