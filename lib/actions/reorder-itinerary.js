"use server";
import { auth } from "@/auth";
import { prisma } from "../prisma";

export async function reorderItinerary(tripId, newOrder) {

    const session = await auth();
    if (!session || !session.user?.id) {
        throw new Error("Not authenticated.");
    }

    await prisma.$transaction(
        newOrder.map((locationId, key) =>
            prisma.location.update({ 
                where: { id: locationId }, 
                data: { order: key } 
            })
        )
    )
}