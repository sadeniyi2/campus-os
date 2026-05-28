"use client";

import { ExternalLink } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, getAttendanceColor, getAttendanceBgColor } from "@/lib/utils";
import { GEOMARK_URL, MOCK_ATTENDANCE } from "@/lib/constants";

export function AttendanceSummary() {
  const overall =
    MOCK_ATTENDANCE.reduce((sum, c) => sum + c.percentage, 0) / MOCK_ATTENDANCE.length;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Attendance</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs gap-1 text-primary"
            onClick={() => window.open(GEOMARK_URL, "_blank", "noopener,noreferrer")}
          >
            GeoMark <ExternalLink className="size-3" />
          </Button>
        </div>
        <div className="flex items-baseline gap-2">
          <span className={cn("text-2xl font-bold", getAttendanceColor(overall))}>
            {overall.toFixed(1)}%
          </span>
          <span className="text-xs text-muted-foreground">overall</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {MOCK_ATTENDANCE.slice(0, 4).map((course) => (
          <div key={course.courseCode} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground font-medium truncate max-w-[60%]">{course.courseCode}</span>
              <span className={cn("font-semibold", getAttendanceColor(course.percentage))}>
                {course.percentage.toFixed(0)}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all duration-500", getAttendanceBgColor(course.percentage))}
                style={{ width: `${course.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
