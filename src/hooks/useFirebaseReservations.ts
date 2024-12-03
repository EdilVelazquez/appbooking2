import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Booking } from '../types/room';

export const useFirebaseReservations = () => {
  const [reservations, setReservations] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const reservationsRef = collection(db, 'reservations');
    
    const unsubscribe = onSnapshot(
      reservationsRef,
      (snapshot) => {
        const updatedReservations = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          checkIn: doc.data().checkIn.toDate(),
          checkOut: doc.data().checkOut.toDate(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate()
        })) as Booking[];
        
        setReservations(updatedReservations);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching reservations:', err);
        setError('Error al cargar las reservaciones');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { reservations, loading, error };
};