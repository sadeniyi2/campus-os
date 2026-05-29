"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, BookOpen, CheckSquare, FileText, Calendar,
  Bell, Award, Sparkles, BellRing, Megaphone, FolderOpen,
  BarChart2, Users, Building2, Shield, ChevronLeft, ChevronRight,
  GraduationCap, LogOut, Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/useUIStore";
import { useAuthStore } from "@/store/useAuthStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";
import {
  NAV_ITEMS_STUDENT, NAV_ITEMS_LECTURER,
  NAV_ITEMS_COURSE_REP, NAV_ITEMS_ADMIN,
} from "@/lib/constants";

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard, BookOpen, CheckSquare, FileText, Calendar,
  Bell, Award, Sparkles, BellRing, Megaphone, FolderOpen,
  BarChart2, Users, Building2, Shield,
};

function NavItem({
  item,
  collapsed,
}: {
  item: { label: string; href: string; icon: string };
  collapsed: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
  const Icon = ICON_MAP[item.icon] || LayoutDashboard;

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-150 group relative",
        isActive
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
    >
      {isActive && (
        <motion.div
          layoutId="activeNav"
          className="absolute inset-0 bg-primary/10 rounded-lg"
          transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
        />
      )}
      <Icon className={cn("shrink-0 z-10", collapsed ? "size-5" : "size-4")} />
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden whitespace-nowrap z-10"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
      {collapsed && (
        <div className="absolute left-full ml-3 px-2 py-1 bg-popover border text-popover-foreground text-xs rounded-md shadow-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          {item.label}
        </div>
      )}
    </Link>
  );
}

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const { user, role, signOut } = useAuthStore();

  const navItems =
    role === "STUDENT" ? NAV_ITEMS_STUDENT
    : role === "LECTURER" ? NAV_ITEMS_LECTURER
    : role === "COURSE_REP" ? NAV_ITEMS_COURSE_REP
    : role === "ADMIN" || role === "SUPER_ADMIN" ? NAV_ITEMS_ADMIN
    : NAV_ITEMS_STUDENT;

  const settingsHref =
    role === "LECTURER" ? "/lecturer/settings"
    : role === "COURSE_REP" ? "/course-rep/settings"
    : role === "ADMIN" || role === "SUPER_ADMIN" ? "/admin/settings"
    : "/student/settings";

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 68 : 240 }}
      transition={{ type: "spring", bounce: 0.1, duration: 0.35 }}
      className="relative flex flex-col h-full bg-card border-r border-border overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-14 border-b border-border shrink-0">
        <div className="flex items-center justify-center size-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 shrink-0">
          <GraduationCap className="size-4 text-white" />
        </div>
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <span className="font-bold text-sm tracking-tight gradient-text">CampusOS</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => (
          <NavItem key={item.href} item={item} collapsed={sidebarCollapsed} />
        ))}
      </nav>

      {/* User Profile */}
      <div className="px-2 pb-4 pt-2 border-t border-border space-y-1 shrink-0">
        <Link
          href={settingsHref}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        >
          <Settings className="size-4 shrink-0" />
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="overflow-hidden whitespace-nowrap"
              >
                Settings
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
          <Avatar className="size-7 shrink-0">
            <AvatarImage src={user?.avatarUrl ?? undefined} />
            <AvatarFallback className="text-xs">{getInitials(user?.name ?? "U")}</AvatarFallback>
          </Avatar>
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0 overflow-hidden"
              >
                <p className="text-xs font-medium truncate">{user?.name ?? "User"}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email ?? ""}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={signOut}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors w-full"
        >
          <LogOut className="size-4 shrink-0" />
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="overflow-hidden whitespace-nowrap"
              >
                Sign Out
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Collapse Toggle */}
      <Button
        variant="outline"
        size="icon"
        onClick={toggleSidebar}
        className="absolute -right-3 top-16 size-6 rounded-full border bg-background shadow-md z-10"
      >
        {sidebarCollapsed ? (
          <ChevronRight className="size-3" />
        ) : (
          <ChevronLeft className="size-3" />
        )}
      </Button>
    </motion.aside>
  );
}
