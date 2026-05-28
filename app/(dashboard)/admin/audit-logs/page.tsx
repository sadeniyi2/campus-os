"use client";

import { useState } from "react";
import { Shield, Search, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDate, getInitials } from "@/lib/utils";

const AUDIT_LOGS = [
  { id: "1", user: "Admin User", action: "APPROVE_CLEARANCE", resource: "clearance_approvals", resourceId: "ca_123", ipAddress: "197.211.1.1", createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString() },
  { id: "2", user: "Dr. Okafor", action: "CREATE_ANNOUNCEMENT", resource: "announcements", resourceId: "ann_456", ipAddress: "105.112.45.22", createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString() },
  { id: "3", user: "Course Rep A", action: "UPLOAD_TIMETABLE", resource: "timetables", resourceId: "tt_789", ipAddress: "197.211.2.3", createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString() },
  { id: "4", user: "Admin User", action: "UPDATE_USER", resource: "users", resourceId: "usr_321", ipAddress: "197.211.1.1", createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
  { id: "5", user: "System", action: "USER_LOGIN", resource: "sessions", resourceId: "sess_654", ipAddress: "105.112.67.89", createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() },
];

const ACTION_COLORS: Record<string, string> = {
  APPROVE_CLEARANCE: "success",
  REJECT_CLEARANCE: "destructive",
  CREATE_ANNOUNCEMENT: "info",
  UPLOAD_TIMETABLE: "default",
  UPDATE_USER: "warning",
  USER_LOGIN: "secondary",
};

export default function AdminAuditLogsPage() {
  const [search, setSearch] = useState("");

  const filtered = AUDIT_LOGS.filter(
    (l) => !search || l.user.toLowerCase().includes(search.toLowerCase()) || l.action.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Audit Logs</h1>
          <p className="text-sm text-muted-foreground mt-1">System activity and security log</p>
        </div>
        <Shield className="size-5 text-muted-foreground" />
      </div>

      <Input
        placeholder="Search logs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        startIcon={<Search className="size-4" />}
        className="max-w-xs"
      />

      <Card>
        <div className="divide-y divide-border">
          {filtered.map((log) => (
            <div key={log.id} className="flex items-center gap-4 px-4 py-3 hover:bg-muted/30 transition-colors">
              <Avatar className="size-8 shrink-0">
                <AvatarFallback className="text-xs">{getInitials(log.user)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-medium">{log.user}</p>
                  <Badge variant={(ACTION_COLORS[log.action] ?? "secondary") as "default"} className="text-xs">
                    {log.action}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{log.resource} · {log.ipAddress}</p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0 hidden sm:block">{formatDate(log.createdAt)}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
