// src/hooks/useCotizarConfirm.ts

import { Dispatch, SetStateAction } from 'react';
import { ConversationStage, Message } from '../../types';
import { getCategoryFromInput } from '../utils/keywordMatching'; // Importar la nueva función

const useCotizarConfirm = (
  setMessages: Dispatch<SetStateAction<Message[]>>,
  setConversationStage: Dispatch<SetStateAction<ConversationStage>>,

) => {
  const handleCotizarConfirm = (input: string) => {
    const category = getCategoryFromInput(input);

    switch (category) {
      case 'confirmar':
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: '¡Excelente! Por favor, proporciona todos los datos: Nombre, Apellido, Edad, DNI y Fecha de Nacimiento, separados por comas.', isUser: false },
        ]);
        setConversationStage('collectingData');
        break;

      case 'negar':
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Entiendo. Si necesitas más información o tienes alguna otra consulta, estoy aquí para ayudarte.', isUser: false },
        ]);
        setConversationStage('initial'); // Reiniciar la conversación
        break;

      case 'duda':
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Entiendo que tengas dudas. ¿En qué puedo ayudarte para aclararlas?', isUser: false },
        ]);
        // Puedes definir una nueva etapa para manejar dudas si lo deseas
        break;

      case 'reiniciar':
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: '¡Claro! Reiniciando la conversación. ¿En qué puedo ayudarte hoy?', isUser: false },
        ]);
        setConversationStage('initial');
        break;

      case 'desconocido':
      default:
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Lo siento, no entendí tu solicitud. Por favor, intenta de nuevo.', isUser: false },
        ]);
        setConversationStage('initial');
        break;
    }
  };

  return { handleCotizarConfirm };
};

export default useCotizarConfirm;
