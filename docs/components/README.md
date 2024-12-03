# Components Documentation

## Core Components

### RoomCard
Location: `src/components/RoomCard.tsx`
Purpose: Displays individual room cards on the homepage
Customization:
- Modify the card layout in the component JSX
- Update styling using Tailwind classes
- Adjust image aspect ratio and hover effects

### RoomDetail
Location: `src/components/RoomDetail.tsx`
Purpose: Shows detailed room information and booking interface
Customization:
- Update the layout in the component JSX
- Modify the image gallery configuration
- Adjust the amenities display

### BookingCalendar
Location: `src/components/BookingCalendar.tsx`
Purpose: Interactive calendar for date selection
Customization:
- Modify date selection logic
- Update calendar styling
- Adjust date format display

### ReservationForm
Location: `src/components/ReservationForm.tsx`
Purpose: Collects guest information for booking
Customization:
- Add or remove form fields
- Modify validation rules
- Update form styling

### AdminDashboard
Location: `src/components/AdminDashboard.tsx`
Purpose: Manages reservations and room availability
Customization:
- Modify the dashboard layout
- Add new management features
- Update table columns and data display

## Adding New Components

1. Create a new file in the appropriate directory
2. Import required dependencies
3. Define the component interface
4. Implement the component logic
5. Export the component
6. Update the index file if necessary

Example:
```tsx
import React from 'react';

interface NewComponentProps {
  // Define props
}

export const NewComponent: React.FC<NewComponentProps> = (props) => {
  return (
    // Component JSX
  );
};
```