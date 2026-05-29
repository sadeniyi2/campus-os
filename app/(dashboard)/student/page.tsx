"use client";

import { Sparkles, BookOpen, FileText, Calendar, Bell, Award, CheckCircle, ExternalLink, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AttendanceSummary } from "@/components/attendance/AttendanceSummary";
import { StatCard } from "@/components/dashboard/StatCard";
import { GEOMARK_URL } from "@/lib/constants";
import Link from "next/link";

export default function StudentDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Good morning 👋</h1>
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
        <StatCard label="CGPA" value="—" icon={<TrendingUp className="size-5" />} />
        <StatCard label="Courses" value="0" icon={<BookOpen className="size-5" />} />
        <StatCard label="Pending Tasks" value="0" icon={<FileText className="size-5" />} />
        <StatCard label="Overall Attendance" value="—" icon={<CheckCircle className="size-5" />} />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">

          {/* Today's Schedule */}
          <Card>
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
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Clock className="size-8 text-muted-foreground opacity-30 mb-2" />
                <p className="text-sm font-medium text-muted-foreground">No classes today</p>
                <p className="text-xs text-muted-foreground mt-1">Your timetable will appear here once uploaded</p>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Assignments */}
          <Card>
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
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <FileText className="size-8 text-muted-foreground opacity-30 mb-2" />
                <p className="text-sm font-medium text-muted-foreground">No assignments yet</p>
                <p className="text-xs text-muted-foreground mt-1">Assignments from your lecturers will appear here</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Attendance */}
          <AttendanceSummary />

          {/* Clearance Status */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Award className="size-4" /> Clearance Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <Award className="size-8 text-muted-foreground opacity-30 mb-2" />
                <p className="text-sm font-medium text-muted-foreground">No clearance data</p>
                <p className="text-xs text-muted-foreground mt-1">Your clearance status will show here</p>
              </div>
              <Link href="/student/clearance">
                <Button variant="outline" size="sm" className="w-full mt-2 text-xs">
                  View Clearance
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* AI Assistant CTA */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-indigo-500/5">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10">
                  <Sparkles className="size-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">AI Study Assistant</p>
                  <p className="text-xs text-muted-foreground">Powered by Gemini</p>
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

          {/* Recent Announcements */}
          <Card>
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
            <CardContent>
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <Bell className="size-8 text-muted-foreground opacity-30 mb-2" />
                <p className="text-sm font-medium text-muted-foreground">No announcements yet</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
