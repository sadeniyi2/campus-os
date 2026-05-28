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

export const MOCK_ATTENDANCE = [
  { courseCode: "CSC 301", courseName: "Data Structures & Algorithms", totalClasses: 24, attended: 22, percentage: 91.7 },
  { courseCode: "CSC 305", courseName: "Operating Systems", totalClasses: 20, attended: 17, percentage: 85.0 },
  { courseCode: "CSC 307", courseName: "Computer Networks", totalClasses: 22, attended: 15, percentage: 68.2 },
  { courseCode: "MTH 301", courseName: "Numerical Methods", totalClasses: 18, attended: 10, percentage: 55.6 },
  { courseCode: "ENG 301", courseName: "Technical Writing", totalClasses: 16, attended: 15, percentage: 93.8 },
  { courseCode: "CSC 309", courseName: "Software Engineering", totalClasses: 20, attended: 18, percentage: 90.0 },
];

export const MOCK_ANNOUNCEMENTS = [
  {
    id: "1",
    title: "Mid-Semester Examination Timetable Released",
    content: "The mid-semester examination timetable for the 2024/2025 academic session has been released. Students are advised to check the timetable carefully and report any clashes to their course representatives immediately.",
    category: "EXAMS" as const,
    isPinned: true,
    isUrgent: true,
    author: { name: "Academic Office", avatarUrl: null },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    _count: { reactions: 48, comments: 12 },
  },
  {
    id: "2",
    title: "Bursary Clearance Deadline Extended",
    content: "The deadline for bursary clearance has been extended to January 31st, 2025. All students with outstanding fees are advised to settle their accounts before this date to avoid being barred from examinations.",
    category: "BURSARY" as const,
    isPinned: false,
    isUrgent: true,
    author: { name: "Bursary Office", avatarUrl: null },
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    _count: { reactions: 32, comments: 8 },
  },
  {
    id: "3",
    title: "Department Seminar: AI in African Agriculture",
    content: "The Department of Computer Science invites all students and staff to attend the departmental seminar themed 'Artificial Intelligence Applications in African Agriculture'. The seminar holds on Friday, 5th February 2025 at 10:00 AM in the Faculty Auditorium.",
    category: "DEPARTMENT" as const,
    isPinned: false,
    isUrgent: false,
    author: { name: "Dept. of Computer Science", avatarUrl: null },
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    _count: { reactions: 15, comments: 4 },
  },
];

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
