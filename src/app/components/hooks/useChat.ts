// src/hooks/useChat.ts

import { useState } from 'react';
import useInitialChoice from './useInitialChoice';
import useModificar from './useModificar';
import useCotizarConfirm from './useCotizarConfirm';
import useCotizar from './useCotizar';
import useCollectingData from './useCollectingData';
import { ConversationStage, Message, TravelDetails, UserData } from '../../types';

const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy? Puedo ayudarte a cotizar un viaje o modificar una asistencia ya emitida. Solo cuéntame qué necesitas y estaré encantado de asistirte",
      isUser: false,
    },
  ]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationStage, setConversationStage] = useState<ConversationStage>('initial');
  const [travelDetails, setTravelDetails] = useState<TravelDetails | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  // Hooks específicos de cada etapa
  const { handleInitialChoice } = useInitialChoice(setMessages, setConversationStage);
  const { handleCotizar } = useCotizar(setMessages, setConversationStage, setLoading, setTravelDetails);
  const { handleCotizarConfirm } = useCotizarConfirm(setMessages, setConversationStage, travelDetails, setTravelDetails);
  const { handleModificar } = useModificar(setMessages, setConversationStage, setLoading);
  const { handleCollectingData } = useCollectingData(setMessages, setConversationStage, setLoading, setUserData);

  // Función principal para manejar la entrada del usuario
  const handleUserInput = (input: string) => {
    setMessages((prevMessages) => [...prevMessages, { text: input, isUser: true }]);
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
      case 'collectingData':
        handleCollectingData(input);
        break;
      case 'duda':
        // Implementa una función similar para manejar dudas si lo deseas
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: '¿Podrías especificar en qué tienes dudas?', isUser: false },
        ]);
        break;
      case 'completed':
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: '¡Gracias por utilizar nuestro servicio! Si necesitas más ayuda, no dudes en contactarnos.', isUser: false },
        ]);
        break;
      case 'reiniciar':
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: '¡Claro! Reiniciando la conversación. ¿En qué puedo ayudarte hoy?', isUser: false },
        ]);
        setConversationStage('initial');
        break;
      // Otros casos pueden añadirse aquí
      default:
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Lo siento, no entendí tu solicitud. Por favor, intenta de nuevo.', isUser: false },
        ]);
        setConversationStage('initial');
        break;
    }
  };

  return {
    messages,
    setMessages,
    prompt,
    setPrompt,
    loading,
    handleUserInput,
    conversationStage,
    setConversationStage,
    travelDetails,
    setTravelDetails,
    userData,
    setUserData,
  };
};

export default useChat;
