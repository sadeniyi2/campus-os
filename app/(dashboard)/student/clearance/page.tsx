import { Award } from "lucide-react";
import { ClearanceTracker } from "@/components/clearance/ClearanceTracker";

export default function StudentClearancePage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Clearance Status</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track your semester clearance across all departments
        </p>
      </div>
      <ClearanceTracker modules={[]} overallStatus="PENDING" />
    </div>
  );
}
