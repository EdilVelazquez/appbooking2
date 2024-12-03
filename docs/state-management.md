# State Management

The application uses Zustand for state management. Here's how different states are organized:

## Authentication State
File: `src/store/useAuthStore.ts`

```typescript
interface AuthStore {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}
```

Usage:
```typescript
const { isAuthenticated, login, logout } = useAuthStore();
```

## Reservation State
File: `src/store/useReservationStore.ts`

```typescript
interface ReservationStore {
  rooms: Room[];
  reservations: Reservation[];
  addReservation: (reservation: Reservation) => void;
  cancelReservation: (id: number) => void;
  getAvailableRooms: (checkIn: Date, checkOut: Date) => Room[];
}
```

Usage:
```typescript
const { rooms, reservations, addReservation } = useReservationStore();
```

## Adding New State

1. Create a new store file in `src/store/`
2. Define the store interface
3. Create the store using Zustand
4. Export the hook