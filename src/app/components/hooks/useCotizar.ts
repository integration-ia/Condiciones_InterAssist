// /hooks/useCotizar.ts

import { Dispatch, SetStateAction, useState } from 'react';
import axios from 'axios';
import { calculateQuotes } from '../utils/calculateQuotes';
import removeMarkdown from 'remove-markdown';

interface TravelDetails {
  passengers: number;
  ages: number[];
  destination: string;
  duration: number;
}

const useCotizar = (
  setMessages: Dispatch<SetStateAction<any[]>>,
  setConversationStage: Dispatch<SetStateAction<string>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  const [travelDetails, setTravelDetails] = useState<TravelDetails | null>(null);

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
        `,
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
          setMessages((prevMessages) => [...prevMessages, { text: gptResponse.trim(), isUser: false }]);
          setLoading(false);
          return;
        }

        const { passengers, ages, destination, duration } = jsonResponse;

        if (!passengers || !ages || !destination || !duration) {
          // Falta información
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: 'Falta información para realizar la cotización. Por favor, proporciona todos los datos necesarios.', isUser: false },
          ]);
          setLoading(false);
          return;
        }

        if (ages.length !== passengers) {
          // La cantidad de edades no coincide con el número de pasajeros
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: 'El número de edades proporcionadas no coincide con la cantidad de pasajeros. Por favor, verifica esta información.', isUser: false },
          ]);
          setLoading(false);
          return;
        }

        // Guardar los detalles del viaje
        const travelData = { passengers, ages, destination, duration };
        setTravelDetails(travelData);

        // Calcular las cotizaciones
        const quotes = calculateQuotes(travelData);

        // Generar las descripciones de los planes con los precios actuales
        const planDescriptions = `
Inter60 tiene un valor de ${quotes[0].price} USD

- Cobertura médica internacional hasta 60,000 USD.
- Incluye asistencia básica para emergencias médicas y accidentes.
- Ideal para viajes cortos y destinos cercanos.

Inter100 tiene un valor de ${quotes[1].price} USD

- Cobertura médica internacional hasta 100,000 USD.
- Incluye todo lo del plan Inter60, más:
- Seguro de cancelación de viaje.
- Cobertura por pérdida de equipaje.
- Brinda mayor tranquilidad y protección durante tu viaje.

Inter200 tiene un valor de ${quotes[2].price} USD

- Cobertura médica internacional hasta 200,000 USD.
- Incluye todo lo de los planes anteriores, más:
- Cobertura para múltiples destinos.
- Vuelos de repatriación sanitaria.
- Mayor monto de indemnización por pérdida de equipaje.
- Proporciona asistencia completa para una experiencia de viaje sin preocupaciones.
        `;

        // Generar la recomendación personalizada utilizando la API de GPT
        const recommendationPrompt = `
Eres un agente de viajes virtual. El cliente planea un viaje de ${duration} días a ${destination}, con ${passengers} pasajero(s) de edades ${ages.join(', ')}.
        
Tu objetivo es recomendar el plan Inter200 destacando sus beneficios y por qué es la mejor opción para este viaje, asegurando una experiencia cómoda y segura para el cliente y sus acompañantes.
        
Instrucciones:
- Solo brindame 1 respuesta.
- La respuesta debe tener 350 caracteres. Es imperativo que no exceda los 350 caracteres.
- La duración y el destino deben aparecer en diferentes posiciones dentro de cada respuesta, alternando su ubicación para evitar que todas las respuestas sigan un patrón.
- Ofrece respuestas que varíen en tono y estructura, manteniendo siempre un enfoque amable y profesional.
- La respuesta debe tener 350 caracteres. Es imperativo que no exceda los 350 caracteres.
- No menciones que el plan es el más caro; destaca el valor que ofrece.
- No utilices asteriscos, negritas ni Markdown.
- Mantén la información relevante y no añadas detalles fuera de lo solicitado.
- Asegúrate de que la longitud sea estrictamente respetada.
`;

        const recommendationRes = await axios.post('/api/gpt', {
          prompt: recommendationPrompt,
          max_tokens: 100,
        });

        const recommendation = recommendationRes.data.completion.trim();

        // Eliminar cualquier formato Markdown del mensaje
        const cleanedRecommendation = removeMarkdown(recommendation);

        // Combinar todos los mensajes nuevos en un solo arreglo
        const newMessages = [
          { text: planDescriptions.trim(), isUser: false },
          { text: cleanedRecommendation, isUser: false },
          { text: '¿Te gustaría avanzar con alguna de estas cotizaciones?', isUser: false },
        ];

        // Añadir todos los mensajes al chat en una sola llamada
        setMessages((prevMessages) => [...prevMessages, ...newMessages]);

        // Cambiar la etapa de la conversación
        setConversationStage('cotizar_confirm');

      } catch (parseError) {
        // Manejar error de parseo
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'No se pudo procesar la información. Por favor, verifica los datos proporcionados.', isUser: false },
        ]);
      }
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Hubo un error al procesar tu solicitud. Por favor, intenta de nuevo más tarde.', isUser: false },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { handleCotizar };
};

export default useCotizar;
