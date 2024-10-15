"use client";
import { useState } from 'react';
import axios from 'axios';

// Definir un tipo para los detalles del viaje
interface TravelDetails {
    passengers: number;
    ages: number[];
    destination: string;
    duration: number;
}

export default function ChatComponent() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false); // Para abrir/cerrar el chat

    // Función para extraer los detalles del viaje del input del usuario
    const extractTravelDetails = (userInput: string): TravelDetails => {
        const passengerMatch = userInput.match(/(\d+)\s*personas/);
        const ageMatch = userInput.match(/(\d+)\s*años/g);
        const durationMatch = userInput.match(/(\d+)\s*días/);
        const destinationMatch = userInput.match(/en\s+([a-zA-Z\s]+)/);

        const ages = ageMatch ? ageMatch.map(age => parseInt(age.match(/\d+/)![0])) : [];

        return {
            passengers: passengerMatch ? parseInt(passengerMatch[1]) : 1,
            ages: ages,
            destination: destinationMatch ? destinationMatch[1].trim() : 'desconocido',
            duration: durationMatch ? parseInt(durationMatch[1]) : 1,
        };
    };

    // Función para calcular la cotización del viaje
    const calculateQuote = ({ passengers, ages, destination, duration }: TravelDetails): string => {
        let basePrice = 100; // Precio base por pasajero
        let destinationMultiplier = 1;

        if (destination.toLowerCase() === 'europa') {
            destinationMultiplier = 1.5;
        }

        let totalPrice = ages.reduce((acc: number, age: number) => {
            let ageMultiplier = age > 50 ? 1.2 : 1.0;
            return acc + basePrice * destinationMultiplier * ageMultiplier;
        }, 0);

        totalPrice *= duration;

        return totalPrice.toFixed(2); // Precio final con dos decimales
    };

    // Manejador para enviar el prompt a la API y capturar los datos del usuario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
      
        try {
          // Enviar el mensaje del usuario a la API de OpenAI
          const res = await axios.post('/api/gpt', {
            prompt: `
              Analiza el siguiente mensaje del usuario y extrae la siguiente información necesaria para cotizar un viaje:
              - Número de pasajeros
              - Edades de los pasajeros
              - Destino del viaje
              - Duración del viaje en días
              
              Mensaje del usuario: "${prompt}"
              
              Si falta alguna de estas informaciones, responde indicando de manera clara y amigable qué información falta.
              Si toda la información está presente, devuélvela en formato JSON con las claves "passengers", "ages", "destination", y "duration".
            `
          });
      
          const gptResponse = res.data.completion;
      
          // Verificar si la respuesta es un JSON con los datos correctos
          try {
            const extractedData = JSON.parse(gptResponse);
      
            // Si el JSON contiene todos los atributos, calculamos la cotización
            if (extractedData.passengers && extractedData.ages && extractedData.destination && extractedData.duration) {
              const quote = calculateQuote(extractedData);
              setResponse(`La cotización para tu viaje es: ${quote} USD.`);
            } else {
              // Si el JSON está incompleto, mostramos un mensaje
              setResponse('Falta información para calcular la cotización. Por favor, completa los detalles.');
            }
          } catch (parseError) {
            // Si no es un JSON válido, es un mensaje que indica que faltan datos
            setResponse(gptResponse); // Mostrar el mensaje amigable que indica qué datos faltan
          }
      
        } catch (error) {
          // Manejo del error de la solicitud a OpenAI (fallo en la API o la solicitud)
          setResponse('Hubo un error al procesar tu solicitud. Por favor, intenta de nuevo más tarde.');
        }
      
        setLoading(false);
      };

    // Mostrar/ocultar el chat al hacer clic en el ícono
    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
        if (!isChatOpen) {
            // Lanzar un mensaje inicial
            setResponse('Hola! ¿Cómo puedo ayudarte a cotizar tu viaje?');
        }
    };

    return (
        <div >
            {/* Icono flotante del chat */}
            <div
                onClick={toggleChat}
                className="fixed bottom-4 right-4 bg-blue-500 rounded-full p-4 cursor-pointer shadow-lg "
                style={{ width: '70px', height: '70px' }}
            >
                <img
                    src="images/chatbot.png" // Reemplaza esto con el icono que desees usar
                    alt="Chat Icon"
                    className="w-full h-full"
                />
            </div>

            {/* Ventana del chat */}
            {isChatOpen && (
                <div
                    className="fixed bottom-16 right-4 bg-white border border-gray-300 shadow-lg rounded-lg w-96 p-4"
                    style={{ zIndex: 100 }} // Agrega z-index aquí para asegurarte de que esté por encima
                >
                    <h1 className="text-xl mb-4 text-black">Cotizador de Asistencia al Viajero</h1>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Escribe los detalles de tu viaje..."
                            rows={4}
                            className="w-full p-2 border border-gray-300 text-black"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 mt-2 w-full"
                            disabled={loading}
                        >
                            {loading ? 'Calculando...' : 'Enviar'}
                        </button>
                    </form>

                    {response && (
                        <div className="mt-4 p-4 border border-gray-500">
                            <h2 className="text-lg text-black">Respuesta:</h2>
                            <p className="text-lg text-black">{response}</p>
                        </div>
                    )}
                </div>
            )}

        </div>
    );
}
