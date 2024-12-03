# Styling Guide

## Tailwind CSS Configuration

The project uses Tailwind CSS for styling. Configuration is in `tailwind.config.js`.

### Custom Classes

```css
@layer components {
  .btn-primary {
    @apply bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700;
  }
}
```

### Color Scheme

Primary colors:
- Blue: #2563eb (bg-blue-600)
- Gray: #111827 (text-gray-900)
- White: #ffffff (bg-white)

## Responsive Design

Breakpoints:
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

Example:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

## Animations

Using Framer Motion for animations:

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
```

## Icons

Using Lucide React for icons:

```tsx
import { Hotel, Users, Calendar } from 'lucide-react';
```