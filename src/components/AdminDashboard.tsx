import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { LogOut, Calendar as CalendarIcon, List, XCircle, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useReservationStore } from '../store/useReservationStore';
import { AdminCalendar } from './AdminCalendar';
import { motion, AnimatePresence } from 'framer-motion';
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Booking } from '../types/room';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { rooms, cancelReservation } = useReservationStore();
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [expandedReservation, setExpandedReservation] = useState<string | null>(null);
  const [reservations, setReservations] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Configurar el listener de tiempo real para las reservaciones
    const q = query(collection(db, 'reservations'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedReservations = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        checkIn: doc.data().checkIn.toDate(),
        checkOut: doc.data().checkOut.toDate(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate()
      })) as Booking[];
      setReservations(updatedReservations);
      setLoading(false);
    }, (error) => {
      console.error("Error al escuchar cambios en reservaciones:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCancelReservation = async (id: string) => {
    if (window.confirm('¿Está seguro de que desea cancelar esta reservación?')) {
      try {
        await cancelReservation(id);
        // No necesitamos actualizar el estado manualmente ya que el listener se encargará
      } catch (error) {
        alert('Error al cancelar la reservación: ' + (error as Error).message);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Panel de Administración</h1>
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setView('list')}
              className={`flex items-center px-3 py-1 rounded ${
                view === 'list'
                  ? 'bg-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="w-4 h-4 mr-1" />
              Lista
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`flex items-center px-3 py-1 rounded ${
                view === 'calendar'
                  ? 'bg-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CalendarIcon className="w-4 h-4 mr-1" />
              Calendario
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </button>
        </div>
      </div>

      {view === 'list' ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Detalles del Huésped
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Habitación
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fechas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reservations.map((reservation) => {
                  const room = rooms.find((r) => r.id === reservation.roomId);
                  const isExpanded = expandedReservation === reservation.id;

                  return (
                    <React.Fragment key={reservation.id}>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {reservation.guestName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {reservation.email}
                          </div>
                          <div className="text-sm text-gray-500">
                            {reservation.phone}
                          </div>
                          <button
                            onClick={() => setExpandedReservation(isExpanded ? null : reservation.id)}
                            className="mt-1 text-sm text-blue-600 hover:text-blue-800 flex items-center"
                          >
                            {isExpanded ? 'Ocultar detalles' : 'Ver detalles'}
                            <ChevronDown
                              className={`w-4 h-4 ml-1 transform transition-transform ${
                                isExpanded ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{room?.name}</div>
                          <div className="text-sm text-gray-500">
                            {reservation.numberOfGuests} huéspedes
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {format(new Date(reservation.checkIn), 'dd/MM/yyyy')} -
                            {format(new Date(reservation.checkOut), 'dd/MM/yyyy')}
                          </div>
                          <div className="text-sm text-gray-500">
                            Creada: {format(new Date(reservation.createdAt), 'dd/MM/yyyy HH:mm')}
                          </div>
                          {reservation.updatedAt && (
                            <div className="text-sm text-gray-500">
                              Actualizada: {format(new Date(reservation.updatedAt), 'dd/MM/yyyy HH:mm')}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              reservation.status === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {reservation.status === 'confirmed' ? 'Confirmada' : 'Cancelada'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {reservation.status === 'confirmed' && (
                            <button
                              onClick={() => handleCancelReservation(reservation.id)}
                              className="flex items-center text-red-600 hover:text-red-900"
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Cancelar
                            </button>
                          )}
                        </td>
                      </tr>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.tr
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <td colSpan={5} className="px-6 py-4 bg-gray-50">
                              <div className="text-sm text-gray-700">
                                <h4 className="font-medium mb-2">Solicitudes Especiales:</h4>
                                <p className="whitespace-pre-wrap">
                                  {reservation.specialRequests || 'No se especificaron solicitudes especiales'}
                                </p>
                              </div>
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <AdminCalendar />
      )}
    </motion.div>
  );
};