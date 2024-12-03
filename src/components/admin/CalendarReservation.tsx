import React from 'react';
import { format } from 'date-fns';
import { Booking } from '../../types/room';

interface CalendarReservationProps {
  reservation: Booking;
}

export const CalendarReservation: React.FC<CalendarReservationProps> = ({ reservation }) => {
  return (
    <div
      className="bg-blue-100 text-blue-800 text-xs rounded px-1.5 py-0.5 cursor-pointer hover:bg-blue-200 transition-colors"
      title={`${reservation.guestName}
Check-in: ${format(new Date(reservation.checkIn), 'dd/MM/yyyy')}
Check-out: ${format(new Date(reservation.checkOut), 'dd/MM/yyyy')}
Huéspedes: ${reservation.numberOfGuests}`}
    >
      {reservation.guestName.split(' ')[0]}
    </div>
  );
};