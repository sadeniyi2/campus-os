import { TimetableViewer } from "@/components/timetable/TimetableViewer";

export default function LecturerTimetablePage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Timetable</h1>
        <p className="text-sm text-muted-foreground mt-1">View your teaching schedule</p>
      </div>
      <TimetableViewer />
    </div>
  );
}
