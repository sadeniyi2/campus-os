"use client";

import { MapPin, ExternalLink, RefreshCw, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GeoMarkRedirect } from "@/components/attendance/GeoMarkRedirect";
import { GEOMARK_URL, MOCK_ATTENDANCE } from "@/lib/constants";
import { cn, getAttendanceColor, getAttendanceBgColor } from "@/lib/utils";

export default function AttendancePage() {
  const overall = MOCK_ATTENDANCE.reduce((s, c) => s + c.percentage, 0) / MOCK_ATTENDANCE.length;
  const eligibleCount = MOCK_ATTENDANCE.filter((c) => c.percentage >= 75).length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Attendance</h1>
          <p className="text-sm text-muted-foreground mt-1">Track your class attendance via GeoMark</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => window.open(GEOMARK_URL, "_blank", "noopener,noreferrer")}
          >
            <RefreshCw className="size-3.5" />
            Sync GeoMark
          </Button>
          <Button
            variant="gradient"
            size="sm"
            className="gap-2"
            onClick={() => window.open(GEOMARK_URL, "_blank", "noopener,noreferrer")}
          >
            <MapPin className="size-4" />
            Mark Attendance
            <ExternalLink className="size-3" />
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Overall Average</p>
            <p className={cn("text-2xl font-bold mt-1", getAttendanceColor(overall))}>
              {overall.toFixed(1)}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Eligible Courses</p>
            <p className="text-2xl font-bold mt-1 text-emerald-600">{eligibleCount}/{MOCK_ATTENDANCE.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Classes Attended</p>
            <p className="text-2xl font-bold mt-1">
              {MOCK_ATTENDANCE.reduce((s, c) => s + c.attended, 0)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Classes</p>
            <p className="text-2xl font-bold mt-1">
              {MOCK_ATTENDANCE.reduce((s, c) => s + c.totalClasses, 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* GeoMark Integration Panel */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10 shrink-0">
                <MapPin className="size-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">Powered by GeoMark</p>
                <p className="text-xs text-muted-foreground">
                  Your attendance is tracked via GPS geolocation. Use GeoMark to mark and view full records.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 text-xs"
                onClick={() => window.open(GEOMARK_URL, "_blank", "noopener,noreferrer")}
              >
                View Full Report <ExternalLink className="size-3" />
              </Button>
              <Button
                variant="default"
                size="sm"
                className="gap-2 text-xs"
                onClick={() => window.open(GEOMARK_URL, "_blank", "noopener,noreferrer")}
              >
                Mark Attendance <ExternalLink className="size-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Per-course breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Course Attendance Breakdown</CardTitle>
          <CardDescription>
            75% minimum attendance required for exam eligibility
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {MOCK_ATTENDANCE.map((course) => (
            <div key={course.courseCode}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{course.courseCode}</span>
                    <Badge
                      variant={course.percentage >= 75 ? "success" : course.percentage >= 60 ? "warning" : "destructive"}
                      className="text-xs"
                    >
                      {course.percentage >= 75 ? "Eligible" : "At Risk"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{course.courseName}</p>
                </div>
                <div className="text-right">
                  <span className={cn("text-lg font-bold", getAttendanceColor(course.percentage))}>
                    {course.percentage.toFixed(1)}%
                  </span>
                  <p className="text-xs text-muted-foreground">{course.attended}/{course.totalClasses} classes</p>
                </div>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-700", getAttendanceBgColor(course.percentage))}
                  style={{ width: `${course.percentage}%` }}
                />
              </div>
              {course.percentage < 75 && (
                <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                  <Info className="size-3" />
                  Need {Math.ceil((0.75 * course.totalClasses - course.attended))} more classes to reach 75%
                </p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* GeoMark Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <GeoMarkRedirect variant="card" label="Mark Today's Attendance" description="Use GPS to mark attendance for your current class" />
        <GeoMarkRedirect variant="card" label="View Attendance Portal" description="Full attendance records and history on GeoMark" />
      </div>
    </div>
  );
}
