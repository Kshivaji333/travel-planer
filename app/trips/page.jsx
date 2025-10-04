
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
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
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
                                    : ";"}`
                        }
                    </p>
                </CardContent>

            </Card>
            <div className="">
                <h2 className='text-xl font-semibold mb-4'>Your Recent Trips</h2>
                {
                    trips.length === 0 ? (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-8">
                                <h3 className='text-xl font-medium mb-2'>No trips yet.</h3>
                                <p className='text-center mb-4 max-w-md'>Start planning your adventure by createing your first trip</p>
                                <Link href={"/trips/new"}>
                                    <Button>Create Trips</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {sortedTrips.slice(0, 6).map((trip, key) => {
                                return (<Link href={""} key={key}>
                                    <Card className="h-full hover:shadow-md transition-shadow">
                                        <CardHeader >
                                            <CardTitle className="line-clamp-1">
                                                {trip.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className='text-sm line-clamp-2 mb-2'>{trip.description}</p>
                                            <div className='text-sm'>
                                                {new Date(trip.startDate).toLocaleDateString()} - {" "}
                                                {new Date(trip.endDate).toLocaleDateString()}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>)
                            })}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default TripsPage;
