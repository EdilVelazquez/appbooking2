import React, { useState, useEffect } from 'react';
import { format, addDays, isWithinInterval, startOfDay, eachDayOfInterval } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReservationStore } from '../store/useReservationStore';
import { getReservationsByDateRange } from '../services/reservationService';
import { Booking } from '../types/room';

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
  const [roomReservations, setRoomReservations] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        // Obtener reservaciones para todo el mes actual
        const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        const reservations = await getReservationsByDateRange(firstDay, lastDay);
        
        // Filtrar solo las reservaciones para esta habitación
        const roomReservations = reservations.filter(
          res => res.roomId === roomId && res.status === 'confirmed'
        );
        
        setRoomReservations(roomReservations);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, [roomId, currentMonth]);

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

  const isDateAvailable = (date: Date) => {
    if (date < startOfDay(new Date())) return false;
    
    // Verificar si la fecha está dentro de alguna reservación existente
    return !roomReservations.some(reservation => 
      isWithinInterval(startOfDay(date), {
        start: startOfDay(new Date(reservation.checkIn)),
        end: startOfDay(new Date(reservation.checkOut))
      })
    );
  };

  const handleDateSelect = (date: Date) => {
    if (!selectedCheckIn || (selectedCheckIn && selectedCheckOut)) {
      // Verificar disponibilidad antes de seleccionar la fecha de entrada
      if (!isDateAvailable(date)) {
        return;
      }
      setSelectedCheckIn(date);
      setSelectedCheckOut(null);
      onDateSelect({ checkIn: date, checkOut: null });
    } else {
      if (date <= selectedCheckIn) {
        setSelectedCheckIn(date);
        setSelectedCheckOut(null);
        onDateSelect({ checkIn: date, checkOut: null });
        return;
      }

      // Verificar que todas las fechas en el rango estén disponibles
      const dateRange = eachDayOfInterval({ start: selectedCheckIn, end: date });
      const isRangeAvailable = dateRange.every(day => isDateAvailable(day));

      if (!isRangeAvailable) {
        alert('Algunas fechas en este rango no están disponibles. Por favor seleccione otras fechas.');
        return;
      }

      setSelectedCheckOut(date);
      onDateSelect({ checkIn: selectedCheckIn, checkOut: date });
    }
  };

  const isDateSelected = (date: Date) => {
    if (!selectedCheckIn || !selectedCheckOut) return false;
    return isWithinInterval(startOfDay(date), {
      start: startOfDay(selectedCheckIn),
      end: startOfDay(selectedCheckOut),
    });
  };

  const days = getDaysInMonth(currentMonth);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
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
                  ${isDateSelected(date) ? 'bg-blue-500 text-white' : ''}
                  ${!isDateAvailable(date) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}
                  ${date === selectedCheckIn ? 'bg-blue-600 text-white' : ''}
                  ${date === selectedCheckOut ? 'bg-blue-600 text-white' : ''}
                `}
                title={!isDateAvailable(date) ? 'No disponible' : ''}
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
                <span className="font-semibold">{format(selectedCheckIn, 'dd/MM/yyyy')}</span>
              </div>
              <div className="flex justify-between">
                <span>Check-out</span>
                <span className="font-semibold">{format(selectedCheckOut, 'dd/MM/yyyy')}</span>
              </div>
            </div>
            <button
              onClick={onReserve}
              className="mt-4 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reservar Ahora
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};