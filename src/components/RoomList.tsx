import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DateFilter } from './DateFilter';
import { RoomCard } from './RoomCard';
import { useReservationStore } from '../store/useReservationStore';
import { useRoomStore } from '../store/useRoomStore';

export const RoomList: React.FC = () => {
  const { getAvailableRooms } = useReservationStore();
  const { rooms } = useRoomStore();
  const [selectedDates, setSelectedDates] = useState<{
    checkIn: Date | null;
    checkOut: Date | null;
  }>({
    checkIn: null,
    checkOut: null,
  });

  const availableRooms = selectedDates.checkIn && selectedDates.checkOut
    ? getAvailableRooms(selectedDates.checkIn, selectedDates.checkOut)
    : rooms.filter(room => room.isAvailable);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-6">Nuestras Habitaciones</h1>
        <DateFilter
          checkIn={selectedDates.checkIn}
          checkOut={selectedDates.checkOut}
          onDateChange={setSelectedDates}
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {availableRooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};