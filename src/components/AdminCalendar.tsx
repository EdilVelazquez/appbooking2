import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { useReservationStore } from '../store/useReservationStore';
import { Booking } from '../types/room';

export const AdminCalendar: React.FC = () => {
  const { reservations, rooms } = useReservationStore();
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const getReservationsForDay = (date: Date): Booking[] => {
    return reservations.filter(
      (reservation) =>
        new Date(reservation.checkIn) <= date &&
        new Date(reservation.checkOut) >= date &&
        reservation.status !== 'cancelled'
    );
  };

  const getRoomReservation = (date: Date, roomId: number): Booking | undefined => {
    return reservations.find(
      (reservation) =>
        reservation.roomId === roomId &&
        new Date(reservation.checkIn) <= date &&
        new Date(reservation.checkOut) >= date &&
        reservation.status !== 'cancelled'
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mt-8">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() =>
              setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))
            }
            className="px-3 py-1 text-gray-600 hover:text-gray-900"
          >
            Previous
          </button>
          <h2 className="text-xl font-semibold">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <button
            onClick={() =>
              setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))
            }
            className="px-3 py-1 text-gray-600 hover:text-gray-900"
          >
            Next
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50">
                Room
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
              <tr key={room.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white">
                  {room.name}
                </td>
                {daysInMonth.map((day) => {
                  const reservation = getRoomReservation(day, room.id);
                  return (
                    <td
                      key={day.toISOString()}
                      className={`px-2 py-4 text-center text-xs ${
                        reservation
                          ? 'bg-blue-100'
                          : ''
                      }`}
                    >
                      {reservation && (
                        <div
                          className="tooltip cursor-pointer"
                          title={`${reservation.guestName} (${format(
                            new Date(reservation.checkIn),
                            'MMM d'
                          )} - ${format(new Date(reservation.checkOut), 'MMM d')})`}
                        >
                          •
                        </div>
                      )}
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