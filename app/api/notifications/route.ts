import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "20");

  try {
    const dbUser = await prisma.user.findUnique({ where: { email: user.email! } });
    if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const [notifications, total, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where: { userId: dbUser.id },
        orderBy: [{ isUrgent: "desc" }, { createdAt: "desc" }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.notification.count({ where: { userId: dbUser.id } }),
      prisma.notification.count({ where: { userId: dbUser.id, isRead: false } }),
    ]);

    return NextResponse.json({ data: notifications, total, unreadCount, page, limit });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { ids, markAll } = body;

    const dbUser = await prisma.user.findUnique({ where: { email: user.email! } });
    if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    if (markAll) {
      await prisma.notification.updateMany({
        where: { userId: dbUser.id, isRead: false },
        data: { isRead: true },
      });
    } else if (ids?.length) {
      await prisma.notification.updateMany({
        where: { id: { in: ids }, userId: dbUser.id },
        data: { isRead: true },
      });
    }

    return NextResponse.json({ message: "Notifications marked as read" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update notifications" }, { status: 500 });
  }
}
