import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[600px]">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
          alt="Hotel Santa Inés"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold mb-4"
            >
              Bienvenidos a Hotel Santa Inés
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl mb-8"
            >
              Experimente el lujo y la comodidad en el corazón de la ciudad
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                to="/rooms"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reservar Ahora
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Nuestros Servicios</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7"
              alt="Habitaciones de Lujo"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Habitaciones de Lujo</h3>
            <p className="text-gray-600">Espacios elegantes y confortables para su estancia</p>
          </div>
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1590490360182-c33d57733427"
              alt="Restaurante"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Restaurante Gourmet</h3>
            <p className="text-gray-600">Experiencia culinaria excepcional</p>
          </div>
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1560185007-c5ca9d2c014d"
              alt="Spa"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Spa & Bienestar</h3>
            <p className="text-gray-600">Relájese y rejuvenezca en nuestro spa</p>
          </div>
        </div>
      </div>
    </div>
  );
};