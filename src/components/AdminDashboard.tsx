import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Calendar as CalendarIcon, List } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { AdminCalendar } from './AdminCalendar';
import { RoomManagement } from './admin/RoomManagement';
import { ReservationList } from './admin/ReservationList';
import { motion } from 'framer-motion';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [view, setView] = useState<'list' | 'calendar' | 'rooms'>('list');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
              Reservaciones
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
            <button
              onClick={() => setView('rooms')}
              className={`flex items-center px-3 py-1 rounded ${
                view === 'rooms'
                  ? 'bg-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="w-4 h-4 mr-1" />
              Habitaciones
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

      {view === 'rooms' ? (
        <RoomManagement />
      ) : view === 'calendar' ? (
        <AdminCalendar />
      ) : (
        <ReservationList />
      )}
    </motion.div>
  );
};