import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { tripId, locationIds } = await req.json();

    if (!tripId || !Array.isArray(locationIds)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Ensure the trip belongs to the user
    const trip = await prisma.trip.findFirst({
      where: { id: tripId, userId: session.user.id },
      select: { id: true },
    });

    if (!trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    await prisma.$transaction(
      locationIds.map((locationId: string, index: number) =>
        prisma.location.update({
          where: { id: locationId },
          data: { order: index },
        })
      )
    );

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? "Server error" }, { status: 500 });
  }
}


