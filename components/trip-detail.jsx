"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Calendar, MapPin, Plus, Clock, Users, Navigation } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Map from "@/components/map"
import SortableItenerary from '@/components/sortable-Itenerary'
function TripDetailClient({ trip }) {
    const [activeTab, setActiveTab] = useState("overview");
    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50'>
            <div className='container mx-auto px-4 py-8 space-y-8'>
                {trip.imageUrl && (
                    <div className='w-full h-72 md:h-96 overflow-hidden rounded-2xl shadow-2xl relative'>
                        <Image
                            src={trip.imageUrl}
                            alt={trip.title}
                            className='object-cover'
                            fill
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                            <h1 className='text-4xl md:text-5xl font-bold mb-2'>{trip.title}</h1>
                            <div className='flex items-center text-white/90'>
                                <Calendar className='h-5 w-5 mr-2'></Calendar>
                                <span className='text-lg'>
                                    {trip.startDate.toLocaleDateString()} - {trip.endDate.toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {!trip.imageUrl && (
                    <div className='bg-white p-8 shadow-lg rounded-2xl'>
                        <div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
                            <div>
                                <h1 className='text-4xl font-bold text-gray-900 mb-4'>{trip.title}</h1>
                                <div className='flex items-center text-gray-600'>
                                    <Calendar className='h-5 w-5 mr-2'></Calendar>
                                    <span className='text-lg'>
                                        {trip.startDate.toLocaleDateString()} - {trip.endDate.toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <div className='mt-4 md:mt-0'>
                                <Link href={`/trips/${trip.id}/itinerary/new`}>
                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                        <Plus className='mr-2 h-5 w-5' />Add Location
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {trip.imageUrl && (
                    <div className='flex justify-end'>
                        <Link href={`/trips/${trip.id}/itinerary/new`}>
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                <Plus className='mr-2 h-5 w-5' />Add Location
                            </Button>
                        </Link>
                    </div>
                )}
                
                <div className='bg-white p-6 shadow rounded-lg'>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="mb-6">
                        <TabsTrigger value="overview" className="text-lg"> Overview </TabsTrigger>
                        <TabsTrigger value="itinerary" className="text-lg"> Itinerary </TabsTrigger>
                        <TabsTrigger value="map" className="text-lg"> Map </TabsTrigger>
                    </TabsList>
                    <TabsContent value='overview' className="space-y-6">
                        <div className='grid md:grid-cols-2 gap-6'>
                            <div>
                                <h2 className='text-2xl font-semibold mb-4'>Trip Summary</h2>
                                <div className='space-y-4'>
                                    <div className='flex items-start'>
                                        <Calendar className='h-6 w-6 mr-3 text-gray-500'></Calendar>
                                        <div className="">
                                            <p className='font-medium text-gray-700 '>Dates</p>
                                            <p className="text-s text-gray-500">
                                                {trip.startDate.toLocaleDateString()} - {trip.endDate.toLocaleDateString()}
                                                <br />
                                                {`${Math.round((trip.endDate.getTime() - trip.startDate.getTime()) / (1000 * 60 * 60 * 24))} days(s)`}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex items-start'>
                                        <MapPin className='h-6 w-6 mr-3 text-gray-500' />
                                        <div>
                                            <p>Destinations</p>
                                            <p>
                                                {trip.locations.length} {trip.locations.length === 1 ? "location" : "locations"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='h-72 rounded-lg overflow-hidden shadow'>
                                <Map itineraries={trip.locations} />
                            </div>
                            {trip.locations.length === 0 && (
                                <div className='text-center p-4'>
                                    <p>Add locations to see them on the map</p>
                                    <Link href={`/trips/${trip.id}/itinerary/new`}>
                                        <Button><Plus className='mr-2 h-5 w-5' />Add Location</Button>
                                    </Link>
                                </div>
                            )}
                            <div>
                                <p className='text-gray-600 leading-relaxed'>
                                    {trip.description}
                                </p>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value='itinerary' className="space-y-6">
                        <div className='flex justify-between items-center mb-4'>
                            <h2 className='text-2xl font-semibold'>Full Itinerary</h2>
                        </div>
                        {trip.locations.length === 0 ? (
                            <div className='text-center p-4'>
                                <p>Add locations to see them on the mb</p>
                                <Link href={`/trips/${trip.id}/itinerary/new`}>
                                    <Button><Plus className='mr-2 h-5 w-5' />Add Location</Button>
                                </Link>
                            </div>
                        ) : <SortableItenerary locations={trip.locations} tripId={trip.id} />}
                    </TabsContent>

                    <TabsContent value='map' className="space-y-6">
                        <div className='h-72 rounded-lg overflow-hidden shadow'>
                            <Map itineraries={trip.locations} />
                        </div>
                        {trip.locations.length === 0 && (
                            <div className='text-center p-4'>
                                <p>Add locations to see them on the map</p>
                                <Link href={`/trips/${trip.id}/itinerary/new`}>
                                    <Button><Plus className='mr-2 h-5 w-5' />Add Location</Button>
                                </Link>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
                </div>
                
                <div className='text-center'>
                    <Link href={`/trips`}>
                        <Button>Back to trips</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default TripDetailClient
