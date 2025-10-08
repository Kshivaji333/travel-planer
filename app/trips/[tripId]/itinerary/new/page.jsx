import React from 'react'
import NewLocationClient from '../../../../../components/new-location';


async function NewLocation({ params }) {
    const { tripId } = await params;
    return (
        <NewLocationClient tripId={tripId}>

        </NewLocationClient>
    )
}

export default NewLocation
