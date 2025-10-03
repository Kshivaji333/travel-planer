
import React from 'react'
import { auth } from '@/auth';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card"

async function TripsPage() {
    const session = await auth();

    const trips = await prisma.trip.findMany({
        where: { userId: session?.user?.id },
    });
    const sortedTrips = [...trips].sort((a, b) => {
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    })
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const upcomingTrips = sortedTrips.filter(trip => new Date(trip.startDate) >= today);
    if (!session) {
        return (
            <div className='flex justify-center items-center text-gray-700 text-xl'>
                Please Sign In.
            </div>
        )
    }



    return (
        <div className="space-y-6 container mx-auto py-6 px-4">
            <div className="flex items-center justify-between ">
                <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
                <Link href={"/trips/new"}>
                    <Button> New Trips</Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle> Welcome back, {session.user?.name} </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                        {
                            trips.length === 0
                                ? "Start planning you first trip by clickeing the button above"
                                : `You have ${trips.length} ${trips.length === 1 ? "trip" : "trips"} planned.
                                ${upcomingTrips.length > 0 
                                    ? `${upcomingTrips.length} upcomming.`
                                :";"}`
                        }
                    </p>
                </CardContent>
            </Card>

        </div>
    )
}

export default TripsPage;
