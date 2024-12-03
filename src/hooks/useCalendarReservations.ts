import { useState, useEffect } from 'react';
import { collection, query, getDocs, Timestamp } from 'firebase/firestore';
import { startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import { db } from '../config/firebase';
import { Booking } from '../types/room';

export const useCalendarReservations = (currentMonth: Date) => {
  const [reservations, setReservations] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        const start = startOfMonth(currentMonth);
        const end = endOfMonth(currentMonth);

        // Get all reservations and filter in memory to avoid complex indexes
        const reservationsRef = collection(db, 'reservations');
        const querySnapshot = await getDocs(reservationsRef);
        
        const fetchedReservations = querySnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
            checkIn: doc.data().checkIn.toDate(),
            checkOut: doc.data().checkOut.toDate(),
            createdAt: doc.data().createdAt?.toDate() || new Date(),
            updatedAt: doc.data().updatedAt?.toDate()
          }))
          .filter(reservation => 
            isWithinInterval(start, {
              start: new Date(reservation.checkIn),
              end: new Date(reservation.checkOut)
            }) ||
            isWithinInterval(end, {
              start: new Date(reservation.checkIn),
              end: new Date(reservation.checkOut)
            })
          ) as Booking[];

        setReservations(fetchedReservations);
        setError(null);
      } catch (err) {
        console.error('Error fetching reservations:', err);
        setError('Error al cargar las reservaciones');
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [currentMonth]);

  return { reservations, loading, error };
};