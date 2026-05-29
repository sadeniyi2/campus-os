"use client";

import { useState, useEffect, useCallback } from "react";
import { BookOpen, Users, FileText, Search, Plus, X, UserPlus, Trash2, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Course = {
  id: string;
  code: string;
  title: string;
  units: number;
  level: number;
  semester: number;
  department: { name: string; code: string };
  _count: { enrollments: number; assignments: number };
};

type Enrollment = {
  id: string;
  student: {
    id: string;
    studentId: string;
    user: { id: string; name: string; email: string; avatarUrl: string | null };
  };
};

type StudentResult = {
  id: string;
  studentId: string;
  user: { id: string; name: string; email: string };
  department: { name: string; code: string };
};

const CURRENT_SESSION = "2024/2025";
const CURRENT_SEMESTER = 1;

export default function LecturerCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [enrollmentsLoading, setEnrollmentsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<StudentResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [enrolling, setEnrolling] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/courses")
      .then((r) => r.json())
      .then((j) => setCourses(j.data ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const openCourse = async (course: Course) => {
    setSelectedCourse(course);
    setEnrollmentsLoading(true);
    setSearchQuery("");
    setSearchResults([]);
    try {
      const res = await fetch(`/api/courses/${course.id}/students`);
      const j = await res.json();
      setEnrollments(j.data ?? []);
    } finally {
      setEnrollmentsLoading(false);
    }
  };

  const searchStudents = useCallback(async (q: string) => {
    if (!q.trim()) { setSearchResults([]); return; }
    setSearching(true);
    try {
      const res = await fetch(`/api/students?search=${encodeURIComponent(q)}`);
      const j = await res.json();
      setSearchResults(j.data ?? []);
    } finally {
      setSearching(false);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => searchStudents(searchQuery), 400);
    return () => clearTimeout(t);
  }, [searchQuery, searchStudents]);

  const enrollStudent = async (studentId: string) => {
    if (!selectedCourse) return;
    setEnrolling(studentId);
    try {
      const res = await fetch(`/api/courses/${selectedCourse.id}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentIds: [studentId], semester: CURRENT_SEMESTER, session: CURRENT_SESSION }),
      });
      if (res.ok) {
        const r2 = await fetch(`/api/courses/${selectedCourse.id}/students`);
        const j = await r2.json();
        setEnrollments(j.data ?? []);
        setCourses((prev) =>
          prev.map((c) =>
            c.id === selectedCourse.id
              ? { ...c, _count: { ...c._count, enrollments: (j.data ?? []).length } }
              : c
          )
        );
      }
    } finally {
      setEnrolling(null);
    }
  };

  const removeStudent = async (enrollmentId: string) => {
    if (!selectedCourse) return;
    await fetch(`/api/courses/${selectedCourse.id}/students`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enrollmentId }),
    });
    setEnrollments((prev) => prev.filter((e) => e.id !== enrollmentId));
    setCourses((prev) =>
      prev.map((c) =>
        c.id === selectedCourse.id
          ? { ...c, _count: { ...c._count, enrollments: c._count.enrollments - 1 } }
          : c
      )
    );
  };

  const enrolledIds = new Set(enrollments.map((e) => e.student.id));

  if (selectedCourse) {
    return (
      <div className="space-y-6 animate-fade-in max-w-3xl">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => setSelectedCourse(null)}>
            ← Back
          </Button>
          <div>
            <h1 className="text-xl font-bold">{selectedCourse.code} — {selectedCourse.title}</h1>
            <p className="text-xs text-muted-foreground">{selectedCourse.department.name} · Level {selectedCourse.level} · Semester {selectedCourse.semester}</p>
          </div>
        </div>

        {/* Enroll Students */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <UserPlus className="size-4" /> Add Students
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {searching && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground py-2">
                <Loader2 className="size-3 animate-spin" /> Searching...
              </div>
            )}
            {searchResults.length > 0 && (
              <div className="border border-border rounded-lg overflow-hidden divide-y divide-border max-h-64 overflow-y-auto">
                {searchResults.map((s) => {
                  const alreadyEnrolled = enrolledIds.has(s.id);
                  return (
                    <div key={s.id} className="flex items-center gap-3 p-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{s.user.name}</p>
                        <p className="text-xs text-muted-foreground">{s.user.email} · {s.studentId}</p>
                      </div>
                      {alreadyEnrolled ? (
                        <Badge variant="secondary" className="text-xs shrink-0">Enrolled</Badge>
                      ) : (
                        <Button
                          size="sm"
                          className="shrink-0 text-xs"
                          disabled={enrolling === s.id}
                          onClick={() => enrollStudent(s.id)}
                        >
                          {enrolling === s.id ? <Loader2 className="size-3 animate-spin" /> : "Add"}
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            {searchQuery && !searching && searchResults.length === 0 && (
              <p className="text-xs text-muted-foreground py-2 text-center">No students found</p>
            )}
          </CardContent>
        </Card>

        {/* Enrolled Students */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Users className="size-4" /> Enrolled Students
              </CardTitle>
              <Badge variant="secondary">{enrollments.length}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {enrollmentsLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="size-5 animate-spin text-muted-foreground" />
              </div>
            ) : enrollments.length === 0 ? (
              <div className="text-center py-8">
                <Users className="size-8 text-muted-foreground opacity-30 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No students enrolled yet</p>
                <p className="text-xs text-muted-foreground mt-1">Search above to add students</p>
              </div>
            ) : (
              <div className="space-y-2">
                {enrollments.map((e) => (
                  <div key={e.id} className="flex items-center gap-3 p-2.5 rounded-lg border border-border">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{e.student.user.name}</p>
                      <p className="text-xs text-muted-foreground">{e.student.user.email} · {e.student.studentId}</p>
                    </div>
                    <button
                      onClick={() => removeStudent(e.id)}
                      className="text-muted-foreground hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">My Courses</h1>
        {!loading && <Badge variant="secondary">{courses.length} Active</Badge>}
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center border border-border rounded-xl">
          <BookOpen className="size-10 text-muted-foreground opacity-30 mb-3" />
          <p className="text-sm font-medium text-muted-foreground">No courses assigned yet</p>
          <p className="text-xs text-muted-foreground mt-1">Ask your administrator to assign courses to your profile</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((c) => (
            <Card key={c.id} className="card-hover">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs">{c.code}</Badge>
                  <Badge variant="secondary" className="text-xs">{c.level}L</Badge>
                </div>
                <CardTitle className="text-sm">{c.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Users className="size-3" />{c._count.enrollments} students</span>
                  <span className="flex items-center gap-1"><FileText className="size-3" />{c._count.assignments} tasks</span>
                </div>
                <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => openCourse(c)}>
                  Manage Students
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
