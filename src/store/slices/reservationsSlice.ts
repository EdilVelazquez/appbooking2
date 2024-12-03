import { StateCreator } from 'zustand';
import { Booking } from '../../types/room';
import * as db from '../../utils/db';

export interface ReservationsSlice {
  reservations: Booking[];
  isLoading: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  addReservation: (reservation: Omit<Booking, 'id'>) => Promise<void>;
  cancelReservation: (id: number) => Promise<void>;
  updateReservation: (id: number, updates: Partial<Booking>) => Promise<void>;
}

export const createReservationsSlice: StateCreator<ReservationsSlice> = (set) => ({
  reservations: [],
  isLoading: false,
  error: null,

  initialize: async () => {
    set({ isLoading: true, error: null });
    try {
      const reservations = await db.getReservations();
      set({ reservations, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  addReservation: async (reservation) => {
    set({ isLoading: true, error: null });
    try {
      const id = await db.addReservation(reservation);
      const newReservation = { ...reservation, id };
      set((state) => ({
        reservations: [...state.reservations, newReservation],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  cancelReservation: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await db.updateReservation(id, { status: 'cancelled' });
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

  updateReservation: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      await db.updateReservation(id, updates);
      set((state) => ({
        reservations: state.reservations.map((res) =>
          res.id === id ? { ...res, ...updates } : res
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },
});