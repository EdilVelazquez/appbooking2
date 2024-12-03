import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Users, Wifi, Coffee, Bath, Map, ArrowLeft } from 'lucide-react';
import { rooms } from '../data/rooms';
import { BookingCalendar } from './BookingCalendar';
import { ReservationForm } from './ReservationForm';
import { motion } from 'framer-motion';

export const RoomDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const room = rooms.find(r => r.id === Number(id));
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [selectedDates, setSelectedDates] = useState<{
    checkIn: Date | null;
    checkOut: Date | null;
  }>({ checkIn: null, checkOut: null });

  if (!room) {
    return <div>Room not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Rooms
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <img
                src={room.images[selectedImageIndex]}
                alt={room.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {room.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative aspect-[4/3] rounded-lg overflow-hidden ${
                    index === selectedImageIndex ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${room.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 gap-4">
              {room.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {amenity.includes('Wifi') && <Wifi className="w-5 h-5 text-gray-600" />}
                  {amenity.includes('Service') && <Coffee className="w-5 h-5 text-gray-600" />}
                  {amenity.includes('Bath') && <Bath className="w-5 h-5 text-gray-600" />}
                  {!amenity.includes('Wifi') && 
                   !amenity.includes('Service') && 
                   !amenity.includes('Bath') && <Map className="w-5 h-5 text-gray-600" />}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
            <h1 className="text-3xl font-bold mb-2">{room.name}</h1>
            <div className="flex items-center mb-4">
              <Users className="w-5 h-5 text-gray-600" />
              <span className="ml-1 text-gray-600">Up to {room.capacity} guests</span>
            </div>
            <p className="text-gray-600 mb-6">{room.description}</p>
            <div className="mb-6">
              <span className="text-3xl font-bold">${room.price}</span>
              <span className="text-gray-600"> per night</span>
            </div>
            {!showReservationForm ? (
              <BookingCalendar
                roomId={room.id}
                onDateSelect={setSelectedDates}
                onReserve={() => setShowReservationForm(true)}
              />
            ) : (
              <ReservationForm
                roomId={room.id}
                checkIn={selectedDates.checkIn!}
                checkOut={selectedDates.checkOut!}
                onBack={() => setShowReservationForm(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};