import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isWithinInterval } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRoomStore } from '../store/useRoomStore';
import { useFirebaseReservations } from '../hooks/useFirebaseReservations';
import { CalendarReservation } from './admin/CalendarReservation';
import { Booking } from '../types/room';

export const AdminCalendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { rooms } = useRoomStore();
  const { reservations, loading, error } = useFirebaseReservations();

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const getReservationsForDay = (roomId: number, date: Date): Booking[] => {
    return reservations.filter(
      (reservation) =>
        reservation.roomId === roomId &&
        reservation.status === 'confirmed' &&
        isWithinInterval(date, {
          start: new Date(reservation.checkIn),
          end: new Date(reservation.checkOut),
        })
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden mt-8">
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden mt-8">
        <div className="p-8 text-center text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mt-8">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                Habitación
              </th>
              {daysInMonth.map((day) => (
                <th
                  key={day.toISOString()}
                  className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[40px]"
                >
                  {format(day, 'd')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rooms.map((room) => (
              <tr key={room.id} className={!room.isAvailable ? 'bg-gray-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white z-10 border-r">
                  <div className="flex flex-col">
                    <span className={!room.isAvailable ? 'text-gray-400' : ''}>
                      {room.name}
                    </span>
                    {!room.isAvailable && (
                      <span className="text-xs text-red-500">Deshabilitada</span>
                    )}
                  </div>
                </td>
                {daysInMonth.map((day) => {
                  const dayReservations = getReservationsForDay(room.id, day);
                  return (
                    <td
                      key={day.toISOString()}
                      className={`px-2 py-4 text-center ${
                        !room.isAvailable ? 'bg-gray-50' : ''
                      }`}
                    >
                      {room.isAvailable && dayReservations.map((reservation) => (
                        <CalendarReservation
                          key={reservation.id}
                          reservation={reservation}
                        />
                      ))}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};