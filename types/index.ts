export type Role = "STUDENT" | "LECTURER" | "COURSE_REP" | "ADMIN" | "SUPER_ADMIN";
export type ClearanceStatus = "PENDING" | "APPROVED" | "REJECTED" | "NOT_REQUIRED";
export type AnnouncementCategory =
  | "ACADEMIC"
  | "EXAMS"
  | "URGENT"
  | "DEPARTMENT"
  | "FACULTY"
  | "HOSTEL"
  | "BURSARY"
  | "EVENTS";
export type TimetableType = "CLASS" | "EXAM";

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string | null;
  role: Role;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  lastLoginAt?: string | null;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Student {
  id: string;
  userId: string;
  studentId: string;
  departmentId: string;
  level: number;
  cgpa: number;
  semester: number;
  session: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
  department?: Department;
}

export interface Lecturer {
  id: string;
  userId: string;
  staffId: string;
  departmentId: string;
  title?: string | null;
  createdAt: string;
  updatedAt: string;
  user?: User;
  department?: Department;
}

export interface Faculty {
  id: string;
  name: string;
  code: string;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  departments?: Department[];
}

export interface Department {
  id: string;
  name: string;
  code: string;
  facultyId: string;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  faculty?: Faculty;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  description?: string | null;
  units: number;
  departmentId: string;
  lecturerId?: string | null;
  semester: number;
  level: number;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  department?: Department;
  lecturer?: Lecturer;
  _count?: { enrollments: number; assignments: number };
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  grade?: number | null;
  semester: number;
  session: string;
  createdAt: string;
  updatedAt: string;
  course?: Course;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  dueDate: string;
  maxScore: number;
  attachments: AttachmentFile[];
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  course?: Course;
  _count?: { submissions: number };
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  content?: string | null;
  attachments: AttachmentFile[];
  score?: number | null;
  feedback?: string | null;
  submittedAt: string;
  gradedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CourseMaterial {
  id: string;
  courseId: string;
  title: string;
  type: string;
  url: string;
  size?: number | null;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorId: string;
  lecturerId?: string | null;
  category: AnnouncementCategory;
  isPinned: boolean;
  isUrgent: boolean;
  isScheduled: boolean;
  scheduledAt?: string | null;
  attachments: AttachmentFile[];
  imageUrl?: string | null;
  targetRoles: Role[];
  departmentId?: string | null;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  author?: User;
  reactions?: AnnouncementReaction[];
  comments?: AnnouncementComment[];
  _count?: { reactions: number; comments: number };
}

export interface AnnouncementReaction {
  id: string;
  announcementId: string;
  userId: string;
  type: string;
  createdAt: string;
  user?: User;
}

export interface AnnouncementComment {
  id: string;
  announcementId: string;
  userId: string;
  content: string;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export interface Timetable {
  id: string;
  title: string;
  type: TimetableType;
  departmentId: string;
  courseId?: string | null;
  semester: number;
  session: string;
  fileUrl: string;
  fileType: string;
  isPinned: boolean;
  uploadedBy: string;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  department?: Department;
  versions?: TimetableVersion[];
}

export interface TimetableVersion {
  id: string;
  timetableId: string;
  version: number;
  fileUrl: string;
  uploadedBy: string;
  createdAt: string;
}

export interface ClearanceRequest {
  id: string;
  userId: string;
  semester: number;
  session: string;
  status: ClearanceStatus;
  qrCode?: string | null;
  certificateUrl?: string | null;
  submittedAt: string;
  completedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  user?: User;
  approvals?: ClearanceApproval[];
}

export interface ClearanceApproval {
  id: string;
  clearanceRequestId: string;
  approverId: string;
  module: string;
  status: ClearanceStatus;
  notes?: string | null;
  approvedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  approver?: User;
}

export interface AttendanceSummary {
  id: string;
  studentId: string;
  courseCode: string;
  totalClasses: number;
  attended: number;
  percentage: number;
  lastSyncedAt: string;
  semester: number;
  session: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  isUrgent: boolean;
  link?: string | null;
  metadata?: Record<string, unknown> | null;
  createdAt: string;
}

export interface AIChat {
  id: string;
  userId: string;
  courseId?: string | null;
  title?: string | null;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: string;
}

export interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string | null;
  metadata?: Record<string, unknown> | null;
  ipAddress?: string | null;
  createdAt: string;
  user?: User;
}

export interface AttachmentFile {
  name: string;
  url: string;
  size: number;
  type: string;
}

// UI Types
export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number | string;
  children?: NavItem[];
  roles?: Role[];
}

export interface CommandAction {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  href?: string;
  action?: () => void;
  category: string;
  keywords?: string[];
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant: "default" | "destructive" | "success";
  duration?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  known: boolean;
}

export interface StatCardData {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: string;
  color?: string;
}

export type ClearanceModule = "BURSARY" | "LIBRARY" | "MEDICAL" | "HOSTEL" | "DEPARTMENT";

export interface ClearanceModuleInfo {
  key: ClearanceModule;
  label: string;
  icon: string;
  description: string;
}
