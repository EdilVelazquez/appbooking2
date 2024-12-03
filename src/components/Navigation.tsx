import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hotel, LogIn, Menu, X } from 'lucide-react';

interface NavigationProps {
  currentPath: string;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPath }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Hotel className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">Hotel Santa Inés</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md ${
                currentPath === '/' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Inicio
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 rounded-md ${
                currentPath === '/about' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Nosotros
            </Link>
            <Link
              to="/rooms"
              className={`px-3 py-2 rounded-md ${
                currentPath === '/rooms' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Reservar
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-2 rounded-md ${
                currentPath === '/contact' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Contacto
            </Link>
            <Link
              to="/admin"
              className={`px-3 py-2 rounded-md ${
                currentPath === '/admin' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Panel Administrativo
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Inicio
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Nosotros
            </Link>
            <Link
              to="/rooms"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Reservar
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Contacto
            </Link>
            <Link
              to="/admin"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Panel Administrativo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};