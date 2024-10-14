'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image'; // Asegúrate de importar esto si estás usando Next.js

// Importa las imágenes si están en `public/images`
import Mochila from '../../../public/images/Mochila.png';
import Avion from '../../../public/images/avion.png';
import BoletoDorado from '../../../public/images/boletodorado.png';
import Mascota from '../../../public/images/f4d38af8-d798-432c-b193-17e8d5285174.webp';

export default function TravelAssistanceCards() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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
    { title: 'Inter 60', description: 'Cobertura básica para viajes cortos', image: Mochila },
    { title: 'Inter 100', description: 'Protección estándar para viajeros', image: Avion },
    { title: 'Inter 200', description: 'Cobertura premium para viajes extensos', image: BoletoDorado },
    { title: 'Inter Mascotas', description: 'Cuidado especial para tus compañeros peludos', image: Mascota },
  ];

  return (
    <div className=" bg-gradient-to-r from-white to-pink-100 flex items-center justify-center font-sans text-gray-800 p-8">
      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card, index) => (
          <div key={index} className="perspective w-[270px] mt-8">
            <div
              className="card relative w-[270px] h-[413px] rounded-lg shadow-lg transform-gpu transition-transform duration-50 ease-linear bg-white"
              style={{
                transform: `rotateY(${mousePosition.x}deg) rotateX(${mousePosition.y}deg)`,
              }}
            >
              <div className="flex justify-center items-center h-full">
              {/* Burbuja para la imagen */}
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
              <div className="absolute top-0 left-0 bg-green-500 text-white py-2 px-4 rounded-tl-lg rounded-br-lg shadow-md transform -rotate-6 z-10">
                <h2 className="text-xl font-bold">{card.title}</h2>
              </div>
              <span className="absolute bottom-4 right-4 text-lg font-semibold max-w-[200px] text-right">
                {card.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
