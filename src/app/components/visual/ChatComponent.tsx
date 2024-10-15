"use client";
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

// Definir un tipo para los detalles del viaje
interface TravelDetails {
    passengers: number;
    ages: number[];
    destination: string;
    duration: number;
}

interface Message {
    text: string;
    isUser: boolean;
}

export default function ChatComponent() {
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { text: "¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?", isUser: false }
    ]);
    const [loading, setLoading] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false); // Para abrir/cerrar el chat
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

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
            const res = await axios.post('/api/gpt', {
                prompt: `
                  Analiza el siguiente mensaje del usuario y extrae la siguiente información necesaria para cotizar un viaje:
                  - Número de pasajeros (passengers)
                  - Edades de los pasajeros (ages)
                  - Destino del viaje (destination)
                  - Duración del viaje en días (duration)
                  
                  Mensaje del usuario: "${prompt}"
                  
                  **Instrucciones:**
                  - Si toda la información está presente, responde **únicamente** con el JSON que contiene las claves "passengers", "ages", "destination" y "duration". No agregues texto adicional fuera del JSON.
                  - Si falta alguna información (total o parcial), responde con un mensaje claro y amigable que indique exactamente qué información falta y solicita al usuario que la proporcione. No incluyas ningún JSON en este caso.
                `
              });
    
            const gptResponse = res.data.completion;
    
            // Intentar extraer JSON de la respuesta
            let jsonResponse;
            try {
                const jsonMatch = gptResponse.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    jsonResponse = JSON.parse(jsonMatch[0]);
                } else {
                    // No se encontró JSON, mostrar el mensaje al usuario
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { text: gptResponse.trim(), isUser: false }
                    ]);
                    setLoading(false);
                    return;
                }
    
                const { passengers, ages, destination, duration } = jsonResponse;
    
                if (!passengers || !ages || !destination || !duration) {
                    // Falta información
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { text: 'Falta información para realizar la cotización. Por favor, proporciona todos los datos necesarios.', isUser: false }
                    ]);
                    setLoading(false);
                    return;
                }
    
                if (ages.length !== passengers) {
                    // La cantidad de edades no coincide con el número de pasajeros
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { text: 'El número de edades proporcionadas no coincide con la cantidad de pasajeros. Por favor, verifica esta información.', isUser: false }
                    ]);
                    setLoading(false);
                    return;
                }
    
                // Continuar con el cálculo de la cotización
                const quote = calculateQuote(jsonResponse);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: `La cotización para tu viaje es: ${quote} USD.`, isUser: false }
                ]);
    
            } catch (parseError) {
                // Manejar error de parseo
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: 'No se pudo procesar la información. Por favor, verifica los datos proporcionados.', isUser: false }
                ]);
            }
    
        } catch (error) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: 'Hubo un error al procesar tu solicitud. Por favor, intenta de nuevo más tarde.', isUser: false }
            ]);
        } finally {
            setLoading(false);
        }
    };


    // Mostrar/ocultar el chat al hacer clic en el ícono
    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
        if (!isChatOpen) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: 'Estas buscando una cotización?', isUser: false }
            ]);
        }
    };

    return (
        <div>
            {/* Icono flotante del chat */}
            <div
                onClick={toggleChat}
                className="fixed bottom-4 right-4 bg-blue-500 rounded-full p-4 cursor-pointer shadow-lg"
                style={{ width: '70px', height: '70px' }}
            >
                <img
                    src="images/chatbot.png" // Reemplaza esto con el icono que desees usar
                    alt="Chat Icon"
                    className="w-full h-full"
                />
            </div>

            {/* Ventana del chat estilo WhatsApp */}
            {isChatOpen && (
                <div className="fixed bottom-16 right-4 w-full max-w-md mx-auto shadow-2xl border-0 bg-gray-100 rounded-3xl overflow-hidden z-50">
                    <div className="bg-gray-800 text-white p-4">
                        <h1 className="text-xl font-semibold flex items-center space-x-2">
                            <span>Asistente Virtual</span>
                        </h1>
                    </div>
                    <div className="p-0 bg-[url('/whatsapp-bg.png')] bg-repeat h-[400px] w-full p-4 overflow-y-auto">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex items-end space-x-2 mb-4 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                            >
                                {!message.isUser && (
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center shadow-md">
                                        <span>🤖</span>
                                    </div>
                                )}
                                <div className={`max-w-[70%] p-3 rounded-lg ${message.isUser ? 'bg-gray-300 text-gray-800' : 'bg-white text-gray-800'} shadow-md`}>
                                    <p className="text-sm">{message.text}</p>
                                </div>
                                {message.isUser && (
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center shadow-md">
                                        <span>👤</span>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="border-t border-gray-200 p-4 bg-gray-100">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setMessages((prevMessages) => [
                                    ...prevMessages,
                                    { text: prompt, isUser: true }
                                ]);
                                handleSubmit(e);
                                setPrompt('');
                            }}
                            className="flex items-center space-x-2"
                        >
                            <input
                                type="text"
                                placeholder="Escribe tu mensaje..."
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className="flex-grow bg-white border-gray-300 rounded-full p-2 text-gray-700"
                            />
                            <button
                                type="submit"
                                className="bg-gray-800 text-white p-2 rounded-full"
                                disabled={loading}
                            >
                                {loading ? '...' : 'Enviar'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
