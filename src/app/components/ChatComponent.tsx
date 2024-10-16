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
        { text: "¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy? Puedo cotizar un viaje, modificar una asistencia emitida o dar de baja una asistencia emitida. Por favor, escribe 'Cotizar', 'Modificar' o 'Eliminar'.", isUser: false }
    ]);
    const [loading, setLoading] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false); // Para abrir/cerrar el chat
    const [conversationStage, setConversationStage] = useState('initial'); // Control del flujo conversacional
    const [modificarData, setModificarData] = useState<{ idCobertura?: string; dni?: string }>({});
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Guardar los detalles del viaje
    const [travelDetails, setTravelDetails] = useState<TravelDetails | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Función para calcular las cotizaciones del viaje
    const calculateQuotes = ({ passengers, ages, destination, duration }: TravelDetails) => {
        let basePrice = 100; // Precio base por pasajero
        let destinationMultiplier = 1;

        if (destination.toLowerCase() === 'europa') {
            destinationMultiplier = 1.5;
        }

        const plans = {
            Inter60: 60,
            Inter100: 100,
            Inter200: 200,
        };

        type PlanName = keyof typeof plans;

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

    // Función para manejar la entrada del usuario según la etapa de la conversación
    const handleUserInput = (input: string) => {
        switch (conversationStage) {
            case 'initial':
                handleInitialChoice(input);
                break;
            case 'cotizar':
                handleCotizar(input);
                break;
            case 'cotizar_confirm':
                handleCotizarConfirm(input);
                break;
            case 'modificar':
                handleModificar(input);
                break;
            // Puedes añadir más casos para 'eliminar' u otras etapas
            default:
                break;
        }
    };

    // Manejar la elección inicial del usuario
    const handleInitialChoice = (input: string) => {
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes('cotizar')) {
            setConversationStage('cotizar');
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: 'Para cotizar necesito:\n- Cantidad de pasajeros\n- Edad de pasajeros\n- Días de viaje\n- Destino', isUser: false }
            ]);
        } else if (lowerInput.includes('modificar')) {
            setConversationStage('modificar');
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: 'Para modificar una asistencia es necesario que me brindes el número de identificación de la cobertura y tu número de DNI.', isUser: false }
            ]);
        } else if (lowerInput.includes('eliminar')) {
            setConversationStage('eliminar');
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: 'Para dar de baja una asistencia es necesario que me brindes el número de identificación de la cobertura y tu número de DNI.', isUser: false }
            ]);
        } else {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: 'Por favor, elige una de las opciones: "Cotizar", "Modificar" o "Eliminar".', isUser: false }
            ]);
        }
    };

    // Manejador para cotizar
    const handleCotizar = async (input: string) => {
        setLoading(true);

        try {
            const res = await axios.post('/api/gpt', {
                prompt: `
                  Analiza el siguiente mensaje del usuario y extrae la siguiente información necesaria para cotizar un viaje:
                  - Número de pasajeros (passengers)
                  - Edades de los pasajeros (ages)
                  - Destino del viaje (destination)
                  - Duración del viaje en días (duration)
                  
                  Mensaje del usuario: "${input}"
                  
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

                // Guardar los detalles del viaje
                const travelData = { passengers, ages, destination, duration };
                setTravelDetails(travelData);

                // Calcular las cotizaciones
                const quotes = calculateQuotes(travelData);

                // Generar el mensaje con consejos utilizando la API de OpenAI
                const adviceRes = await axios.post('/api/gpt', {
                    prompt: `
                      Eres un agente de viajes virtual. Tienes las siguientes cotizaciones para ofrecer al cliente:

                      ${quotes.map(q => `- **${q.plan}**: ${q.price} USD`).join('\n')}

                      Proporciona información sobre cada producto de manera estructurada y clara, utilizando viñetas o puntos separados para cada plan. Recomienda al cliente el plan **${quotes[2].plan}**, destacando sus beneficios y por qué es la mejor opción. No menciones que es el más caro, sino enfócate en el valor que ofrece.

                      **Instrucciones:**
                      - Responde en un tono amable y profesional.
                      - Utiliza formato Markdown para mejorar la legibilidad (negritas, viñetas, etc.).
                      - No incluyas información adicional fuera de lo solicitado.
                    `,
                    // Aumentar max_tokens si es necesario
                    max_tokens: 500,
                });

                const advice = adviceRes.data.completion;

                // Añadir el mensaje de consejo al chat
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: advice.trim(), isUser: false }
                ]);

                // Añadir la pregunta en una burbuja separada
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: '¿Te gustaría avanzar con alguna de estas cotizaciones?', isUser: false }
                ]);

                // Cambiar la etapa de la conversación
                setConversationStage('cotizar_confirm');

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

    // Manejador para la confirmación de cotización
    const handleCotizarConfirm = (input: string) => {
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes('sí') || lowerInput.includes('si')) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: '¡Excelente! Por favor, proporciona tus datos personales para continuar con la contratación.', isUser: false }
            ]);
            // Cambiar a la siguiente etapa si es necesario
        } else if (lowerInput.includes('no')) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: 'Entiendo. Si necesitas más información o tienes alguna otra consulta, estoy aquí para ayudarte.', isUser: false }
            ]);
            setConversationStage('initial'); // Reiniciar la conversación si lo deseas
        } else {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: 'Por favor, indícame si deseas avanzar con alguna de las cotizaciones.', isUser: false }
            ]);
        }
    };

    // Manejador para modificar (sin cambios)
    const handleModificar = async (input: string) => {
        // Tu lógica existente para manejar 'modificar'
    };

    // Mostrar/ocultar el chat al hacer clic en el ícono
    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
        if (!isChatOpen) {
            // Reiniciar el chat al abrirlo
            setMessages([
                { text: "¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy? Puedo cotizar un viaje, modificar una asistencia emitida o dar de baja una asistencia emitida. Por favor, escribe 'Cotizar', 'Modificar' o 'Eliminar'.", isUser: false }
            ]);
            setConversationStage('initial');
            setTravelDetails(null);
        }
    };

    // Renderizar mensajes con formato Markdown
    const renderMessageText = (text: string) => {
        // Opcional: Puedes utilizar una librería como 'react-markdown' para renderizar Markdown
        // Por simplicidad, aquí reemplazamos algunos caracteres para simular formato
        return text
            .split('\n')
            .map((line, index) => (
                <p key={index} style={{ margin: 0 }}>
                    {line}
                </p>
            ));
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
                                    <div className="text-sm">
                                        {renderMessageText(message.text)}
                                    </div>
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
                                if (prompt.trim() === '') return;
                                setMessages((prevMessages) => [
                                    ...prevMessages,
                                    { text: prompt, isUser: true }
                                ]);
                                handleUserInput(prompt);
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
