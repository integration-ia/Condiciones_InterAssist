// /utils/calculateQuotes.ts
interface TravelDetails {
    passengers: number;
    ages: number[];
    destination: string;
    duration: number;
  }
  
  type PlanName = 'Inter60' | 'Inter100' | 'Inter200';
  
  export const calculateQuotes = ({ passengers, ages, destination, duration }: TravelDetails) => {
    let basePrice = 100; // Precio base por pasajero
    let destinationMultiplier = 1;
  
    if (destination.toLowerCase() === 'europa') {
      destinationMultiplier = 1.5;
    }
  
    const plans: Record<PlanName, number> = {
      Inter60: 60,
      Inter100: 100,
      Inter200: 200,
    };
  
    let quotes: { plan: PlanName; price: string }[] = [];
  
    for (const planName of Object.keys(plans) as PlanName[]) {
      let coverageMultiplier = plans[planName] / 100;
      let totalPrice = ages.reduce((acc: number, age: number) => {
        let ageMultiplier = age > 50 ? 1.2 : 1.0;
        return acc + basePrice * destinationMultiplier * ageMultiplier * coverageMultiplier;
      }, 0);
  
      totalPrice *= duration;
  
      quotes.push({ plan: planName, price: totalPrice.toFixed(2) });
    }
  
    return quotes;
  };
  