import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { GEOMARK_URL } from "@/lib/constants";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email! },
      include: { student: true },
    });

    if (!dbUser?.student) {
      return NextResponse.json({ error: "Student record not found" }, { status: 404 });
    }

    await prisma.attendanceSyncCache.create({
      data: {
        studentId: dbUser.student.id,
        rawData: {
          syncedAt: new Date().toISOString(),
          source: "geomark",
          geomarkUrl: GEOMARK_URL,
          status: "pending_api_integration",
          message: "Full sync available via GeoMark portal",
        },
        source: "geomark",
      },
    });

    return NextResponse.json({
      data: {
        synced: false,
        message: "GeoMark integration requires API key. Visit GeoMark portal for full attendance records.",
        geomarkUrl: GEOMARK_URL,
        lastSyncAttempt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }
}
