
import React, { useId, useState } from 'react'
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities"
const SortableItem = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

  return <div
    className='p-4 border rounded-md flex justify-center items-center hover:shadow transition-shadow '
    ref={setNodeRef}
    {...attributes}
    {...listeners}
    style={{ transform: CSS.Transform.toString(transform), transition }}
  >
    <div>
      <h4 className='font-medium text-gray-800'>
        {item.locationTitle}
      </h4>
      <p className='text-sm text-gray-500 truncate max-w-xs'>{`Latitude: ${item.lat}, Longitude: ${item.lng}`}</p>
      <div className='text-sm text-gray-500'>
        Day {item.order}
      </div>
    </div>
  </div>
}



function SortableItenerary({ locations, tripId }) {
  const id = useId();
  const [localLocation, setLocalLocation] = useState(locations);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = localLocation.findIndex((item) => item.id === active.id);
      const newIndex = localLocation.findIndex((item) => item.id === over.id);

      const newLocationsOrder = arrayMove(localLocation, oldIndex, newIndex).map((item, index) => {
        return { ...item, order: index }
      })
      setLocalLocation(newLocationsOrder);
      try {
        await fetch('/api/itinerary/reorder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tripId,
            locationIds: newLocationsOrder.map(item => item.id)
          })
        });
      } catch (e) {
        console.error('Failed to persist order', e);
      }
    }
  }

  return (
    <DndContext
      id={id}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={localLocation.map(loc => loc.id)} strategy={verticalListSortingStrategy}>
        <div className='space-y-4'>
          {localLocation.map((item) => (
            <SortableItem key={item.id} item={item}></SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}

export default SortableItenerary
