// /hooks/useCotizar.ts
import { Dispatch, SetStateAction, useState } from 'react';
import axios from 'axios';
import { calculateQuotes } from '../utils/calculateQuotes';

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

        // Generar el mensaje con consejos utilizando la API de OpenAI
        const adviceRes = await axios.post('/api/gpt', {
            prompt: `
              Eres un agente de viajes virtual. Tienes las siguientes cotizaciones para ofrecer al cliente:
          
              ${quotes.map((q) => `- ${q.plan}: ${q.price} USD`).join('\n')}
          
              Las características de cada plan son:
          
              - **Inter60**: Cobertura médica internacional hasta 60,000 USD. Incluye beneficios esenciales para viajes cortos y destinos cercanos.
          
              - **Inter100**: Cobertura médica internacional hasta 100,000 USD. Incluye seguro de cancelación y pérdida de equipaje, ofreciendo mayor tranquilidad en tus viajes.
          
              - **Inter200**: Cobertura médica internacional completa con múltiples destinos. Incluye seguro de cancelación, vuelos de repatriación sanitaria, mayor monto de pérdida de equipaje y asistencia adicional para una experiencia sin preocupaciones.
          
              Proporciona información sobre cada producto de manera estructurada y clara, describiendo brevemente las características y beneficios de cada plan. Asegúrate de que el cliente entienda las diferencias entre ellos. Recomienda al cliente el plan Inter200, destacando sus beneficios y por qué es la mejor opción. No menciones que es el más caro, sino enfócate en el valor que ofrece.
          
              Instrucciones:
              - Responde en un tono amable y profesional.
              - Utiliza formato Markdown para mejorar la legibilidad (por ejemplo, encabezados, listas, etc.).
              - No incluyas asteriscos (*) en los nombres de los planes en tu respuesta final.
              - No incluyas información adicional fuera de lo solicitado.
            `,
            max_tokens: 500,
          });
          

          const advice = adviceRes.data.completion;
          
          const removeAsterisks = (text: string): string => {
            return text.replace(/\*\*/g, '');
          };

          // Eliminar los asteriscos del mensaje
          const cleanedAdvice = removeAsterisks(advice.trim());
          
          // Añadir el mensaje limpio al chat
          setMessages((prevMessages) => [...prevMessages, { text: cleanedAdvice, isUser: false }]);

        // Añadir la pregunta en una burbuja separada
        setMessages((prevMessages) => [...prevMessages, { text: '¿Te gustaría avanzar con alguna de estas cotizaciones?', isUser: false }]);

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
