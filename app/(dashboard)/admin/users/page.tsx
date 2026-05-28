"use client";

import { useState } from "react";
import { Search, Filter, UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials, formatDate } from "@/lib/utils";
import { ROLE_LABELS } from "@/lib/constants";
import type { Role } from "@/types";

const MOCK_USERS = [
  { id: "1", name: "Adebayo Okonkwo", email: "adebayo@unilag.edu.ng", role: "STUDENT" as Role, createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString() },
  { id: "2", name: "Dr. Akin Okafor", email: "aokafor@unilag.edu.ng", role: "LECTURER" as Role, createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString() },
  { id: "3", name: "Fatima Rep", email: "frep@unilag.edu.ng", role: "COURSE_REP" as Role, createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString() },
  { id: "4", name: "Admin User", email: "admin@unilag.edu.ng", role: "ADMIN" as Role, createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString() },
  { id: "5", name: "Chidi Eze", email: "chidi@unilag.edu.ng", role: "STUDENT" as Role, createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString() },
  { id: "6", name: "Amina Yusuf", email: "amina@unilag.edu.ng", role: "STUDENT" as Role, createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() },
];

const ROLE_COLORS: Record<Role, string> = {
  STUDENT: "info",
  LECTURER: "success",
  COURSE_REP: "default",
  ADMIN: "warning",
  SUPER_ADMIN: "destructive",
} as Record<Role, "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info">;

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = MOCK_USERS.filter((u) => {
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="text-sm text-muted-foreground mt-1">{filtered.length} users found</p>
        </div>
        <Button variant="gradient" size="sm" className="gap-2">
          <UserPlus className="size-4" /> Invite User
        </Button>
      </div>

      <div className="flex gap-3 flex-wrap">
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          startIcon={<Search className="size-4" />}
          className="max-w-xs"
        />
        <div className="flex gap-2 flex-wrap">
          {["ALL", "STUDENT", "LECTURER", "COURSE_REP", "ADMIN"].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${roleFilter === r ? "bg-primary text-primary-foreground border-transparent" : "border-border hover:bg-accent"}`}
            >
              {r === "ALL" ? "All Roles" : ROLE_LABELS[r]}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <div className="divide-y divide-border">
          {filtered.map((user) => (
            <div key={user.id} className="flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <Avatar className="size-8">
                  <AvatarFallback className="text-xs">{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={ROLE_COLORS[user.role] as "default"} className="text-xs hidden sm:flex">
                  {ROLE_LABELS[user.role]}
                </Badge>
                <span className="text-xs text-muted-foreground hidden md:block">{formatDate(user.createdAt)}</span>
                <Button variant="ghost" size="sm" className="text-xs">Edit</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
