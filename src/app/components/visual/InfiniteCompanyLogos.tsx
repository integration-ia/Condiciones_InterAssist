import React from 'react';
import Image from 'next/image'; // Importamos el componente Image de Next.js

const companies = [
  { name: 'Company A', logo: '/images/logo-fechabus.png' },
  { name: 'Company B', logo: '/images/logo-fechabus.png' },
  { name: 'Company C', logo: '/images/logo-fechabus.png' },
  { name: 'Company D', logo: '/images/logo-fechabus.png' },
  { name: 'Company E', logo: '/images/logo-fechabus.png' },
  { name: 'Company F', logo: '/images/logo-fechabus.png' },
  { name: 'Company G', logo: '/images/logo-fechabus.png' },
  { name: 'Company H', logo: '/images/logo-fechabus.png' },
];

export default function InfiniteCompanyLogos() {
  return (
    <div className="py-12 overflow-visible relative z-10">
      {/* Aseguramos que el contenedor sea visible */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8 relative z-10">
          Empresas que nos eligen
        </h2>
        <div className="relative z-10">
          <div className="flex overflow-hidden relative z-10">
            <div className="flex animate-marquee relative z-10">
              {companies.concat(companies).map((company, index) => (
                <div key={index} className="flex items-center justify-center w-[200px] h-[100px] mx-4 relative z-10">
                  <Image
                    src={company.logo}
                    alt={`Logo de ${company.name}`}
                    width={200} // Ajusta el ancho de la imagen
                    height={100} // Ajusta la altura de la imagen
                    className="object-contain relative z-10"
                  />
                </div>
              ))}
            </div>
            <div className="flex  top-0 animate-marquee2  z-10">
              {companies.concat(companies).map((company, index) => (
                <div key={index} className="flex items-center justify-center w-[200px] h-[100px] mx-4 relative z-10">
                  <Image
                    src={company.logo}
                    alt={`Logo de ${company.name}`}
                    width={200} // Ajusta el ancho de la imagen
                    height={100} // Ajusta la altura de la imagen
                    className="object-contain relative z-10"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
