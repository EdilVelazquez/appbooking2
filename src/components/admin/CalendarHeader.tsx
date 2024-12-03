import React from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
  currentMonth: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonth,
  onPreviousMonth,
  onNextMonth,
}) => {
  return (
    <div className="p-4 border-b">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onPreviousMonth}
          className="px-3 py-1 text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button
          onClick={onNextMonth}
          className="px-3 py-1 text-gray-600 hover:text-gray-900"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};