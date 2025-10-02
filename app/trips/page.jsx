import React from 'react'
import { auth } from '@/auth';
import { Button } from "@/components/ui/button";
import Link from 'next/link';


async function TripsPage() {
    const session = await auth();
    if (!session) {
        return (
            <div className='flex justify-center items-center text-gray-700 text-xl'>
                Please Sign In.
            </div>
        )
    }

    return (
        <div className="space-y-6 container mx-auto py-6 px-4">
            <div className="">
                <h1>Dashboard</h1>
                <Link href={"/trips/new"}>
                    <Button> My Trips</Button>
                </Link>
            </div>

        </div>
    )
}

export default TripsPage
