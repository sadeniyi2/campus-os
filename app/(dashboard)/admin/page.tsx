import { Users, Building2, Award, Shield, BarChart2, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { ClearanceApproval } from "@/components/clearance/ClearanceApproval";
import Link from "next/link";

const RECENT_ACTIVITY = [
  { action: "User registered", user: "Amina Yusuf", role: "Student", time: "2 min ago" },
  { action: "Clearance approved", user: "Admin Smith", role: "Admin", time: "15 min ago" },
  { action: "Timetable uploaded", user: "Course Rep A", role: "Course Rep", time: "1 hour ago" },
  { action: "Announcement posted", user: "Dr. Okafor", role: "Lecturer", time: "2 hours ago" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">System overview and management</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Users" value="1,247" change={12.5} changeLabel="this month" icon={<Users className="size-5" />} />
        <StatCard label="Active Today" value="384" icon={<Activity className="size-5" />} />
        <StatCard label="Pending Clearances" value="48" icon={<Award className="size-5" />} />
        <StatCard label="Departments" value="18" icon={<Building2 className="size-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Clearance Approvals</h2>
            <Link href="/admin/clearance">
              <Button variant="ghost" size="sm" className="text-xs">View all</Button>
            </Link>
          </div>
          <ClearanceApproval />
        </div>

        <div className="space-y-4">
          <h2 className="font-semibold">Recent Activity</h2>
          <div className="space-y-3">
            {RECENT_ACTIVITY.map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-border">
                <div className="flex items-center justify-center size-8 rounded-full bg-primary/10 shrink-0">
                  <Activity className="size-3.5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium">{a.action}</p>
                  <p className="text-xs text-muted-foreground">{a.user} · <Badge variant="secondary" className="text-xs">{a.role}</Badge></p>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {[
              { label: "Manage Users", icon: Users, href: "/admin/users" },
              { label: "Departments", icon: Building2, href: "/admin/departments" },
              { label: "Analytics", icon: BarChart2, href: "/admin/analytics" },
              { label: "Audit Logs", icon: Shield, href: "/admin/audit-logs" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-accent transition-colors cursor-pointer">
                    <Icon className="size-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
