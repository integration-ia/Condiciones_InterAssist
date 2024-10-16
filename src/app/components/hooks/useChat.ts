// /hooks/useChat.ts
import { useState } from 'react';




import useInitialChoice from './useInitialChoice';
import useModificar from './useModificar';
import useCotizarConfirm from './useCotizazrConfirm';
import useCotizar from './useCotizar';

interface Message {
  text: string;
  isUser: boolean;
}

const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy? Puedo cotizar un viaje, modificar una asistencia emitida o dar de baja una asistencia emitida. Por favor, escribe 'Cotizar', 'Modificar' o 'Eliminar'.",
      isUser: false,
    },
  ]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationStage, setConversationStage] = useState('initial');

  // Hooks específicos de cada etapa
  const { handleInitialChoice } = useInitialChoice(setMessages, setConversationStage);
  const { handleCotizar } = useCotizar(setMessages, setConversationStage, setLoading);
  const { handleCotizarConfirm } = useCotizarConfirm(setMessages, setConversationStage);
  const { handleModificar } = useModificar(setMessages, setConversationStage, setLoading);

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
      // Otros casos...
      default:
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
  };
};

export default useChat;
