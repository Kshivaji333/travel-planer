"use client";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api"
export default function Map({itineraries}) {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });
    if (loadError) return <div>error loading maps</div>
    if(!isLoaded) {
        return <div>
            loading maps...
        </div>
    }
    const center = itineraries.length > 0 ? {lat: itineraries[0].lat, lng: itineraries[0].lng} : {lat: 0, lng:0};
    return(
        <GoogleMap 
        mapContainerStyle={{width: "100%", height: "100%"}}
        zoom={8}
        center={center}
        >
            {itineraries.map((itinerary) => (
                <Marker key={itinerary.id} position={{lat: itinerary.lat, lng: itinerary.lng}} title={itinerary.locationTitle} />
            ))}
        </GoogleMap>
    )
}