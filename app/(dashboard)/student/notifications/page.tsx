"use client";

import { Bell, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNotificationStore } from "@/store/useNotificationStore";
import { formatRelativeTime, cn } from "@/lib/utils";

export default function NotificationsPage() {
  const { notifications, markAllRead, markRead, unreadCount } = useNotificationStore();

  const mockNotifications = [
    { id: "1", title: "Mid-Semester Exam Timetable Released", message: "The mid-semester examination timetable has been published. Check the timetable section.", type: "ACADEMIC", isRead: false, isUrgent: true, createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
    { id: "2", title: "Assignment Due Tomorrow", message: "Your Data Structures Lab Report is due in 24 hours.", type: "ACADEMIC", isRead: false, isUrgent: false, createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() },
    { id: "3", title: "Bursary Clearance Approved", message: "Your bursary clearance has been approved. 4 modules remaining.", type: "CLEARANCE", isRead: true, isUrgent: false, createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
    { id: "4", title: "New Announcement", message: "Department seminar: AI in African Agriculture — Friday, 5th Feb.", type: "GENERAL", isRead: true, isUrgent: false, createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
  ];

  const displayed = notifications.length > 0 ? notifications : mockNotifications;

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead} className="gap-1.5">
            <CheckCheck className="size-3.5" />
            Mark all read
          </Button>
        )}
      </div>

      <div className="space-y-2">
        {displayed.map((n) => (
          <div
            key={n.id}
            className={cn(
              "flex gap-3 p-4 rounded-xl border transition-colors cursor-pointer",
              !n.isRead ? "bg-primary/5 border-primary/20" : "border-border hover:bg-muted/30"
            )}
            onClick={() => markRead(n.id)}
          >
            <div className="flex items-center justify-center size-9 rounded-lg bg-muted shrink-0">
              <Bell className="size-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className={cn("text-sm", !n.isRead && "font-semibold")}>{n.title}</p>
                <div className="flex items-center gap-1 shrink-0">
                  {n.isUrgent && <Badge variant="destructive" className="text-xs">Urgent</Badge>}
                  {!n.isRead && <div className="size-2 rounded-full bg-primary" />}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{formatRelativeTime(n.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
