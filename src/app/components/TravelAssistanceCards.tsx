'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image'; 

// Importa las imágenes
import Mochila from '../../../public/images/Mochila.png';
import Avion from '../../../public/images/avion.png';
import BoletoDorado from '../../../public/images/boletodorado.png';
import Mascota from '../../../public/images/f4d38af8-d798-432c-b193-17e8d5285174.webp';

export default function TravelAssistanceCards() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (event.clientX - left - width / 2) / 30;
        const y = -(event.clientY - top - height / 2) / 10;
        setMousePosition({ x, y });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const cards = [
    { 
      title: 'Inter 60', 
      description: 'Cobertura básica para viajes cortos', 
      image: Mochila, 
      backContent: (
        <ul className="text-left">
          <li>✔ Cobertura máxima: <strong>$60,000 USD</strong></li>
          <li>✔ Atención médica básica, primeros auxilios</li>
          <li>✔ Repatriación sanitaria incluida</li>
          <li>✔ Ejemplo: Tratamiento de una intoxicación leve</li>
          <li>✔ Pérdida de equipaje: <strong>$600 USD</strong></li>
        </ul>
      ),
      gradient: 'from-emerald-400 to-teal-600',
      shape: 'M0,20 L100,0 L100,85 C75,110 50,85 0,100 Z'
    },
    { 
      title: 'Inter 100', 
      description: 'Protección estándar para viajeros', 
      image: Avion, 
      backContent: (
        <ul className="text-left">
          <li>✔ Cobertura máxima: <strong>$100,000 USD</strong></li>
          <li>✔ Atención médica extendida, hospitalizaciones cortas</li>
          <li>✔ Repatriación y evacuación de emergencia</li>
          <li>✔ Ejemplo: Tratamiento por fractura durante una actividad recreativa</li>
          <li>✔ Pérdida de equipaje: <strong>$1,200 USD</strong></li>
        </ul>
      ),
      gradient: 'from-blue-400 to-indigo-600',
      shape: 'M0,35 C25,15 75,15 100,35 L100,100 C75,85 25,85 0,100 Z'
    },
    { 
      title: 'Inter 200', 
      description: 'Cobertura premium para viajes extensos', 
      image: BoletoDorado, 
      backContent: (
        <ul className="text-left">
          <li>✔ Cobertura máxima: <strong>$200,000 USD</strong></li>
          <li>✔ Incluye cobertura para multiviajes</li>
          <li>✔ Atención médica completa y hospitalizaciones largas</li>
          <li>✔ Ejemplo: Cirugía de emergencia en un viaje largo</li>
          <li>✔ Pérdida de equipaje: <strong>$2,000 USD</strong></li>
        </ul>
      ),
      gradient: 'from-purple-400 to-pink-600',
      shape: 'M0,20 C25,45 75,45 100,20 L100,100 L0,100 Z'
    },
    { 
      title: 'Inter Mascotas', 
      description: 'Cuidado especial para tus compañeros peludos', 
      image: Mascota, 
      backContent: (
        <ul className="text-left">
          <li>✔ Cobertura máxima para mascotas: <strong>$10,000 USD</strong></li>
          <li>✔ Atención veterinaria en emergencias</li>
          <li>✔ Cobertura de transporte y cancelaciones que afecten al animal</li>
          <li>✔ Ejemplo: Tratamiento por intoxicación de tu mascota</li>
        </ul>
      ),
      gradient: 'from-orange-400 to-red-600',
      shape: 'M0,20 L100,0 L100,100 C50,80 30,100 0,80 Z'
    }
  ];

  const handleFlip = (index: number) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-r from-white to-slate-100 flex flex-col items-center justify-center font-sans text-gray-800 p-8 my-20">
      
      {/* Título centrado */}
      <h2 className="text-4xl font-bold text-center mb-12 text-green-800 my-8">
        Una asistencia para cada viaje
      </h2>
  
      {/* Contenedor de tarjetas */}
      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {cards.map((card, index) => (
          <div
            key={index}
            className="perspective w-[270px] mt-8"
            style={{ perspective: '1000px' }}
            onClick={() => handleFlip(index)}
          >
            <div
              className={`relative w-[270px] h-[413px] rounded-lg shadow-lg transform-gpu transition-transform duration-500 ease-linear bg-white ${flippedIndex === index ? 'rotate-y-180' : ''}`}
              style={{
                transform: flippedIndex !== index ? `rotateY(${mousePosition.x}deg) rotateX(${mousePosition.y}deg)` : '',
              }}
            >
              {/* Front side */}
              <div className={`absolute w-full h-full rounded-lg shadow-lg backface-hidden ${flippedIndex === index ? 'hidden' : 'block'}`}>
                <div className="relative w-full h-full">
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                    <defs>
                      <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%">
                        <stop offset="0%" stopColor="#34D399" /> {/* Verde inicial */}
                        <stop offset="30%" stopColor="#6EE7B7" /> {/* Verde claro */}
                        <stop offset="100%" stopColor="#FFFFFF" /> {/* Blanco */}
                      </linearGradient>
                    </defs>
                    <path d={card.shape} fill={`url(#gradient-${index})`} />
                  </svg>
                  <div className="flex justify-center items-center h-full z-10 relative">
                    <div className="w-40 h-40 rounded-full overflow-hidden bg-white border-4 border-gray-200 flex items-center justify-center mb-4">
                      <Image
                        src={card.image}
                        alt={card.title}
                        className="object-cover"
                        width={160}
                        height={160}
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 left-0 bg-green-500 text-white py-2 px-4 rounded-tl-lg rounded-br-lg shadow-md transform -rotate-6 z-10">
                  <h2 className="text-xl font-bold">{card.title}</h2>
                </div>
                <span className="absolute bottom-4 right-4 text-lg font-semibold max-w-[200px] text-right">
                  {card.description}
                </span>
              </div>
  
              {/* Back side */}
              <div className={`absolute w-full h-full rounded-lg shadow-lg transform rotate-y-180 flex flex-col items-center justify-center p-4 bg-white ${flippedIndex === index ? 'block' : 'hidden'}`}>
                <div className="absolute top-0 left-0 bg-green-500 text-white py-2 px-4 rounded-tl-lg rounded-br-lg shadow-md transform -rotate-6 z-10">
                  <h2 className="text-xl font-bold">{card.title}</h2>
                </div>
                <div className="text-gray-600 mt-6">
                  {card.backContent}
                </div>
                <button className="mt-4 px-4 py-2 text-gray-800 rounded-lg" onClick={() => handleFlip(index)}>
                  
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
  