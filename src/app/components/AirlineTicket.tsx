// AirlineTicket.tsx

import React from 'react';
import { Plane, Calendar, Users, DollarSign, MapPin } from 'lucide-react';

interface TicketProps {
  plan: string;
  price: string;
  destination: string;
  duration: number;
  passengers: number;
  onClick: () => void;      // Agregada
  isSelected: boolean;      // Agregada
}

const AirlineTicket: React.FC<TicketProps> = ({
  plan,
  price,
  destination,
  duration,
  passengers,
  onClick,
  isSelected,
}) => {
  // Función para mostrar el nombre del plan
  const planDisplayName = (plan: string) => {
    switch (plan) {
      case 'Inter60':
        return 'INTER 60';
      case 'Inter100':
        return 'INTER 100';
      case 'Inter200':
        return 'INTER 200';
      default:
        return plan;
    }
  };

  return (
    <div
      onClick={onClick} // Añadido para manejar el clic
      className={`w-full max-w-sm mx-auto bg-gradient-to-r from-green-50 to-emerald-50 rounded-md overflow-hidden shadow-md border mb-5 relative cursor-pointer ${
        plan === 'Inter100' ? 'ticket-aura-silver' : plan === 'Inter200' ? 'ticket-aura-gold' : ''
      } ${isSelected ? 'border-green-500' : 'border-green-200'}`} // Estilos condicionales para el borde
    >
      {plan !== 'Inter60' && (
        <div
          className={`absolute -top-4.5 -right-1 z-10 ${
            plan === 'Inter100' ? 'bg-gray-500' : 'bg-yellow-500'
          } text-white text-[9px] font-bold py-0.5 px-1.5 rounded-full shadow-md transform rotate-12`}
        >
          {plan === 'Inter100' ? 'Popular' : 'Premium'}
        </div>
      )}
      <div className="flex">
        {/* Sección principal */}
        <div className={`flex-grow p-2.5 space-y-1.5 ${isSelected ? 'bg-green-100' : ''}`}>
          <div className="flex justify-between items-center">
            <h3 className="text-[14px] font-bold text-emerald-800">
              {planDisplayName(plan)}
            </h3>
            <div className="text-right">
              <p className="text-[11px] font-semibold">Nº de Cotización</p>
              <p className="text-[10px] text-emerald-800">
                CTZ-2023-{Math.floor(Math.random() * 100000)}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center border-b border-green-200 pb-1.5">
            <div className="flex items-center">
              <MapPin className="text-emerald-500 w-3.5 h-3.5 mr-1" />
              <div>
                <p className="font-semibold text-[10px]">Origen</p>
                <p className="text-[9px] text-gray-600">Tu Ciudad</p>
              </div>
            </div>
            <Plane className="text-emerald-500 w-4.5 h-4.5 transform rotate-90" />
            <div className="flex items-center">
              <MapPin className="text-emerald-500 w-3.5 h-3.5 mr-1" />
              <div>
                <p className="font-semibold text-[10px]">Destino</p>
                <p className="text-[9px] text-gray-600">{destination}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Calendar className="text-emerald-500 w-3.5 h-3.5 mr-1" />
              <span className="text-[9.5px] text-gray-700">
                {duration} días de asistencia
              </span>
            </div>
            <div className="flex items-center">
              <Users className="text-emerald-500 w-3.5 h-3.5 mr-1" />
              <span className="text-[9.5px] text-gray-700">{passengers} pasajeros</span>
            </div>
          </div>

          <div className="mt-2.5 pt-1.5 border-t border-green-200">
            <div className="flex items-center justify-center">
              <DollarSign className="text-emerald-600 w-5.5 h-5.5 mr-1" />
              <span className="text-[18px] font-bold text-emerald-800">
                {price}
              </span>
            </div>
          </div>
        </div>

        {/* Sección de corte */}
        <div className="w-4.5 bg-white flex flex-col items-center justify-between py-1">
          <div className="w-4.5 h-4.5 rounded-full bg-green-100 -ml-2.5"></div>
          <div className="border-dashed border-l-2 border-green-300 h-full"></div>
          <div className="w-4.5 h-4.5 rounded-full bg-green-100 -ml-2.5"></div>
        </div>

        {/* Sección de talón */}
        <div className={`w-1/4 bg-green-100 p-2.5 flex flex-col justify-between ${isSelected ? 'bg-green-100' : 'bg-green-50'}`}>
          <div>
            <p className="text-[9.5px] font-semibold text-emerald-800 mb-1">Pasajero(s)</p>
            <p className="text-[9.5px] text-gray-600">{passengers}</p>
          </div>
          <div>
            <p className="text-[9.5px] font-semibold text-emerald-800 mb-1">Duración</p>
            <p className="text-[9.5px] text-gray-600">{duration} días</p>
          </div>
          <div>
            <p className="text-[9.5px] font-semibold text-emerald-800 mb-1">Destino</p>
            <p className="text-[9.5px] text-gray-600">{destination}</p>
          </div>
          {/* Puedes decidir mostrar el código de barras si ahora hay espacio */}
        </div>
      </div>
    </div>
  );
};

export default AirlineTicket;
