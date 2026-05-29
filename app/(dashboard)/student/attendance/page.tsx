"use client";

import { MapPin, ExternalLink, RefreshCw, CheckSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GeoMarkRedirect } from "@/components/attendance/GeoMarkRedirect";
import { GEOMARK_URL } from "@/lib/constants";

export default function AttendancePage() {
  return (
    <div className="space-y-6 animate-fade-in">
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

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Overall Average</p><p className="text-2xl font-bold mt-1">—</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Eligible Courses</p><p className="text-2xl font-bold mt-1">—</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Classes Attended</p><p className="text-2xl font-bold mt-1">0</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Total Classes</p><p className="text-2xl font-bold mt-1">0</p></CardContent></Card>
      </div>

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
              <Button variant="outline" size="sm" className="gap-2 text-xs" onClick={() => window.open(GEOMARK_URL, "_blank", "noopener,noreferrer")}>
                View Full Report <ExternalLink className="size-3" />
              </Button>
              <Button variant="default" size="sm" className="gap-2 text-xs" onClick={() => window.open(GEOMARK_URL, "_blank", "noopener,noreferrer")}>
                Mark Attendance <ExternalLink className="size-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Course Attendance Breakdown</CardTitle>
          <CardDescription>75% minimum attendance required for exam eligibility</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <CheckSquare className="size-10 text-muted-foreground opacity-30 mb-3" />
            <p className="font-medium text-sm">No attendance records yet</p>
            <p className="text-xs text-muted-foreground mt-1">Records will sync here once you mark attendance on GeoMark</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <GeoMarkRedirect variant="card" label="Mark Today's Attendance" description="Use GPS to mark attendance for your current class" />
        <GeoMarkRedirect variant="card" label="View Attendance Portal" description="Full attendance records and history on GeoMark" />
      </div>
    </div>
  );
}
