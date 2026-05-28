import { BookOpen, Users, Clock, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const COURSES = [
  { code: "CSC 301", title: "Data Structures & Algorithms", lecturer: "Dr. A. Okafor", units: 3, semester: 1, level: 300 },
  { code: "CSC 305", title: "Operating Systems", lecturer: "Prof. B. Nwosu", units: 3, semester: 1, level: 300 },
  { code: "CSC 307", title: "Computer Networks", lecturer: "Dr. C. Adeleke", units: 2, semester: 1, level: 300 },
  { code: "MTH 301", title: "Numerical Methods", lecturer: "Dr. D. Ibrahim", units: 2, semester: 1, level: 300 },
  { code: "ENG 301", title: "Technical Writing", lecturer: "Mrs. E. Bello", units: 2, semester: 1, level: 300 },
  { code: "CSC 309", title: "Software Engineering", lecturer: "Dr. F. Chukwu", units: 3, semester: 1, level: 300 },
];

export default function StudentCoursesPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Courses</h1>
          <p className="text-sm text-muted-foreground mt-1">2024/2025 Session — Semester 1</p>
        </div>
        <Badge variant="secondary" className="text-sm">{COURSES.reduce((s, c) => s + c.units, 0)} Total Units</Badge>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {COURSES.map((course) => (
          <Card key={course.code} className="card-hover">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <Badge variant="outline" className="text-xs mb-2">{course.code}</Badge>
                  <CardTitle className="text-sm leading-tight">{course.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <GraduationCap className="size-3.5" />
                <span className="truncate">{course.lecturer}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="size-3.5" />
                <span>{course.units} Credit Units</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Users className="size-3.5" />
                <span>300 Level</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
