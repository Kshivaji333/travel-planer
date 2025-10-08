"use client";

import { login, logout } from "@/lib/auth-actions"
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { MapPin, User, LogOut, LogIn } from 'lucide-react'

function Navebar({ session }) {
    return (
        <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
            <div className='container mx-auto flex justify-between items-center px-4 lg:px-8 py-4'>
                <Link href={"/"} className='flex items-center gap-3 hover:opacity-80 transition-opacity'>
                    <Image src={"/logo.png"} alt='Travel Planner Logo' width={40} height={40} className="rounded-lg" />
                    <span className='text-2xl font-bold text-gray-900'>Travel Planner</span>
                </Link>

                <div className='flex items-center gap-4'>
                    {session ? (
                        <>
                            <Link 
                                href={"/trips"} 
                                className='flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-medium'
                            >
                                <MapPin className="h-4 w-4" />
                                My Trips
                            </Link>
                            <Link 
                                href={"/trips/new"} 
                                className='hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium'
                            >
                                <MapPin className="h-4 w-4" />
                                New Trip
                            </Link>
                            <div className="flex items-center gap-2 text-gray-600">
                                <User className="h-4 w-4" />
                                <span className="text-sm font-medium">{session.user?.name}</span>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={logout}
                                className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                            >
                                <LogOut className="h-4 w-4" />
                                Sign out
                            </Button>
                        </>
                    ) : (
                        <Button
                            onClick={login}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            <LogIn className="h-4 w-4" />
                            Sign in
                        </Button>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navebar
