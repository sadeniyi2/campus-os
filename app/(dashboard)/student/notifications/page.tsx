"use client";

import { Bell, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNotificationStore } from "@/store/useNotificationStore";
import { formatRelativeTime, cn } from "@/lib/utils";

export default function NotificationsPage() {
  const { notifications, markAllRead, markRead, unreadCount } = useNotificationStore();

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

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Bell className="size-10 text-muted-foreground opacity-30 mb-3" />
          <p className="font-medium text-sm">No notifications yet</p>
          <p className="text-xs text-muted-foreground mt-1">You'll be notified about announcements, assignments, and clearance updates</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((n) => (
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
      )}
    </div>
  );
}
