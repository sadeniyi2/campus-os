"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search, LayoutDashboard, BookOpen, CheckSquare, Calendar,
  Bell, Award, Sparkles, Megaphone, Users, Building2, X,
} from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";
import { GEOMARK_URL } from "@/lib/constants";

const ALL_ACTIONS = [
  { id: "dashboard-student", label: "Student Dashboard", icon: LayoutDashboard, href: "/student", category: "Navigation", roles: ["STUDENT", "COURSE_REP"] },
  { id: "courses", label: "My Courses", icon: BookOpen, href: "/student/courses", category: "Navigation", roles: ["STUDENT"] },
  { id: "attendance", label: "Attendance", icon: CheckSquare, href: "/student/attendance", category: "Navigation", roles: ["STUDENT"] },
  { id: "timetable-student", label: "Timetable", icon: Calendar, href: "/student/timetable", category: "Navigation", roles: ["STUDENT"] },
  { id: "announcements-student", label: "Announcements", icon: Bell, href: "/student/announcements", category: "Navigation", roles: ["STUDENT"] },
  { id: "clearance", label: "Clearance Status", icon: Award, href: "/student/clearance", category: "Navigation", roles: ["STUDENT"] },
  { id: "ai-assistant", label: "AI Study Assistant", icon: Sparkles, href: "/student/ai-assistant", category: "AI", roles: ["STUDENT"] },
  { id: "dashboard-lecturer", label: "Lecturer Dashboard", icon: LayoutDashboard, href: "/lecturer", category: "Navigation", roles: ["LECTURER"] },
  { id: "announcements-lecturer", label: "Post Announcement", icon: Megaphone, href: "/lecturer/announcements", category: "Navigation", roles: ["LECTURER"] },
  { id: "geomark", label: "Open GeoMark Attendance", icon: CheckSquare, href: GEOMARK_URL, category: "Attendance", external: true, roles: ["STUDENT", "LECTURER", "COURSE_REP", "ADMIN", "SUPER_ADMIN"] },
  { id: "users", label: "Manage Users", icon: Users, href: "/admin/users", category: "Admin", roles: ["ADMIN", "SUPER_ADMIN"] },
  { id: "departments", label: "Departments", icon: Building2, href: "/admin/departments", category: "Admin", roles: ["ADMIN", "SUPER_ADMIN"] },
];

export function CommandPalette() {
  const router = useRouter();
  const { commandPaletteOpen, setCommandPaletteOpen } = useUIStore();
  const { role } = useAuthStore();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredActions = ALL_ACTIONS.filter((action) => {
    const matchesRole = !role || action.roles?.includes(role);
    const matchesQuery =
      !query ||
      action.label.toLowerCase().includes(query.toLowerCase()) ||
      action.category.toLowerCase().includes(query.toLowerCase());
    return matchesRole && matchesQuery;
  });

  const handleSelect = useCallback(
    (action: (typeof ALL_ACTIONS)[0]) => {
      setCommandPaletteOpen(false);
      setQuery("");
      if (action.external) {
        window.open(action.href, "_blank", "noopener,noreferrer");
      } else {
        router.push(action.href);
      }
    },
    [router, setCommandPaletteOpen]
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
        return;
      }
      if (!commandPaletteOpen) return;
      if (e.key === "Escape") {
        setCommandPaletteOpen(false);
        setQuery("");
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filteredActions.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && filteredActions[selectedIndex]) {
        handleSelect(filteredActions[selectedIndex]);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [commandPaletteOpen, filteredActions, selectedIndex, handleSelect, setCommandPaletteOpen]);

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setCommandPaletteOpen(false); setQuery(""); }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed left-1/2 top-[20%] -translate-x-1/2 w-full max-w-xl z-50 px-4"
          >
            <div className="bg-background border border-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                <Search className="size-4 text-muted-foreground shrink-0" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search pages, actions..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <button
                  onClick={() => { setCommandPaletteOpen(false); setQuery(""); }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-72 overflow-y-auto p-2">
                {filteredActions.length === 0 ? (
                  <div className="py-8 text-center text-sm text-muted-foreground">
                    No results for &ldquo;{query}&rdquo;
                  </div>
                ) : (
                  filteredActions.map((action, i) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={action.id}
                        onClick={() => handleSelect(action)}
                        onMouseEnter={() => setSelectedIndex(i)}
                        className={cn(
                          "flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm text-left transition-colors",
                          i === selectedIndex
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-accent"
                        )}
                      >
                        <Icon className="size-4 shrink-0 text-muted-foreground" />
                        <div className="flex-1 min-w-0">
                          <span className="font-medium">{action.label}</span>
                        </div>
                        <span className="text-xs text-muted-foreground shrink-0">{action.category}</span>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center gap-4 px-4 py-2 border-t border-border text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><kbd className="border rounded px-1">↑↓</kbd> navigate</span>
                <span className="flex items-center gap-1"><kbd className="border rounded px-1">↵</kbd> select</span>
                <span className="flex items-center gap-1"><kbd className="border rounded px-1">esc</kbd> close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
