import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Room } from '../types/room';
import { rooms as initialRooms } from '../data/rooms';

interface RoomStore {
  rooms: (Room & { isAvailable: boolean })[];
  toggleRoomAvailability: (roomId: number) => void;
  updateRoom: (roomId: number, updates: Partial<Room>) => void;
}

export const useRoomStore = create<RoomStore>()(
  persist(
    (set) => ({
      rooms: initialRooms.map(room => ({ ...room, isAvailable: true })),
      
      toggleRoomAvailability: (roomId) => {
        set((state) => ({
          rooms: state.rooms.map((room) =>
            room.id === roomId
              ? { ...room, isAvailable: !room.isAvailable }
              : room
          ),
        }));
      },

      updateRoom: (roomId, updates) => {
        set((state) => ({
          rooms: state.rooms.map((room) =>
            room.id === roomId
              ? { ...room, ...updates }
              : room
          ),
        }));
      },
    }),
    {
      name: 'room-storage',
    }
  )
);