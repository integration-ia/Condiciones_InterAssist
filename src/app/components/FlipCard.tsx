"use client";

import React, { useState } from "react";

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
}

const FlipCard: React.FC<FlipCardProps> = ({ title, info,category }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleExpand = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  // Generamos un gradiente aleatorio para cada tarjeta al renderizarla
  const gradient = getRandomGradient();

  return (
    <div className="container flex justify-center items-center mt-8">
      <div
        className={`inner-container relative w-96 h-60 transform transition-all duration-500 ease-in-out perspective ${isExpanded ? "w-[28rem] h-72" : ""}`}
        onClick={handleClick}
        // Añadimos el efecto hover aquí
        style={{
          background: gradient,
          borderRadius: "1rem", // Aseguramos la forma redondeada
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Sombra normal
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        // Aquí aplicamos el hover
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-10px)";
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 8px 16px rgba(0, 0, 0, 0.2)"; // Sombra más marcada al hacer hover
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 4px 8px rgba(0, 0, 0, 0.1)"; // Volvemos a la sombra normal
        }}
      >
        <div
          className={`main relative w-full h-full transition-transform duration-500 ease-in-out transform-style-preserve-3d ${isFlipped ? "rotate-y-180" : ""
            }`}
        >
          {/* Front side */}
          <div className={`front absolute w-full h-full shadow-lg rounded-2xl flex justify-center items-center backface-hidden`}
               style={{ background: gradient }} // Aplicamos el gradiente dinámico
          >
            <h3 className="text-2xl font-bold text-gray-600 text-center px-4">
              {title}
            </h3>
            <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-semibold text-teal-700 shadow-md">
                    {category}
            </div>
          </div>

          {/* Back side */}
          <div className="back absolute w-full h-full shadow-lg rounded-2xl transform rotate-y-180 flex flex-col items-center justify-center backface-hidden p-6"
               style={{ background: gradient }} // Aplicamos el mismo gradiente
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
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
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

export default FlipCard;
