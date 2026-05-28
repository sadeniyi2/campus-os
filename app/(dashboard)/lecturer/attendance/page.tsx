"use client";

import { MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GeoMarkRedirect } from "@/components/attendance/GeoMarkRedirect";
import { GEOMARK_URL } from "@/lib/constants";

export default function LecturerAttendancePage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Attendance Management</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage student attendance via GeoMark</p>
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center size-14 rounded-2xl bg-primary/10">
              <MapPin className="size-7 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="font-bold">GeoMark Attendance System</h2>
              <p className="text-sm text-muted-foreground mt-1">
                CampusOS integrates with GeoMark for GPS-verified attendance tracking. Open GeoMark to take attendance for your classes.
              </p>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <Button
              variant="gradient"
              className="gap-2"
              onClick={() => window.open(GEOMARK_URL, "_blank", "noopener,noreferrer")}
            >
              <MapPin className="size-4" />
              Take Attendance
              <ExternalLink className="size-3" />
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => window.open(GEOMARK_URL, "_blank", "noopener,noreferrer")}
            >
              View Records
              <ExternalLink className="size-3" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <GeoMarkRedirect variant="card" label="Mark Class Attendance" description="Take attendance for your current class session" />
        <GeoMarkRedirect variant="card" label="Attendance Reports" description="View and export full attendance records" />
      </div>
    </div>
  );
}
