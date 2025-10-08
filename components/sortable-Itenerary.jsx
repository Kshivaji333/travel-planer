
import React, { useId, useState } from 'react'
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities"
const SortableItem = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

  return <div
    className='p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing'
    ref={setNodeRef}
    {...attributes}
    {...listeners}
    style={{ transform: CSS.Transform.toString(transform), transition }}
  >
    <div className="flex items-center gap-4">
      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
        <span className="text-blue-600 font-bold text-lg">{item.order}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className='font-semibold text-gray-900 text-lg mb-1'>
          {item.locationTitle}
        </h4>
        <p className='text-sm text-gray-500 mb-2'>
          Coordinates: {item.lat.toFixed(4)}, {item.lng.toFixed(4)}
        </p>
        <div className='flex items-center gap-2 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full w-fit'>
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          Day {item.order}
        </div>
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
        <div className='space-y-3'>
          {localLocation.map((item) => (
            <SortableItem key={item.id} item={item}></SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}

export default SortableItenerary
