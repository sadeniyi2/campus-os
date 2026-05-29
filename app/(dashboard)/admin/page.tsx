import { Users, Building2, Award, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/StatCard";
import { ClearanceApproval } from "@/components/clearance/ClearanceApproval";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BarChart2, Shield } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">System overview and management</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Users" value="0" icon={<Users className="size-5" />} />
        <StatCard label="Active Today" value="0" icon={<Activity className="size-5" />} />
        <StatCard label="Pending Clearances" value="0" icon={<Award className="size-5" />} />
        <StatCard label="Departments" value="0" icon={<Building2 className="size-5" />} />
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
          <div className="flex flex-col items-center justify-center py-10 text-center border border-border rounded-xl">
            <Activity className="size-8 text-muted-foreground opacity-30 mb-2" />
            <p className="text-sm font-medium text-muted-foreground">No activity yet</p>
            <p className="text-xs text-muted-foreground mt-1">System actions will appear here</p>
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
