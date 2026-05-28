import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { type = "LIKE" } = body;

    const dbUser = await prisma.user.findUnique({ where: { email: user.email! } });
    if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const existing = await prisma.announcementReaction.findUnique({
      where: { announcementId_userId_type: { announcementId: id, userId: dbUser.id, type } },
    });

    if (existing) {
      await prisma.announcementReaction.delete({ where: { id: existing.id } });
      return NextResponse.json({ action: "removed" });
    } else {
      await prisma.announcementReaction.create({
        data: { announcementId: id, userId: dbUser.id, type },
      });
      return NextResponse.json({ action: "added" });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to toggle reaction" }, { status: 500 });
  }
}
