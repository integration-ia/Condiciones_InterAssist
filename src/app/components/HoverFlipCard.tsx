"use client";

import React, { useState } from "react";

const HoverFlipCard: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false); // Controla si la tarjeta está volteada
  const [isExpanded, setIsExpanded] = useState(false); // Controla si la tarjeta está expandida

  // Maneja el clic para voltear la tarjeta
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  // Maneja la expansión de la tarjeta
  const handleExpand = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Evita que se vuelva a voltear la tarjeta al expandir
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="container flex justify-center items-center mt-8">
      <div
        className={`inner-container relative w-72 h-72 transform transition-all duration-500 ease-in-out perspective ${
          isExpanded ? "w-96 h-96" : ""
        }`} // Cambia el tamaño si está expandida
        onClick={handleClick} // Cambia el estado cuando se hace clic
      >
        <div
          className={`main relative w-full h-full transition-transform duration-500 ease-in-out transform-style-preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front side */}
          <div className="front absolute w-full h-full bg-white shadow-lg rounded-2xl flex justify-center items-center backface-hidden">
            <h3 className="text-3xl font-light text-gray-500">Beach</h3>
          </div>

          {/* Back side */}
          <div className="back absolute w-full h-full bg-white shadow-lg rounded-2xl transform rotate-y-180 flex flex-col items-center justify-center backface-hidden">
            <h3 className="text-3xl font-light text-gray-500 mb-4">More Info</h3>
            {/* Pequeño listado */}
            <ul className="text-sm list-disc list-inside mb-4">
              <li>Info 1</li>
              <li>Info 2</li>
              <li>Info 3</li>
            </ul>

            {/* Botón para expandir */}
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleExpand}
            >
              {isExpanded ? "-" : "+"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoverFlipCard;