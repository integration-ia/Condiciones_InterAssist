// /utils/calculateQuotes.ts

// Importamos el archivo JSON completo
import cityToContinent from '../../data/cityToContinent.json';

interface TravelDetails {
  passengers: number;
  ages: number[];
  destination: string;
  duration: number;
}

type PlanName = 'Inter60' | 'Inter100' | 'Inter200';

// Multiplicadores por continente
const continentMultipliers: Record<string, number> = {
  'América del Norte': 1.2,
  'América del Sur': 1.0,
  'Europa': 1.5,
  'Asia': 1.4,
  'África': 1.3,
  'Oceanía': 1.6,
  'Antártida': 2.0,
};

// Convertimos el JSON importado a un tipo tipado
const cityToContinentTyped: Record<string, string> = cityToContinent;

export const calculateQuotes = ({ passengers, ages, destination, duration }: TravelDetails) => {
  const basePrice = 100; // Precio base por pasajero

  // Obtener el continente a partir de la ciudad de destino
  const continent = cityToContinentTyped[destination]; // Ahora funciona correctamente

  // Si no se encuentra el continente en el JSON, asignar multiplicador por defecto (1.0)
  const destinationMultiplier = continentMultipliers[continent] || 1.0;

  const plans: Record<PlanName, number> = {
    Inter60: 60,
    Inter100: 100,
    Inter200: 200,
  };

  const quotes = (Object.keys(plans) as PlanName[]).map((planName) => {
    const coverageMultiplier = plans[planName] / 100;
    const totalPrice = ages.reduce((acc, age) => {
      const ageMultiplier = age > 50 ? 1.2 : 1.0;
      return acc + basePrice * destinationMultiplier * ageMultiplier * coverageMultiplier;
    }, 0) * duration;

    return { plan: planName, price: totalPrice.toFixed(2) };
  });

  return quotes;
};
