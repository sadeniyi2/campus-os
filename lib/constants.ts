export const GEOMARK_URL = "https://attendance-cloud-app.vercel.app/";

export const APP_NAME = "CampusOS";
export const APP_TAGLINE = "The Operating System for African Universities";
export const APP_DESCRIPTION =
  "CampusOS unifies academics, attendance, timetables, clearance, and AI learning into one beautiful platform built for African universities.";

export const ANNOUNCEMENT_CATEGORIES = [
  { value: "ACADEMIC", label: "Academic", color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" },
  { value: "EXAMS", label: "Exams", color: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300" },
  { value: "URGENT", label: "Urgent", color: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300" },
  { value: "DEPARTMENT", label: "Department", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300" },
  { value: "FACULTY", label: "Faculty", color: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300" },
  { value: "HOSTEL", label: "Hostel", color: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300" },
  { value: "BURSARY", label: "Bursary", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" },
  { value: "EVENTS", label: "Events", color: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300" },
] as const;

export const CLEARANCE_MODULES = [
  { key: "BURSARY", label: "Bursary", icon: "💰", description: "Fee payment clearance" },
  { key: "LIBRARY", label: "Library", icon: "📚", description: "Library dues clearance" },
  { key: "MEDICAL", label: "Medical", icon: "🏥", description: "Medical centre clearance" },
  { key: "HOSTEL", label: "Hostel", icon: "🏠", description: "Hostel accommodation clearance" },
  { key: "DEPARTMENT", label: "Department", icon: "🎓", description: "Departmental academic clearance" },
] as const;

export const ROLE_LABELS: Record<string, string> = {
  STUDENT: "Student",
  LECTURER: "Lecturer",
  COURSE_REP: "Course Representative",
  ADMIN: "Administrator",
  SUPER_ADMIN: "Super Administrator",
};

export const NAV_ITEMS_STUDENT = [
  { label: "Dashboard", href: "/student", icon: "LayoutDashboard" },
  { label: "My Courses", href: "/student/courses", icon: "BookOpen" },
  { label: "Attendance", href: "/student/attendance", icon: "CheckSquare" },
  { label: "Assignments", href: "/student/assignments", icon: "FileText" },
  { label: "Timetable", href: "/student/timetable", icon: "Calendar" },
  { label: "Announcements", href: "/student/announcements", icon: "Bell" },
  { label: "Clearance", href: "/student/clearance", icon: "Award" },
  { label: "AI Assistant", href: "/student/ai-assistant", icon: "Sparkles" },
  { label: "Notifications", href: "/student/notifications", icon: "BellRing" },
];

export const NAV_ITEMS_LECTURER = [
  { label: "Dashboard", href: "/lecturer", icon: "LayoutDashboard" },
  { label: "My Courses", href: "/lecturer/courses", icon: "BookOpen" },
  { label: "Assignments", href: "/lecturer/assignments", icon: "FileText" },
  { label: "Grading", href: "/lecturer/grading", icon: "BarChart2" },
  { label: "Materials", href: "/lecturer/materials", icon: "FolderOpen" },
  { label: "Announcements", href: "/lecturer/announcements", icon: "Megaphone" },
  { label: "Timetable", href: "/lecturer/timetable", icon: "Calendar" },
  { label: "Attendance", href: "/lecturer/attendance", icon: "CheckSquare" },
];

export const NAV_ITEMS_COURSE_REP = [
  { label: "Dashboard", href: "/course-rep", icon: "LayoutDashboard" },
  { label: "Timetables", href: "/course-rep/timetable", icon: "Calendar" },
  { label: "Announcements", href: "/course-rep/announcements", icon: "Megaphone" },
];

export const NAV_ITEMS_ADMIN = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { label: "Users", href: "/admin/users", icon: "Users" },
  { label: "Departments", href: "/admin/departments", icon: "Building2" },
  { label: "Clearance", href: "/admin/clearance", icon: "Award" },
  { label: "Analytics", href: "/admin/analytics", icon: "BarChart2" },
  { label: "Audit Logs", href: "/admin/audit-logs", icon: "Shield" },
];
