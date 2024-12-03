import React from 'react';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';

interface DateFilterProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onDateChange: (dates: { checkIn: Date | null; checkOut: Date | null }) => void;
}

export const DateFilter: React.FC<DateFilterProps> = ({
  checkIn,
  checkOut,
  onDateChange,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-8">
      <h2 className="text-lg font-semibold mb-4">Filtrar Habitaciones Disponibles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de Entrada
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              min={format(new Date(), 'yyyy-MM-dd')}
              value={checkIn ? format(checkIn, 'yyyy-MM-dd') : ''}
              onChange={(e) =>
                onDateChange({
                  checkIn: e.target.value ? new Date(e.target.value) : null,
                  checkOut,
                })
              }
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de Salida
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              min={checkIn ? format(checkIn, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')}
              value={checkOut ? format(checkOut, 'yyyy-MM-dd') : ''}
              onChange={(e) =>
                onDateChange({
                  checkIn,
                  checkOut: e.target.value ? new Date(e.target.value) : null,
                })
              }
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};