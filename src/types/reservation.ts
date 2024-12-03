export interface Room {
  id: number;
  name: string;
  capacity: number;
  pricePerNight: number;
}

export interface Reservation {
  id: number;
  roomId: number;
  checkIn: Date;
  checkOut: Date;
  guestName: string;
  email: string;
  phone: string;
  numberOfGuests: number;
  status: 'confirmed' | 'cancelled';
  createdAt: Date;
}

export interface ReservationFormData {
  checkIn: Date;
  checkOut: Date;
  roomId: number;
  guestName: string;
  email: string;
  phone: string;
  numberOfGuests: number;
}