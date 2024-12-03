import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  doc, 
  query, 
  where,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Booking } from '../types/room';

const RESERVATIONS_COLLECTION = 'reservations';

export const addReservation = async (reservation: Omit<Booking, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, RESERVATIONS_COLLECTION), {
      ...reservation,
      checkIn: Timestamp.fromDate(new Date(reservation.checkIn)),
      checkOut: Timestamp.fromDate(new Date(reservation.checkOut)),
      createdAt: serverTimestamp(),
      status: 'confirmed'
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding reservation:', error);
    throw new Error('No se pudo crear la reservación. Por favor intente nuevamente.');
  }
};

export const getReservations = async (): Promise<Booking[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, RESERVATIONS_COLLECTION));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      checkIn: (doc.data().checkIn as Timestamp).toDate(),
      checkOut: (doc.data().checkOut as Timestamp).toDate(),
      createdAt: (doc.data().createdAt as Timestamp)?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt ? (doc.data().updatedAt as Timestamp).toDate() : undefined
    })) as Booking[];
  } catch (error) {
    console.error('Error getting reservations:', error);
    throw new Error('Error al obtener las reservaciones');
  }
};

export const updateReservation = async (id: string, updates: Partial<Booking>): Promise<void> => {
  try {
    const reservationRef = doc(db, RESERVATIONS_COLLECTION, id);
    const updateData: Record<string, any> = { 
      ...updates,
      updatedAt: serverTimestamp()
    };
    
    if (updates.checkIn) {
      updateData.checkIn = Timestamp.fromDate(new Date(updates.checkIn));
    }
    if (updates.checkOut) {
      updateData.checkOut = Timestamp.fromDate(new Date(updates.checkOut));
    }
    
    await updateDoc(reservationRef, updateData);
  } catch (error) {
    console.error('Error updating reservation:', error);
    throw new Error('No se pudo actualizar la reservación');
  }
};

export const getReservationsByDateRange = async (start: Date, end: Date): Promise<Booking[]> => {
  try {
    const q = query(
      collection(db, RESERVATIONS_COLLECTION),
      where('checkOut', '>=', Timestamp.fromDate(start)),
      where('checkIn', '<=', Timestamp.fromDate(end)),
      where('status', '==', 'confirmed')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      checkIn: (doc.data().checkIn as Timestamp).toDate(),
      checkOut: (doc.data().checkOut as Timestamp).toDate(),
      createdAt: (doc.data().createdAt as Timestamp)?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt ? (doc.data().updatedAt as Timestamp).toDate() : undefined
    })) as Booking[];
  } catch (error) {
    console.error('Error getting reservations by date range:', error);
    throw new Error('Error al obtener las reservaciones por rango de fecha');
  }
};