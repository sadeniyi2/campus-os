"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Bell, Check, CheckCheck, AlertCircle, Info, BookOpen, Award } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
import { useUIStore } from "@/store/useUIStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Notification } from "@/types";

function getNotificationIcon(type: string) {
  switch (type) {
    case "URGENT": return <AlertCircle className="size-4 text-red-500" />;
    case "ACADEMIC": return <BookOpen className="size-4 text-blue-500" />;
    case "CLEARANCE": return <Award className="size-4 text-emerald-500" />;
    default: return <Info className="size-4 text-primary" />;
  }
}

function NotificationItem({ notification }: { notification: Notification }) {
  const { markRead } = useNotificationStore();

  return (
    <div
      className={cn(
        "flex gap-3 p-4 border-b border-border last:border-0 transition-colors cursor-pointer",
        !notification.isRead ? "bg-primary/5" : "hover:bg-accent/50"
      )}
      onClick={() => markRead(notification.id)}
    >
      <div className="shrink-0 mt-0.5">
        {getNotificationIcon(notification.type)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={cn("text-sm leading-snug", !notification.isRead && "font-medium")}>
            {notification.title}
          </p>
          {!notification.isRead && (
            <div className="size-2 rounded-full bg-primary shrink-0 mt-1" />
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
        <p className="text-xs text-muted-foreground mt-1">{formatRelativeTime(notification.createdAt)}</p>
      </div>
    </div>
  );
}

export function NotificationPanel() {
  const { notificationPanelOpen, setNotificationPanelOpen } = useUIStore();
  const { notifications, unreadCount, markAllRead } = useNotificationStore();

  return (
    <AnimatePresence>
      {notificationPanelOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setNotificationPanelOpen(false)}
            className="fixed inset-0 z-40"
          />
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", bounce: 0.1, duration: 0.35 }}
            className="fixed right-0 top-0 h-full w-80 sm:w-96 bg-background border-l border-border shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Bell className="size-4" />
                <h2 className="font-semibold text-sm">Notifications</h2>
                {unreadCount > 0 && (
                  <span className="inline-flex items-center justify-center size-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllRead} className="text-xs gap-1">
                    <CheckCheck className="size-3" />
                    Mark all read
                  </Button>
                )}
                <Button variant="ghost" size="icon" onClick={() => setNotificationPanelOpen(false)}>
                  <X className="size-4" />
                </Button>
              </div>
            </div>

            {/* Notifications list */}
            <ScrollArea className="flex-1">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-center px-4">
                  <Bell className="size-8 text-muted-foreground mb-3 opacity-50" />
                  <p className="text-sm font-medium">All caught up!</p>
                  <p className="text-xs text-muted-foreground mt-1">No notifications yet</p>
                </div>
              ) : (
                notifications.map((n) => <NotificationItem key={n.id} notification={n} />)
              )}
            </ScrollArea>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-border">
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  <Check className="size-3 mr-1" />
                  View all notifications
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
