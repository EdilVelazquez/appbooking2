import React from 'react';
import { motion } from 'framer-motion';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-4">Sobre Hotel Santa Inés</h1>
        <p className="text-xl text-gray-600">Una tradición de excelencia desde 1985</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
            alt="Hotel Santa Inés"
            className="rounded-lg shadow-lg"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-semibold mb-4">Nuestra Historia</h2>
          <p className="text-gray-600 mb-4">
            Hotel Santa Inés ha sido un símbolo de hospitalidad y excelencia desde su fundación.
            Ubicado en el corazón de la ciudad, nuestro hotel combina la elegancia clásica con
            comodidades modernas para ofrecer una experiencia única a nuestros huéspedes.
          </p>
          <p className="text-gray-600">
            Con más de 35 años de experiencia, nos enorgullece mantener los más altos estándares
            de servicio y calidad, asegurando que cada huésped tenga una estancia memorable.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <h3 className="text-xl font-semibold mb-2">Misión</h3>
          <p className="text-gray-600">
            Proporcionar experiencias excepcionales de hospitalidad, superando las expectativas
            de nuestros huéspedes con un servicio personalizado y atención al detalle.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <h3 className="text-xl font-semibold mb-2">Visión</h3>
          <p className="text-gray-600">
            Ser reconocidos como el hotel de referencia en nuestra región, destacando por
            nuestra excelencia en servicio y compromiso con la satisfacción del cliente.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <h3 className="text-xl font-semibold mb-2">Valores</h3>
          <p className="text-gray-600">
            Excelencia, integridad, compromiso con el cliente, trabajo en equipo y
            responsabilidad social son los pilares que guían nuestras acciones.
          </p>
        </motion.div>
      </div>
    </div>
  );
};