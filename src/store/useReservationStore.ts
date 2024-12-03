import { create } from 'zustand';
import { Room, Booking } from '../types/room';
import { rooms } from '../data/rooms';
import * as reservationService from '../services/reservationService';

interface ReservationStore {
  rooms: Room[];
  reservations: Booking[];
  isLoading: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  addReservation: (reservation: Omit<Booking, 'id'>) => Promise<void>;
  cancelReservation: (id: string) => Promise<void>;
  isRoomAvailable: (roomId: number, checkIn: Date, checkOut: Date, excludeReservationId?: string) => boolean;
  getAvailableRooms: (checkIn: Date, checkOut: Date) => Room[];
}

export const useReservationStore = create<ReservationStore>((set, get) => ({
  rooms,
  reservations: [],
  isLoading: false,
  error: null,

  initialize: async () => {
    set({ isLoading: true, error: null });
    try {
      const reservations = await reservationService.getReservations();
      set({ reservations, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  addReservation: async (reservation) => {
    const { isRoomAvailable } = get();
    
    if (!isRoomAvailable(reservation.roomId, reservation.checkIn, reservation.checkOut)) {
      throw new Error('La habitación no está disponible para las fechas seleccionadas');
    }

    set({ isLoading: true, error: null });
    try {
      const newReservation = {
        ...reservation,
        status: 'confirmed',
        createdAt: new Date()
      };
      const id = await reservationService.addReservation(newReservation);
      set((state) => ({
        reservations: [...state.reservations, { ...newReservation, id }],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  cancelReservation: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await reservationService.updateReservation(id, { 
        status: 'cancelled',
        updatedAt: new Date()
      });
      set((state) => ({
        reservations: state.reservations.map((res) =>
          res.id === id ? { ...res, status: 'cancelled' } : res
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  isRoomAvailable: (roomId, checkIn, checkOut, excludeReservationId) => {
    const { reservations } = get();
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    return !reservations.some(
      (res) =>
        res.roomId === roomId &&
        res.status !== 'cancelled' &&
        res.id !== excludeReservationId &&
        !(new Date(res.checkOut) <= checkInDate || new Date(res.checkIn) >= checkOutDate)
    );
  },

  getAvailableRooms: (checkIn, checkOut) => {
    const { rooms, isRoomAvailable } = get();
    return rooms.filter((room) => isRoomAvailable(room.id, checkIn, checkOut));
  },
}));