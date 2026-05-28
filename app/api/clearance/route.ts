import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { hasPermission } from "@/lib/auth/rbac";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const dbUser = await prisma.user.findUnique({ where: { email: user.email! } });
    if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const clearanceRequest = await prisma.clearanceRequest.findFirst({
      where: { userId: dbUser.id },
      include: {
        approvals: {
          include: { approver: { select: { id: true, name: true } } },
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: clearanceRequest });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch clearance status" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { semester, session } = body;

    const dbUser = await prisma.user.findUnique({ where: { email: user.email! } });
    if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const existing = await prisma.clearanceRequest.findUnique({
      where: { userId_semester_session: { userId: dbUser.id, semester, session } },
    });

    if (existing) {
      return NextResponse.json({ error: "Clearance request already exists for this semester" }, { status: 409 });
    }

    const MODULES = ["BURSARY", "LIBRARY", "MEDICAL", "HOSTEL", "DEPARTMENT"];
    const clearanceRequest = await prisma.clearanceRequest.create({
      data: {
        userId: dbUser.id,
        semester,
        session,
        approvals: {
          create: MODULES.map((module) => ({
            approverId: dbUser.id,
            module,
            status: "PENDING",
          })),
        },
      },
      include: { approvals: true },
    });

    return NextResponse.json({ data: clearanceRequest }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create clearance request" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { approvalId, status, notes } = body;

    const dbUser = await prisma.user.findUnique({ where: { email: user.email! } });
    if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    if (!hasPermission(dbUser.role, "clearance", "approve")) {
      return NextResponse.json({ error: "Forbidden: insufficient permissions" }, { status: 403 });
    }

    const approval = await prisma.clearanceApproval.update({
      where: { id: approvalId },
      data: {
        status,
        notes,
        approverId: dbUser.id,
        approvedAt: status === "APPROVED" ? new Date() : null,
      },
    });

    const allApprovals = await prisma.clearanceApproval.findMany({
      where: { clearanceRequestId: approval.clearanceRequestId },
    });

    const allApproved = allApprovals.every((a: { status: string }) => a.status === "APPROVED" || a.status === "NOT_REQUIRED");
    const anyRejected = allApprovals.some((a: { status: string }) => a.status === "REJECTED");

    await prisma.clearanceRequest.update({
      where: { id: approval.clearanceRequestId },
      data: {
        status: allApproved ? "APPROVED" : anyRejected ? "REJECTED" : "PENDING",
        completedAt: allApproved ? new Date() : null,
      },
    });

    return NextResponse.json({ data: approval });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update clearance" }, { status: 500 });
  }
}
