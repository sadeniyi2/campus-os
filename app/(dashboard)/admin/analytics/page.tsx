import { BarChart2, TrendingUp, Users, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/StatCard";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Platform usage and academic insights</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Students" value="1,138" change={8.4} changeLabel="this semester" icon={<Users className="size-5" />} />
        <StatCard label="Active Courses" value="87" icon={<BookOpen className="size-5" />} />
        <StatCard label="Avg. Attendance" value="72%" change={-3.2} changeLabel="this month" icon={<BarChart2 className="size-5" />} />
        <StatCard label="Clearance Rate" value="68%" change={12.1} changeLabel="this semester" icon={<TrendingUp className="size-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Enrollment by Department</CardTitle>
          </CardHeader>
          <CardContent>
            {[
              { dept: "Computer Science", count: 312, pct: 85 },
              { dept: "Electrical Engineering", count: 287, pct: 78 },
              { dept: "Business Admin", count: 423, pct: 100 },
              { dept: "Mathematics", count: 198, pct: 54 },
              { dept: "Mass Communication", count: 234, pct: 64 },
            ].map((d) => (
              <div key={d.dept} className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{d.dept}</span>
                  <span className="font-medium">{d.count}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${d.pct}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Platform Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "Daily Active Users", value: "384", change: "+12%", positive: true },
                { label: "Announcements Posted", value: "27", change: "+8%", positive: true },
                { label: "Timetables Uploaded", value: "14", change: "+3%", positive: true },
                { label: "AI Queries", value: "1,240", change: "+45%", positive: true },
                { label: "Clearance Requests", value: "48", change: "-5%", positive: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">{item.value}</p>
                    <span className={`text-xs font-medium ${item.positive ? "text-emerald-600" : "text-red-500"}`}>{item.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
