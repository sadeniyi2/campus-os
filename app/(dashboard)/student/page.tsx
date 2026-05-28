"use client";

import { Sparkles, BookOpen, FileText, Calendar, Bell, Award, CheckCircle, AlertTriangle, ExternalLink, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AttendanceSummary } from "@/components/attendance/AttendanceSummary";
import { StatCard } from "@/components/dashboard/StatCard";
import { GEOMARK_URL, MOCK_ANNOUNCEMENTS } from "@/lib/constants";
import { formatRelativeTime, getAttendanceColor, cn } from "@/lib/utils";
import Link from "next/link";

export default function StudentDashboard() {
  const cgpa = 4.12;
  const maxCgpa = 5.0;
  const cgpaPercentage = (cgpa / maxCgpa) * 100;

  const upcomingAssignments = [
    { id: "1", title: "Data Structures Lab Report", course: "CSC 301", dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), submitted: false },
    { id: "2", title: "Network Topology Design", course: "CSC 307", dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), submitted: false },
    { id: "3", title: "Technical Report Draft", course: "ENG 301", dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), submitted: true },
  ];

  const todaySchedule = [
    { course: "CSC 301", title: "Data Structures", time: "8:00 - 10:00 AM", venue: "LT 1", type: "Lecture" },
    { course: "MTH 301", title: "Numerical Methods", time: "12:00 - 2:00 PM", venue: "LT 3", type: "Lecture" },
    { course: "CSC 309", title: "Software Engineering", time: "3:00 - 5:00 PM", venue: "Lab 2", type: "Practical" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Good morning, Adebayo 👋</h1>
          <p className="text-muted-foreground text-sm mt-1">Here&apos;s what&apos;s happening with your academics today.</p>
        </div>
        <Button
          variant="gradient"
          size="sm"
          className="gap-2 shrink-0"
          onClick={() => window.open(GEOMARK_URL, "_blank", "noopener,noreferrer")}
        >
          <CheckCircle className="size-4" />
          Mark Attendance
          <ExternalLink className="size-3" />
        </Button>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="CGPA"
          value={cgpa.toFixed(2)}
          change={2.4}
          changeLabel="this semester"
          icon={<TrendingUp className="size-5" />}
        />
        <StatCard
          label="Courses"
          value="6"
          icon={<BookOpen className="size-5" />}
        />
        <StatCard
          label="Pending Tasks"
          value="2"
          icon={<FileText className="size-5" />}
        />
        <StatCard
          label="Overall Attendance"
          value="82%"
          change={-3.1}
          changeLabel="vs last month"
          icon={<CheckCircle className="size-5" />}
        />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* CGPA Tracker */}
          <Card className="card-hover">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">CGPA Tracker</CardTitle>
                <Badge variant="success">300 Level</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="relative size-24 shrink-0">
                  <svg className="size-24 -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
                    <circle
                      cx="50" cy="50" r="40" fill="none" strokeWidth="8"
                      stroke="url(#cgpaGrad)"
                      strokeLinecap="round"
                      strokeDasharray={`${cgpaPercentage * 2.51} 251`}
                    />
                    <defs>
                      <linearGradient id="cgpaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold">{cgpa}</span>
                    <span className="text-xs text-muted-foreground">/ 5.0</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "100 Level", gpa: 4.35 },
                      { label: "200 Level", gpa: 4.08 },
                      { label: "Current", gpa: 4.12 },
                      { label: "Target", gpa: 4.50 },
                    ].map((item) => (
                      <div key={item.label} className="bg-muted/50 rounded-lg p-2.5">
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="text-sm font-bold mt-0.5">{item.gpa}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card className="card-hover">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Calendar className="size-4" /> Today&apos;s Schedule
                </CardTitle>
                <Link href="/student/timetable">
                  <Button variant="ghost" size="sm" className="text-xs">View all</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {todaySchedule.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="flex flex-col items-center justify-center size-10 rounded-lg bg-primary/10 shrink-0">
                    <Clock className="size-3.5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.time} • {item.venue}</p>
                  </div>
                  <Badge variant="outline" className="text-xs shrink-0">{item.type}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Assignments */}
          <Card className="card-hover">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <FileText className="size-4" /> Assignments
                </CardTitle>
                <Link href="/student/assignments">
                  <Button variant="ghost" size="sm" className="text-xs">View all</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingAssignments.map((a) => (
                <div key={a.id} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                  <div className={cn("size-2 rounded-full shrink-0", a.submitted ? "bg-emerald-500" : "bg-amber-500")} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.course} • Due {formatRelativeTime(a.dueDate)}</p>
                  </div>
                  <Badge variant={a.submitted ? "success" : "warning"} className="shrink-0 text-xs">
                    {a.submitted ? "Submitted" : "Pending"}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Attendance */}
          <AttendanceSummary />

          {/* Clearance Status */}
          <Card className="card-hover">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Award className="size-4" /> Clearance Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { module: "Bursary", status: "APPROVED" },
                { module: "Library", status: "APPROVED" },
                { module: "Medical", status: "PENDING" },
                { module: "Hostel", status: "PENDING" },
                { module: "Department", status: "NOT_REQUIRED" },
              ].map((item) => (
                <div key={item.module} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{item.module}</span>
                  <Badge
                    className="text-xs"
                    variant={item.status === "APPROVED" ? "success" : item.status === "PENDING" ? "warning" : "secondary"}
                  >
                    {item.status === "APPROVED" ? "✓ " : item.status === "PENDING" ? "⏳ " : "— "}
                    {item.status === "NOT_REQUIRED" ? "N/A" : item.status.charAt(0) + item.status.slice(1).toLowerCase()}
                  </Badge>
                </div>
              ))}
              <Link href="/student/clearance">
                <Button variant="outline" size="sm" className="w-full mt-2 text-xs">
                  View Full Clearance
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* AI Assistant CTA */}
          <Card className="card-hover border-primary/20 bg-gradient-to-br from-primary/5 to-indigo-500/5">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10">
                  <Sparkles className="size-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">AI Study Assistant</p>
                  <p className="text-xs text-muted-foreground">Powered by GPT-4o</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Get instant help with your courses, generate quizzes, flashcards and study plans.
              </p>
              <Link href="/student/ai-assistant">
                <Button variant="gradient" size="sm" className="w-full gap-2">
                  <Sparkles className="size-3.5" />
                  Start Studying
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Exam Eligibility */}
          <Card className="card-hover">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <AlertTriangle className="size-4" /> Exam Eligibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { course: "CSC 301", eligible: true },
                { course: "CSC 307", eligible: false, reason: "Attendance < 75%" },
                { course: "MTH 301", eligible: false, reason: "Attendance < 75%" },
                { course: "CSC 309", eligible: true },
              ].map((item) => (
                <div key={item.course} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-medium">{item.course}</span>
                  <div className="flex items-center gap-1.5">
                    {item.eligible ? (
                      <Badge variant="success" className="text-xs">Eligible</Badge>
                    ) : (
                      <Badge variant="destructive" className="text-xs">Ineligible</Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Announcements */}
          <Card className="card-hover">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Bell className="size-4" /> Announcements
                </CardTitle>
                <Link href="/student/announcements">
                  <Button variant="ghost" size="sm" className="text-xs">View all</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {MOCK_ANNOUNCEMENTS.slice(0, 2).map((a) => (
                <div key={a.id} className="border-b border-border last:border-0 pb-3 last:pb-0">
                  <div className="flex items-start gap-2 mb-1">
                    {a.isUrgent && <Badge variant="destructive" className="text-xs shrink-0">Urgent</Badge>}
                    <p className="text-xs font-medium line-clamp-2">{a.title}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{formatRelativeTime(a.createdAt)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
