"use client";

import { useState } from "react";
import { Shield, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDate, getInitials } from "@/lib/utils";

type AuditLog = {
  id: string;
  user: string;
  action: string;
  resource: string;
  resourceId: string;
  ipAddress: string;
  createdAt: string;
};

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

  const logs: AuditLog[] = [];

  const filtered = logs.filter(
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
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Shield className="size-10 text-muted-foreground opacity-30 mb-3" />
            <p className="font-medium text-sm">No audit logs yet</p>
            <p className="text-xs text-muted-foreground mt-1">System activity will be recorded here</p>
          </div>
        ) : (
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
        )}
      </Card>
    </div>
  );
}
