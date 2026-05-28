"use client";

import { TimetableUpload } from "@/components/timetable/TimetableUpload";
import { TimetableViewer } from "@/components/timetable/TimetableViewer";

export default function CourseRepTimetablePage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Manage Timetables</h1>
        <p className="text-sm text-muted-foreground mt-1">Upload and manage class timetables for your department</p>
      </div>
      <TimetableUpload />
      <div>
        <h2 className="font-semibold mb-4">Existing Timetables</h2>
        <TimetableViewer />
      </div>
    </div>
  );
}
