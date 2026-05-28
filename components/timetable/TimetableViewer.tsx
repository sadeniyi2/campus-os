"use client";

import { useState } from "react";
import { Search, Pin, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TimetableCard } from "./TimetableCard";
import type { Timetable } from "@/types";

const MOCK_TIMETABLES: (Omit<Timetable, "department"> & { department: { name: string } })[] = [
  {
    id: "1",
    title: "CSC 300L First Semester Timetable",
    type: "CLASS",
    departmentId: "csc",
    semester: 1,
    session: "2024/2025",
    fileUrl: "https://example.com/timetable1.pdf",
    fileType: "application/pdf",
    isPinned: true,
    uploadedBy: "Course Rep",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    department: { name: "Computer Science" },
    versions: [{ id: "v1", timetableId: "1", version: 1, fileUrl: "", uploadedBy: "", createdAt: "" }],
  },
  {
    id: "2",
    title: "Mid-Semester Examination Timetable",
    type: "EXAM",
    departmentId: "csc",
    semester: 1,
    session: "2024/2025",
    fileUrl: "https://example.com/exam-timetable.png",
    fileType: "image/png",
    isPinned: true,
    uploadedBy: "Academic Office",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    department: { name: "Computer Science" },
  },
  {
    id: "3",
    title: "CSC 300L Second Semester Timetable",
    type: "CLASS",
    departmentId: "csc",
    semester: 2,
    session: "2023/2024",
    fileUrl: "https://example.com/timetable2.pdf",
    fileType: "application/pdf",
    isPinned: false,
    uploadedBy: "Course Rep",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    department: { name: "Computer Science" },
  },
];

export function TimetableViewer() {
  const [search, setSearch] = useState("");
  const [semesterFilter, setSemesterFilter] = useState<string>("ALL");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");

  const filtered = MOCK_TIMETABLES.filter((t) => {
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase());
    const matchSemester = semesterFilter === "ALL" || t.semester.toString() === semesterFilter;
    const matchType = typeFilter === "ALL" || t.type === typeFilter;
    return matchSearch && matchSemester && matchType;
  });

  const pinned = filtered.filter((t) => t.isPinned);
  const rest = filtered.filter((t) => !t.isPinned);

  return (
    <div className="space-y-4">
      {/* Filters */}
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

      {/* Pinned */}
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

      {/* Rest */}
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
          <p className="font-medium text-sm">No timetables found</p>
          <p className="text-xs text-muted-foreground mt-1">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}
