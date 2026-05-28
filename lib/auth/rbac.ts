import type { Role } from "@/types";

type Resource =
  | "announcements"
  | "timetables"
  | "clearance"
  | "users"
  | "courses"
  | "assignments"
  | "submissions"
  | "departments"
  | "audit_logs"
  | "analytics";

type Action = "create" | "read" | "update" | "delete" | "approve";

type PermissionMatrix = Record<Role, Partial<Record<Resource, Action[]>>>;

const PERMISSIONS: PermissionMatrix = {
  STUDENT: {
    announcements: ["read"],
    timetables: ["read"],
    clearance: ["read", "create"],
    courses: ["read"],
    assignments: ["read", "create"],
    submissions: ["read", "create"],
  },
  COURSE_REP: {
    announcements: ["read", "create", "update", "delete"],
    timetables: ["read", "create", "update", "delete"],
    clearance: ["read", "create"],
    courses: ["read"],
    assignments: ["read"],
    submissions: ["read", "create"],
  },
  LECTURER: {
    announcements: ["read", "create", "update", "delete"],
    timetables: ["read", "create", "update", "delete"],
    clearance: ["read"],
    courses: ["read", "create", "update"],
    assignments: ["read", "create", "update", "delete"],
    submissions: ["read", "update"],
  },
  ADMIN: {
    announcements: ["read", "create", "update", "delete"],
    timetables: ["read", "create", "update", "delete"],
    clearance: ["read", "create", "update", "approve"],
    users: ["read", "update"],
    courses: ["read", "create", "update", "delete"],
    assignments: ["read", "create", "update", "delete"],
    submissions: ["read", "update"],
    departments: ["read", "create", "update"],
    audit_logs: ["read"],
    analytics: ["read"],
  },
  SUPER_ADMIN: {
    announcements: ["read", "create", "update", "delete"],
    timetables: ["read", "create", "update", "delete"],
    clearance: ["read", "create", "update", "delete", "approve"],
    users: ["read", "create", "update", "delete"],
    courses: ["read", "create", "update", "delete"],
    assignments: ["read", "create", "update", "delete"],
    submissions: ["read", "update", "delete"],
    departments: ["read", "create", "update", "delete"],
    audit_logs: ["read", "delete"],
    analytics: ["read"],
  },
};

export function hasPermission(role: Role, resource: Resource, action: Action): boolean {
  const rolePermissions = PERMISSIONS[role];
  if (!rolePermissions) return false;
  const resourcePermissions = rolePermissions[resource];
  if (!resourcePermissions) return false;
  return resourcePermissions.includes(action);
}

export function getDashboardPath(role: Role): string {
  switch (role) {
    case "STUDENT":
      return "/student";
    case "COURSE_REP":
      return "/course-rep";
    case "LECTURER":
      return "/lecturer";
    case "ADMIN":
    case "SUPER_ADMIN":
      return "/admin";
    default:
      return "/student";
  }
}

export const ROUTE_ROLE_MAP: Record<string, Role[]> = {
  "/student": ["STUDENT", "COURSE_REP"],
  "/lecturer": ["LECTURER"],
  "/course-rep": ["COURSE_REP"],
  "/admin": ["ADMIN", "SUPER_ADMIN"],
};

export function canAccessRoute(pathname: string, role: Role): boolean {
  for (const [route, roles] of Object.entries(ROUTE_ROLE_MAP)) {
    if (pathname.startsWith(route)) {
      return roles.includes(role);
    }
  }
  return true;
}
