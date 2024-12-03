import { Timestamp } from 'firebase/firestore';

export interface Room {
  id: number;
  name: string;
  description: string;
  price: number;
  capacity: number;
  images: string[];
  amenities: string[];
  isAvailable?: boolean;
}

export interface Booking {
  id: string;
  roomId: number;
  checkIn: Date;
  checkOut: Date;
  guestName: string;
  email: string;
  phone: string;
  numberOfGuests: number;
  specialRequests?: string;
  status: 'confirmed' | 'cancelled';
  createdAt: Date;
  updatedAt?: Date;
}