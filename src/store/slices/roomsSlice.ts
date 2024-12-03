import { StateCreator } from 'zustand';
import { Room } from '../../types/room';

export interface RoomsSlice {
  rooms: Room[];
  getAvailableRooms: (checkIn: Date, checkOut: Date) => Room[];
  isRoomAvailable: (roomId: number, checkIn: Date, checkOut: Date, excludeReservationId?: number) => boolean;
}

const initialRooms: Room[] = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `Room ${i + 1}`,
  description: `Luxurious room with modern amenities and comfortable furnishings.`,
  capacity: Math.floor(Math.random() * 2) + 2,
  price: Math.floor(Math.random() * 50) + 100,
  images: [
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a',
    'https://images.unsplash.com/photo-1590490359683-658d3d23f972',
  ],
  amenities: [
    'Free Wi-Fi',
    'Air Conditioning',
    'Mini Bar',
    'Room Service',
    'King Size Bed',
  ],
}));

export const createRoomsSlice: StateCreator<RoomsSlice> = (set, get) => ({
  rooms: initialRooms,
  
  getAvailableRooms: (checkIn: Date, checkOut: Date) => {
    const { rooms, isRoomAvailable } = get();
    return rooms.filter((room) =>
      isRoomAvailable(room.id, checkIn, checkOut)
    );
  },

  isRoomAvailable: (roomId: number, checkIn: Date, checkOut: Date, excludeReservationId?: number) => {
    // This will be implemented in the combined store to access reservations
    return true;
  },
});