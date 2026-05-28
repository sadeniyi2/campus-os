import { ClearanceTracker } from "@/components/clearance/ClearanceTracker";
import type { ClearanceStatus } from "@/types";

export default function StudentClearancePage() {
  const modules = [
    { key: "BURSARY", status: "APPROVED" as ClearanceStatus, approver: "Bursary Officer", approvedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
    { key: "LIBRARY", status: "APPROVED" as ClearanceStatus, approver: "Library Staff", approvedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
    { key: "MEDICAL", status: "PENDING" as ClearanceStatus, approver: "Medical Centre" },
    { key: "HOSTEL", status: "PENDING" as ClearanceStatus, approver: "Hostel Warden" },
    { key: "DEPARTMENT", status: "NOT_REQUIRED" as ClearanceStatus },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Clearance Status</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track your semester clearance across all departments
        </p>
      </div>
      <ClearanceTracker modules={modules} overallStatus="PENDING" />
    </div>
  );
}
