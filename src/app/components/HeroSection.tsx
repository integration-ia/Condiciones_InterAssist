import Image from "next/image";

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-64">
      <Image
        src="/images/travel-banner.jpg" // Asegúrate de que la imagen esté en la carpeta public/images
        alt="Asistencia al viajero"
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">InterAsisst &gt; Condiciones Generales</h1>
      </div>
    </section>
  );
};

export default HeroSection;
