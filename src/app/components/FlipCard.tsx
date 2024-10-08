"use client";

import React, { useState, useEffect, useRef } from "react";

// Paleta de colores ajustada, con tonos más suaves y un celeste
const colorPalette = [
  "#b2dfdb", // Verde claro suave
  "#e0f7fa", // Celeste claro
  "#80cbc4", // Turquesa suave
  "#aed581", // Verde amarillento suave
  "#b3e5fc", // Celeste más fuerte
];

// Función para generar un gradiente aleatorio basado en la paleta
const getRandomGradient = () => {
  const color1 = colorPalette[Math.floor(Math.random() * colorPalette.length)];
  const color2 = colorPalette[Math.floor(Math.random() * colorPalette.length)];
  return `linear-gradient(to bottom right, ${color1}, ${color2})`;
};

interface FlipCardProps {
  title: string;
  info: string;
  category: string;
  moreinfo: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ title, info, category, moreinfo }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [cardHeight, setCardHeight] = useState("15rem"); // Altura inicial fija
  const backRef = useRef<HTMLDivElement>(null); // Referencia para medir el lado trasero

  useEffect(() => {
    // Ajusta la altura de la tarjeta cuando está volteada
    if (isFlipped && backRef.current) {
      const backHeight = backRef.current.scrollHeight;
      setCardHeight(`${backHeight + 20}px`); // Ajusta la altura del lado trasero con un pequeño margen
    } else {
      setCardHeight("15rem"); // Altura del lado frontal
    }
  }, [isFlipped]);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleExpand = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsExpanded(true); // Abre el modal
  };

  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsExpanded(false); // Cierra el modal al hacer clic afuera
    }
  };

  // Generamos un gradiente aleatorio para cada tarjeta al renderizarla
  const gradient = getRandomGradient();

  return (
    <div className="container flex justify-center items-center mt-8">
      <div
        className={`relative w-full transition-all duration-500 ease-in-out perspective`}
        style={{
          height: cardHeight,
          perspective: "1000px",
          background: "#fff", // Fondo blanco fuera de la tarjeta
          borderRadius: "1rem", // Forma redondeada
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Sombra
        }}
        onClick={handleClick}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 ease-in-out transform-style-preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
        >
          {/* Front side */}
          <div
            className={`absolute w-full h-full shadow-lg rounded-2xl flex justify-center items-center backface-hidden`}
            style={{
              background: gradient, // Mantén el gradiente en el front
              backfaceVisibility: "hidden", // Ocultar el back cuando está volteado
              borderRadius: "1rem", // Asegura bordes redondeados
            }}
          >
            <h3 className="text-2xl font-bold text-gray-600 text-center px-4">{title}</h3>
            <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-semibold text-teal-700 shadow-md">
              {category}
            </div>
          </div>

          {/* Back side */}
          <div
            ref={backRef} // Referencia para medir la altura del lado trasero
            className="absolute w-full shadow-lg rounded-2xl transform rotate-y-180 flex flex-col items-center justify-center backface-hidden p-6"
            style={{
              background: "#fff", // Fondo blanco para el backside
              backfaceVisibility: "hidden", // Ocultar el frente cuando está volteado
              borderRadius: "1rem", // Bordes redondeados
            }}
          >
            <h3 className="text-2xl font-bold text-gray-600 text-center mb-7"></h3>
            <ul className="text-gray-600 text-sm space-y-2">
              {info.split("\n").map((line, index) => {
                const [label, value] = line.split(":");

                // Evitar líneas vacías y solo agregar ':' cuando hay valor
                if (!label?.trim()) return null;

                return (
                  <li key={index}>
                    <span className="font-bold">
                      {label.trim()}
                      {value ? ":" : ""}
                    </span>{" "}
                    {value && <span>{value.trim()}</span>}
                  </li>
                );
              })}
            </ul>
            <button
  className="mt-4 flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full shadow"
  onClick={handleExpand}
>
  {/* Texto de Leer más */}
  <span>Leer más</span>

  {/* Icono de + en un círculo */}
  <span className="flex justify-center items-center w-6 h-6 bg-gray-300 rounded-full text-lg font-bold">
    +
  </span>
</button>
          </div>
        </div>
      </div>

      {/* Modal (Pop-up) */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseModal} // Cerrar modal al hacer clic afuera
        >
          <div className="bg-white p-8 rounded-lg w-2/4 h-2/4 relative">
            <button
              className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full"
              onClick={() => setIsExpanded(false)} // Cerrar modal al hacer clic en la cruz
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-8 mt-8">{title} - Información detallada</h2>
            <p className="text-gray-700 text-sm whitespace-pre-wrap mr-12">
              {moreinfo}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlipCard;
