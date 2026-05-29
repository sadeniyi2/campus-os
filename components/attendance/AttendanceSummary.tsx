"use client";

import { ExternalLink, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GEOMARK_URL } from "@/lib/constants";

export function AttendanceSummary() {
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
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <CheckSquare className="size-8 text-muted-foreground opacity-30 mb-2" />
          <p className="text-sm font-medium text-muted-foreground">No attendance data yet</p>
          <p className="text-xs text-muted-foreground mt-1">Attendance will appear here once synced from GeoMark</p>
        </div>
      </CardContent>
    </Card>
  );
}
