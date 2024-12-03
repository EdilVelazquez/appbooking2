import { Room } from '../types/room';

export const rooms: Room[] = [
  {
    id: 1,
    name: 'Suite Vista al Jardín',
    description: 'Disfrute de una experiencia única en nuestra espaciosa suite con vista al jardín. Ventanales del piso al techo ofrecen vistas impresionantes, mientras que las comodidades modernas aseguran una estancia confortable.',
    price: 2500,
    capacity: 2,
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7'
    ],
    amenities: ['Cama King Size', 'Vista al Jardín', 'Balcón Privado', 'Regadera de Lluvia', 'Mini Bar', 'Servicio a la Habitación'],
  },
  {
    id: 2,
    name: 'Villa Familiar',
    description: 'Ubicada en nuestro jardín privado, esta villa ofrece un refugio tranquilo con su propia terraza y área de estar al aire libre. Perfecta para quienes buscan tranquilidad.',
    price: 3800,
    capacity: 3,
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a',
      'https://images.unsplash.com/photo-1590490359683-658d3d23f972',
      'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d'
    ],
    amenities: ['Cama Queen Size', 'Jardín Privado', 'Área Exterior', 'Tina de Hidromasaje', 'Cocineta'],
  },
  {
    id: 3,
    name: 'Suite Ejecutiva',
    description: 'Una suite lujosa que ofrece vistas panorámicas, con diseño contemporáneo y amenidades premium.',
    price: 4200,
    capacity: 2,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd',
      'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f'
    ],
    amenities: ['Cama King Size', 'Vista Panorámica', 'Balcón Privado', 'Chimenea', 'Mini Bar'],
  },
  {
    id: 4,
    name: 'Suite con Alberca',
    description: 'Disfrute del lujo con acceso directo a la alberca, amplias áreas de estar y amenidades premium.',
    price: 5500,
    capacity: 4,
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4'
    ],
    amenities: ['2 Camas King Size', 'Acceso a Alberca', 'Sala de Estar', 'Baño Premium', 'Cocineta'],
  },
  {
    id: 5,
    name: 'Villa Santa Inés',
    description: 'Experimente vistas impresionantes desde esta villa premium con acceso privado a todas las instalaciones.',
    price: 6800,
    capacity: 3,
    images: [
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9',
      'https://images.unsplash.com/photo-1590490359854-dfb19d578c0e',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0'
    ],
    amenities: ['Cama King Size', 'Acceso VIP', 'Terraza Privada', 'Regadera Exterior', 'Mini Bar'],
  }
];