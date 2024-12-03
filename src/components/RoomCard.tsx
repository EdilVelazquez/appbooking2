import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';
import { Room } from '../types/room';
import { motion } from 'framer-motion';

interface RoomCardProps {
  room: Room;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg transition-shadow hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={room.images[0]}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{room.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{room.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-1" />
            <span className="text-sm">Hasta {room.capacity} huéspedes</span>
          </div>
          <div className="text-right">
            <span className="block text-xl font-semibold text-gray-900">${room.price}</span>
            <span className="text-sm text-gray-500">por noche</span>
          </div>
        </div>
        <button
          onClick={() => navigate(`/room/${room.id}`)}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Reservar Ahora
        </button>
      </div>
    </motion.div>
  );
};