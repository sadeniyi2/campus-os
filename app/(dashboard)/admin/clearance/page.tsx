import { ClearanceApproval } from "@/components/clearance/ClearanceApproval";

export default function AdminClearancePage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Clearance Approvals</h1>
        <p className="text-sm text-muted-foreground mt-1">Review and approve student clearance requests</p>
      </div>
      <ClearanceApproval />
    </div>
  );
}
