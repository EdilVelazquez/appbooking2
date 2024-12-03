import { openDB, DBSchema } from 'idb';
import { Room, Booking } from '../types/room';

interface HotelDB extends DBSchema {
  reservations: {
    key: number;
    value: Booking;
    indexes: { 'by-room': number; 'by-dates': [Date, Date] };
  };
}

const DB_NAME = 'hotel-reservations';
const DB_VERSION = 1;

export const initDB = async () => {
  const db = await openDB<HotelDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      const store = db.createObjectStore('reservations', {
        keyPath: 'id',
        autoIncrement: true,
      });
      store.createIndex('by-room', 'roomId');
      store.createIndex('by-dates', ['checkIn', 'checkOut']);
    },
  });
  return db;
};

export const addReservation = async (reservation: Omit<Booking, 'id'>) => {
  const db = await initDB();
  return db.add('reservations', {
    ...reservation,
    id: Date.now(),
  });
};

export const getReservations = async () => {
  const db = await initDB();
  return db.getAll('reservations');
};

export const updateReservation = async (id: number, updates: Partial<Booking>) => {
  const db = await initDB();
  const reservation = await db.get('reservations', id);
  if (!reservation) throw new Error('Reservation not found');
  
  return db.put('reservations', {
    ...reservation,
    ...updates,
  });
};

export const deleteReservation = async (id: number) => {
  const db = await initDB();
  return db.delete('reservations', id);
};

export const getReservationsByRoom = async (roomId: number) => {
  const db = await initDB();
  const index = db.transaction('reservations').store.index('by-room');
  return index.getAll(roomId);
};

export const getReservationsByDateRange = async (start: Date, end: Date) => {
  const db = await initDB();
  const reservations = await db.getAll('reservations');
  return reservations.filter(
    (res) =>
      res.status !== 'cancelled' &&
      new Date(res.checkIn) <= end &&
      new Date(res.checkOut) >= start
  );
};