"use server";
import { auth } from "@/auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";


async function geocodeAddress(address) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`,
    {
      headers: {
        'User-Agent': 'YourAppName/1.0 (your-email@example.com)', // Required by Nominatim
      },
    }
  );

  const data = await response.json();

  if (!data || data.length === 0) {
    console.error("Geocoding failed for address:", address, data);
    throw new Error("Unable to find location for this address. Please check spelling or try again.");
  }

  const { lat, lon } = data[0];
  return { lat: parseFloat(lat), lng: parseFloat(lon) };
}


export async function addLocation({ formData, tripId }) {
    const session = await auth();
    if (!session) {
        throw new Error("Not authonticated");
    }

    const address = formData.get("address")?.toString();
    if (!address) {
        throw new Error("missing address");
    }
    const { lat, lng } = await geocodeAddress(address)
    const count = await prisma.location.count({
        where: { tripId },
    })
    await prisma.location.create({
        data: {
            locationTitle: address,
            lat,
            lng,
            tripId,
            order: count,
        }
    })
    redirect(`/trips/${tripId}`);

}
