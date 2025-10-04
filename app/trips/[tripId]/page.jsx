import { prisma } from "@/lib/prisma";
import {auth} from "@/auth"
import TripDetailClient from '@/components/trip-detail'

export default async function TripDetails({params}) {
    const {tripId} = await params;
    const session = await auth();
    if(!session) {
        return(
            <div>please sign in.</div>
        )
    }
    const trip = await prisma.trip.findFirst({
        where: {id: tripId}
    })

    if(!trip) {
        return <div>Trip not found</div>
    }
    return <TripDetailClient trip={trip}/>
}