# Project Structure

```
src/
├── components/          # React components
│   ├── admin/          # Admin-related components
│   └── booking/        # Booking-related components
├── data/               # Static data and mock data
├── store/              # State management
├── types/              # TypeScript type definitions
├── styles/             # Global styles and Tailwind config
└── utils/              # Utility functions

Key Directories:

## components/
Contains all React components, organized by feature:
- admin/ - Admin dashboard components
- booking/ - Booking flow components
- common/ - Shared components

## store/
State management using Zustand:
- useAuthStore.ts - Authentication state
- useReservationStore.ts - Reservation management

## types/
TypeScript interfaces and types:
- room.ts - Room-related types
- reservation.ts - Reservation-related types

## styles/
Styling configuration:
- index.css - Global styles
- tailwind.config.js - Tailwind configuration
```