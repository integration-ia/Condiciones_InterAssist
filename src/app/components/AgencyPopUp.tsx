'use client';

import { useState, useEffect } from 'react';
import { X, Plane, Briefcase, DollarSign } from 'lucide-react';

export default function AgencyPopUp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000); // Aparece después de 3 segundos
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 transition-opacity duration-300 z-50">
      <div className="w-full max-w-5xl bg-gradient-to-br from-green-50 to-green-100 rounded-lg overflow-hidden shadow-2xl flex flex-col md:flex-row transform transition-all duration-300 ease-in-out hover:scale-105 min-h-[400px]"> {/* Ajustar altura aquí */}
        <div className="w-full md:w-1/2 bg-green-600 p-8 flex flex-col justify-center items-center relative overflow-hidden"> {/* Ajusta p-8 para mayor padding */}
          <div className="absolute inset-0 bg-green-700 opacity-20"></div>
          <Plane className="text-white w-24 h-24 mb-4 relative z-10 animate-bounce" />
          <h2 className="text-3xl font-bold text-white mb-4 relative z-10 text-center">
            ¡Despega tu Negocio!
          </h2>
          <p className="text-green-100 text-center relative z-10">
            Únete a nuestra red de agencias y lleva tus ganancias a nuevas alturas
          </p>
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between bg-white relative"> {/* Ajusta p-8 para mayor padding */}
          <h2 className="text-2xl font-bold text-green-700">¡Atención Agencias de Viaje!</h2>
          <button
            className="absolute top-2 right-2 text-green-700 hover:text-green-900"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
          </button>
          <div className="mt-4 mb-4">
            <div className="flex items-center mb-2">
              <Briefcase className="text-green-600 mr-2" />
              <span className="text-gray-600">Vende nuestra asistencia de viaje premium</span>
            </div>
            <div className="flex items-center mb-2">
              <DollarSign className="text-green-600 mr-2" />
              <span className="text-gray-600">
                Obtén un{' '}
                <span className="font-bold text-green-700">40% de comisión</span>
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="tu@email.com"
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:border-green-500 focus:ring-green-500"
            />
            <button className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300">
              Solicita una visita
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}