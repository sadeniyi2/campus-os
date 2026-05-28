"use client";

import { Building2, Plus, Users, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const DEPARTMENTS = [
  { id: "1", name: "Computer Science", code: "CSC", faculty: "Science & Technology", students: 312, courses: 24 },
  { id: "2", name: "Electrical Engineering", code: "EEE", faculty: "Engineering", students: 287, courses: 22 },
  { id: "3", name: "Mathematics", code: "MTH", faculty: "Science", students: 198, courses: 18 },
  { id: "4", name: "Business Administration", code: "BUS", faculty: "Management Sciences", students: 423, courses: 20 },
  { id: "5", name: "Mass Communication", code: "MCM", faculty: "Arts", students: 234, courses: 16 },
];

export default function AdminDepartmentsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Departments</h1>
          <p className="text-sm text-muted-foreground mt-1">{DEPARTMENTS.length} departments across all faculties</p>
        </div>
        <Button variant="gradient" size="sm" className="gap-2">
          <Plus className="size-4" /> Add Department
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DEPARTMENTS.map((dept) => (
          <Card key={dept.id} className="card-hover">
            <CardContent className="p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10">
                  <Building2 className="size-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">{dept.name}</p>
                  <Badge variant="outline" className="text-xs mt-1">{dept.code}</Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{dept.faculty}</p>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Users className="size-3" />{dept.students} students</span>
                <span className="flex items-center gap-1"><BookOpen className="size-3" />{dept.courses} courses</span>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3 text-xs">Manage</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
