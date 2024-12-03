# Guía para Editar Habitaciones

## Ubicación de Archivos Principales

1. **Datos de Habitaciones**
   - Archivo: `src/data/rooms.ts`
   - Aquí encontrarás el listado completo de habitaciones
   - Puedes modificar:
     - Nombres
     - Descripciones
     - Precios
     - Capacidad
     - Imágenes
     - Amenidades

2. **Base de Datos de Reservaciones**
   - Las reservaciones se almacenan en IndexedDB a través de `src/utils/db.ts`
   - Los datos persisten en el navegador del usuario
   - Se accede mediante el store Zustand en `src/store/useReservationStore.ts`

## Cómo Editar

### Agregar Nueva Habitación
```typescript
{
  id: 6, // Incrementar el ID
  name: 'Nombre de la Habitación',
  description: 'Descripción detallada',
  price: 3000, // Precio por noche en pesos
  capacity: 2, // Número de huéspedes
  images: [
    'URL_de_imagen_1',
    'URL_de_imagen_2',
    'URL_de_imagen_3'
  ],
  amenities: ['Amenidad 1', 'Amenidad 2', 'Amenidad 3'],
}
```

### Imágenes
- Usar URLs de Unsplash para imágenes
- Formato recomendado: 16:9 o 4:3
- Resolución mínima: 1200x800 píxeles

### Amenidades
- Agregar en formato de array
- Mantener consistencia en nombres
- Se pueden agregar íconos modificando el componente RoomDetail

## Consideraciones
- Los precios están en pesos mexicanos
- Las capacidades deben ser números enteros
- Las imágenes deben ser URLs válidas y accesibles
- Mantener IDs únicos para cada habitación