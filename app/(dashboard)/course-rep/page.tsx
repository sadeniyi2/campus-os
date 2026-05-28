"use client";

import { useState } from "react";
import { Calendar, Megaphone, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TimetableUpload } from "@/components/timetable/TimetableUpload";
import { AnnouncementEditor } from "@/components/announcements/AnnouncementEditor";

export default function CourseRepDashboard() {
  const [showTimetableUpload, setShowTimetableUpload] = useState(false);
  const [showAnnouncementEditor, setShowAnnouncementEditor] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Course Rep Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage timetables and class communications</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="card-hover cursor-pointer" onClick={() => setShowTimetableUpload(!showTimetableUpload)}>
          <CardContent className="p-5 flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-xl bg-violet-100 dark:bg-violet-950">
              <Calendar className="size-5 text-violet-600" />
            </div>
            <div>
              <p className="font-semibold text-sm">Upload Timetable</p>
              <p className="text-xs text-muted-foreground">PDF, PNG, DOCX</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover cursor-pointer" onClick={() => setShowAnnouncementEditor(!showAnnouncementEditor)}>
          <CardContent className="p-5 flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-xl bg-indigo-100 dark:bg-indigo-950">
              <Megaphone className="size-5 text-indigo-600" />
            </div>
            <div>
              <p className="font-semibold text-sm">Post Announcement</p>
              <p className="text-xs text-muted-foreground">Notify your class</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover cursor-pointer">
          <CardContent className="p-5 flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-xl bg-emerald-100 dark:bg-emerald-950">
              <Bell className="size-5 text-emerald-600" />
            </div>
            <div>
              <p className="font-semibold text-sm">Send Notification</p>
              <p className="text-xs text-muted-foreground">Broadcast to class</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {showTimetableUpload && (
        <div>
          <h2 className="font-semibold mb-3">Upload Class Timetable</h2>
          <TimetableUpload />
        </div>
      )}

      {showAnnouncementEditor && (
        <div>
          <h2 className="font-semibold mb-3">Post Announcement</h2>
          <AnnouncementEditor onCancel={() => setShowAnnouncementEditor(false)} />
        </div>
      )}
    </div>
  );
}
