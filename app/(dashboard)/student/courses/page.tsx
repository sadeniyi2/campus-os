"use client";

import { useEffect, useState } from "react";
import { BookOpen, Users, Clock, GraduationCap, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Course = {
  id: string;
  code: string;
  title: string;
  units: number;
  level: number;
  semester: number;
  department: { name: string; code: string };
  lecturer?: { user: { name: string } } | null;
  _count: { enrollments: number };
};

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/courses")
      .then((r) => r.json())
      .then((j) => setCourses(j.data ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalUnits = courses.reduce((s, c) => s + c.units, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Courses</h1>
          <p className="text-sm text-muted-foreground mt-1">2024/2025 Session</p>
        </div>
        {!loading && courses.length > 0 && (
          <Badge variant="secondary" className="text-sm">{totalUnits} Total Units</Badge>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center border border-border rounded-xl">
          <BookOpen className="size-10 text-muted-foreground opacity-30 mb-3" />
          <p className="text-sm font-medium text-muted-foreground">No courses yet</p>
          <p className="text-xs text-muted-foreground mt-1">Your lecturer or course rep will enroll you in courses</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <Card key={course.id} className="card-hover">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Badge variant="outline" className="text-xs mb-2">{course.code}</Badge>
                    <CardTitle className="text-sm leading-tight">{course.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-2">
                {course.lecturer?.user.name && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <GraduationCap className="size-3.5" />
                    <span className="truncate">{course.lecturer.user.name}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="size-3.5" />
                  <span>{course.units} Credit Units</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Users className="size-3.5" />
                  <span>{course.level} Level · Semester {course.semester}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
