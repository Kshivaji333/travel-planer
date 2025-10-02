"use client";

import { cn } from "@/lib/utils";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import createTrip from "@/lib/actions/create-trip";
import { useTransition } from "react";
function NewTrip() {
    const [isPending, startTransition] = useTransition()
    return (
        <div className='max-w-lg mx-auto mt-10'>
            <Card>
                <CardHeader>New Trip</CardHeader>
                <CardContent>
                    <form action={(formData) => {
                        startTransition(() => {
                            createTrip(formData);
                        })
                    }} className='space-y-6'>
                        <div>
                            <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
                            <input
                                type='text'
                                name='title'
                                placeholder='Japan trip'
                                className={cn("w-full border border-gray-300 px-3 py-2",
                                    "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                                )}
                                required
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
                            <textarea
                                name="description"
                                placeholder='Japan trip'
                                className={cn("w-full border border-gray-300 px-3 py-2",
                                    "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                                )}
                                required
                            ></textarea>
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Start Date</label>
                                <input
                                    type="date"
                                    name='startDate'
                                    className={cn("w-full border border-gray-300 px-3 py-2",
                                        "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                                    )}
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>End Date</label>
                                <input
                                    type='date'
                                    name='endDate'
                                    className={cn("w-full border border-gray-300 px-3 py-2",
                                        "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                                    )}
                                ></input>
                            </div>
                        </div>
                            <Button type="submit" disabled={isPending} className="w-full">
                               { isPending ? "Creating..." : "create Trip"}
                            </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default NewTrip;
