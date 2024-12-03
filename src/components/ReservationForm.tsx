import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReservationStore } from '../store/useReservationStore';

interface ReservationFormProps {
  roomId: number;
  checkIn: Date;
  checkOut: Date;
  onBack: () => void;
}

interface FormData {
  guestName: string;
  email: string;
  phone: string;
  numberOfGuests: number;
  specialRequests: string;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({
  roomId,
  checkIn,
  checkOut,
  onBack,
}) => {
  const navigate = useNavigate();
  const { addReservation, isRoomAvailable } = useReservationStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (!isRoomAvailable(roomId, checkIn, checkOut)) {
      alert('Lo sentimos, esta habitación ya no está disponible para las fechas seleccionadas.');
      return;
    }

    try {
      await addReservation({
        id: Date.now(),
        roomId,
        checkIn,
        checkOut,
        ...data,
        status: 'confirmed',
        createdAt: new Date(),
      });
      alert('¡Reservación realizada con éxito!');
      navigate('/');
    } catch (error) {
      alert('Error al realizar la reservación. Por favor intente nuevamente.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver al Calendario
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
          <input
            type="text"
            {...register('guestName', { required: 'El nombre es requerido' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.guestName && (
            <p className="mt-1 text-sm text-red-600">{errors.guestName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            {...register('email', {
              required: 'El correo electrónico es requerido',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Correo electrónico inválido',
              },
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            type="tel"
            {...register('phone', { required: 'El teléfono es requerido' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Número de Huéspedes
          </label>
          <input
            type="number"
            min="1"
            {...register('numberOfGuests', {
              required: 'El número de huéspedes es requerido',
              min: { value: 1, message: 'Mínimo 1 huésped' },
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.numberOfGuests && (
            <p className="mt-1 text-sm text-red-600">{errors.numberOfGuests.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Solicitudes Especiales
          </label>
          <textarea
            {...register('specialRequests')}
            rows={4}
            placeholder="Indique cualquier requerimiento especial (alergias, preferencias, etc.)"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Completar Reservación
        </button>
      </form>
    </motion.div>
  );
};