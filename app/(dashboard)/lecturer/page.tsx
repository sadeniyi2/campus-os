"use client";

import { BookOpen, Users, FileText, BarChart2, ExternalLink, Megaphone, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/dashboard/StatCard";
import { GEOMARK_URL } from "@/lib/constants";
import Link from "next/link";

const COURSES = [
  { code: "CSC 301", title: "Data Structures & Algorithms", enrolled: 87, level: 300, assignments: 3 },
  { code: "CSC 309", title: "Software Engineering", enrolled: 92, level: 300, assignments: 2 },
  { code: "CSC 401", title: "Artificial Intelligence", enrolled: 64, level: 400, assignments: 4 },
];

export default function LecturerDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Good morning, Dr. Okafor 👋</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your courses, assignments, and student performance.</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => window.open(GEOMARK_URL, "_blank", "noopener,noreferrer")}
          >
            Take Attendance <ExternalLink className="size-3" />
          </Button>
          <Link href="/lecturer/announcements">
            <Button variant="gradient" size="sm" className="gap-2">
              <Megaphone className="size-4" />
              Post Announcement
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="My Courses" value="3" icon={<BookOpen className="size-5" />} />
        <StatCard label="Total Students" value="243" change={5.2} changeLabel="vs last sem" icon={<Users className="size-5" />} />
        <StatCard label="Pending Grading" value="24" icon={<FileText className="size-5" />} />
        <StatCard label="Avg. Performance" value="68%" change={-2.1} changeLabel="this semester" icon={<BarChart2 className="size-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-sm">My Courses</h2>
            <Link href="/lecturer/courses">
              <Button variant="ghost" size="sm" className="text-xs">View all</Button>
            </Link>
          </div>
          {COURSES.map((course) => (
            <Card key={course.code} className="card-hover">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">{course.code}</Badge>
                      <Badge variant="secondary" className="text-xs">{course.level}L</Badge>
                    </div>
                    <p className="font-semibold text-sm">{course.title}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="size-3" />{course.enrolled} students</span>
                      <span className="flex items-center gap-1"><FileText className="size-3" />{course.assignments} assignments</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs shrink-0">Manage</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-sm">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Create Assignment", icon: Plus, href: "/lecturer/assignments", color: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300" },
              { label: "Upload Materials", icon: FileText, href: "/lecturer/materials", color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" },
              { label: "Grade Submissions", icon: BarChart2, href: "/lecturer/grading", color: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" },
              { label: "View Timetable", icon: BookOpen, href: "/lecturer/timetable", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.label} href={action.href}>
                  <Card className="card-hover cursor-pointer">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className={`flex items-center justify-center size-9 rounded-xl ${action.color}`}>
                        <Icon className="size-4" />
                      </div>
                      <p className="text-sm font-medium">{action.label}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <p className="text-sm font-semibold mb-1">GeoMark Attendance</p>
              <p className="text-xs text-muted-foreground mb-3">Take GPS-verified attendance for your classes</p>
              <Button
                variant="gradient"
                size="sm"
                className="w-full gap-2"
                onClick={() => window.open(GEOMARK_URL, "_blank", "noopener,noreferrer")}
              >
                Open GeoMark <ExternalLink className="size-3" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
