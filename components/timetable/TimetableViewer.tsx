"use client";

import { useState } from "react";
import { Search, Pin, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TimetableCard } from "./TimetableCard";
import type { Timetable } from "@/types";

type AugmentedTimetable = Omit<Timetable, "department"> & {
  department: { name: string };
};

export function TimetableViewer() {
  const [search, setSearch] = useState("");
  const [semesterFilter, setSemesterFilter] = useState<string>("ALL");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");

  const timetables: AugmentedTimetable[] = [];

  const filtered = timetables.filter((t) => {
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase());
    const matchSemester = semesterFilter === "ALL" || t.semester.toString() === semesterFilter;
    const matchType = typeFilter === "ALL" || t.type === typeFilter;
    return matchSearch && matchSemester && matchType;
  });

  const pinned = filtered.filter((t) => t.isPinned);
  const rest = filtered.filter((t) => !t.isPinned);

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search timetables..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        startIcon={<Search className="size-4" />}
      />

      <div className="flex flex-wrap gap-2">
        {["ALL", "1", "2"].map((s) => (
          <button
            key={s}
            onClick={() => setSemesterFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${semesterFilter === s ? "bg-primary text-primary-foreground border-transparent" : "border-border hover:bg-accent"}`}
          >
            {s === "ALL" ? "All Semesters" : `Semester ${s}`}
          </button>
        ))}
        <div className="w-px bg-border" />
        {["ALL", "CLASS", "EXAM"].map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${typeFilter === t ? "bg-primary text-primary-foreground border-transparent" : "border-border hover:bg-accent"}`}
          >
            {t === "ALL" ? "All Types" : t.charAt(0) + t.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {pinned.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <Pin className="size-3.5 rotate-45" />
            Pinned
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {pinned.map((t) => <TimetableCard key={t.id} timetable={t} />)}
          </div>
        </div>
      )}

      {rest.length > 0 && (
        <div className="space-y-3">
          {pinned.length > 0 && (
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <Calendar className="size-3.5" />
              All Timetables
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {rest.map((t) => <TimetableCard key={t.id} timetable={t} />)}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Calendar className="size-10 text-muted-foreground opacity-30 mb-3" />
          <p className="font-medium text-sm">No timetables uploaded yet</p>
          <p className="text-xs text-muted-foreground mt-1">Timetables uploaded by course reps will appear here</p>
        </div>
      )}
    </div>
  );
}
