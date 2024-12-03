import React, { useState } from 'react';
import { format, addDays, isWithinInterval, startOfDay, eachDayOfInterval } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReservationStore } from '../store/useReservationStore';

interface BookingCalendarProps {
  roomId: number;
  onDateSelect: (dates: { checkIn: Date | null; checkOut: Date | null }) => void;
  onReserve: () => void;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({
  roomId,
  onDateSelect,
  onReserve,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedCheckIn, setSelectedCheckIn] = useState<Date | null>(null);
  const [selectedCheckOut, setSelectedCheckOut] = useState<Date | null>(null);
  const { isRoomAvailable, reservations } = useReservationStore();

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const handleDateSelect = (date: Date) => {
    if (!selectedCheckIn || (selectedCheckIn && selectedCheckOut)) {
      setSelectedCheckIn(date);
      setSelectedCheckOut(null);
      onDateSelect({ checkIn: date, checkOut: null });
    } else {
      if (date > selectedCheckIn) {
        // Check if all dates in the range are available
        const dateRange = eachDayOfInterval({ start: selectedCheckIn, end: date });
        const isRangeAvailable = dateRange.every(day => 
          !reservations.some(res => 
            res.roomId === roomId &&
            res.status !== 'cancelled' &&
            isWithinInterval(startOfDay(day), {
              start: startOfDay(new Date(res.checkIn)),
              end: startOfDay(new Date(res.checkOut))
            })
          )
        );

        if (!isRangeAvailable) {
          alert('Some dates in this range are already booked. Please select different dates.');
          return;
        }
        setSelectedCheckOut(date);
        onDateSelect({ checkIn: selectedCheckIn, checkOut: date });
      } else {
        setSelectedCheckIn(date);
        setSelectedCheckOut(null);
        onDateSelect({ checkIn: date, checkOut: null });
      }
    }
  };

  const isDateSelected = (date: Date) => {
    if (!selectedCheckIn || !selectedCheckOut) return false;
    return isWithinInterval(startOfDay(date), {
      start: startOfDay(selectedCheckIn),
      end: startOfDay(selectedCheckOut),
    });
  };

  const isDateAvailable = (date: Date) => {
    if (date < startOfDay(new Date())) return false;
    
    // Check if the date is within any existing reservation
    return !reservations.some(res => 
      res.roomId === roomId &&
      res.status !== 'cancelled' &&
      isWithinInterval(startOfDay(date), {
        start: startOfDay(new Date(res.checkIn)),
        end: startOfDay(new Date(res.checkOut))
      })
    );
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
        {days.map((date, index) => (
          <div
            key={index}
            className="aspect-square flex items-center justify-center"
          >
            {date && (
              <button
                onClick={() => handleDateSelect(date)}
                disabled={!isDateAvailable(date)}
                className={`w-full h-full flex items-center justify-center rounded-full transition-colors
                  ${isDateSelected(date) ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}
                  ${!isDateAvailable(date) ? 'text-gray-300 cursor-not-allowed bg-gray-50' : ''}
                  ${date === selectedCheckIn ? 'bg-blue-600 text-white' : ''}
                  ${date === selectedCheckOut ? 'bg-blue-600 text-white' : ''}
                `}
              >
                {format(date, 'd')}
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedCheckIn && selectedCheckOut && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <div className="border-t pt-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Check-in</span>
                <span className="font-semibold">{format(selectedCheckIn, 'MMM d, yyyy')}</span>
              </div>
              <div className="flex justify-between">
                <span>Check-out</span>
                <span className="font-semibold">{format(selectedCheckOut, 'MMM d, yyyy')}</span>
              </div>
            </div>
            <button
              onClick={onReserve}
              className="mt-4 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reserve Now
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};