import React from 'react';
import { format, addDays, isWithinInterval, startOfDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  selectedCheckIn: Date | null;
  selectedCheckOut: Date | null;
  onDateSelect: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  selectedCheckIn,
  selectedCheckOut,
  onDateSelect,
}) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Add padding for first day of month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // Add all days in month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const isDateSelected = (date: Date) => {
    if (!selectedCheckIn || !selectedCheckOut) return false;
    return isWithinInterval(startOfDay(date), {
      start: startOfDay(selectedCheckIn),
      end: startOfDay(selectedCheckOut),
    });
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
          className="p-2 hover:bg-gray-100 rounded-full"
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
                onClick={() => onDateSelect(date)}
                disabled={date < startOfDay(new Date())}
                className={`w-full h-full flex items-center justify-center rounded-full
                  ${isDateSelected(date) ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}
                  ${date < startOfDay(new Date()) ? 'text-gray-300 cursor-not-allowed' : ''}
                `}
              >
                {format(date, 'd')}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};