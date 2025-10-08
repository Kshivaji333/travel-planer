"use client";

import { cn } from "@/lib/utils";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import createTrip from "@/lib/actions/create-trip";
import { useState, useTransition } from "react";
import { UploadButton } from "@/lib/upload-thing";
import Image from "next/image";
function NewTrip() {
    const [isPending, startTransition] = useTransition();
    const [imageUrl, setImageUrl] = useState(null)
    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12'>
            <div className='max-w-2xl mx-auto px-4'>
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Create New Trip</h1>
                    <p className="text-gray-600">Plan your next adventure with our travel planner</p>
                </div>
                <Card className="shadow-xl border-0">
                    <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                        <CardTitle className="text-2xl">Trip Details</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                    <form action={(formData) => {
                        if(imageUrl) {
                            formData.append("imageUrl",imageUrl);
                        }
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
                        <div className="">
                            <label htmlFor="">Trip Image</label>
                            {imageUrl && (
                                <Image
                                    src={imageUrl}
                                    alt="Trip Preview"
                                    className="w-full mb-4 rounded-md max-h-48 object-cover"
                                    width={300}
                                    height={100}
                                />
                            )}
                            <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                    if (res && res[0].ufsUrl) {
                                        setImageUrl(res[0].ufsUrl);
                                    }
                                }}
                                onUploadError={(error) => {
                                    console.log("Upload error!", error);
                                }}
                            />
                        </div>
                        <Button type="submit" disabled={isPending} className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6">
                            {isPending ? "Creating..." : "Create Trip"}
                        </Button>
                    </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default NewTrip;
