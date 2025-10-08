
import React from 'react'
import { auth } from '@/auth';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Image from 'next/image';
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="space-y-8 container mx-auto py-8 px-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className='text-4xl font-bold text-gray-900 mb-2'>My Travel Dashboard</h1>
                        <p className="text-gray-600">Manage and plan your travel adventures</p>
                    </div>
                    <Link href={"/trips/new"}>
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            New Trip
                        </Button>
                    </Link>
                </div>

                <Card className="bg-white shadow-lg border-0">
                    <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                        <CardTitle className="text-2xl">Welcome back, {session.user?.name}! 👋</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600">{trips.length}</div>
                                <div className="text-gray-600">Total Trips</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600">{upcomingTrips.length}</div>
                                <div className="text-gray-600">Upcoming</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600">{trips.length - upcomingTrips.length}</div>
                                <div className="text-gray-600">Completed</div>
                            </div>
                        </div>
                        {trips.length === 0 && (
                            <div className="text-center mt-6 p-4 bg-blue-50 rounded-lg">
                                <p className="text-gray-700">Start planning your first adventure by clicking the "New Trip" button above!</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
                <div className="">
                    <h2 className='text-2xl font-bold text-gray-900 mb-6'>Your Recent Trips</h2>
                    {
                        trips.length === 0 ? (
                            <Card className="bg-white shadow-lg border-0">
                                <CardContent className="flex flex-col items-center justify-center py-12">
                                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                                        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <h3 className='text-2xl font-semibold text-gray-900 mb-2'>No trips yet</h3>
                                    <p className='text-center text-gray-600 mb-6 max-w-md'>Start planning your adventure by creating your first trip</p>
                                    <Link href={"/trips/new"}>
                                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Create Your First Trip
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {sortedTrips.slice(0, 6).map((trip, key) => {
                                    return (<Link href={`/trips/${trip.id}`} key={key}>
                                        <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-0">
                                            {trip.imageUrl && (
                                                <div className="h-48 relative overflow-hidden rounded-t-lg">
                                                    <Image
                                                        src={trip.imageUrl}
                                                        alt={trip.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            )}
                                            <CardHeader className="pb-3">
                                                <CardTitle className="line-clamp-1 text-lg">
                                                    {trip.title}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="pt-0">
                                                <p className='text-sm text-gray-600 line-clamp-2 mb-4'>{trip.description}</p>
                                                <div className='flex items-center justify-between text-sm text-gray-500'>
                                                    <div className="flex items-center gap-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                                                    </div>
                                                    <div className="text-blue-600 font-medium">
                                                        {Math.round((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                                                    </div>
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
        </div>
    )
}

export default TripsPage;
