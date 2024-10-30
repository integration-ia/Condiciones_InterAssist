// src/hooks/useModificar.ts

import { Dispatch, SetStateAction } from 'react';
import { ConversationStage, Message } from '../../types'; // Ajusta la ruta según tu estructura de carpetas


const useModificar = (
  setMessages: Dispatch<SetStateAction<Message[]>>,
  setConversationStage: Dispatch<SetStateAction<ConversationStage>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  const handleModificar = async (input: string) => {
    setLoading(true);
    try {
      // Implementa la lógica específica para la etapa de 'modificar'
      // Por ejemplo, validar el DNI y número de identificación

      const isValid = validateUserInput(input);
      if (isValid) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: 'Tus datos han sido validados. ¿Qué deseas modificar?',
            isUser: false,
          },
        ]);
        setConversationStage('modificar_confirm');
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: 'No pude validar tus datos. Por favor, verifica tu número de DNI y número de identificación.',
            isUser: false,
          },
        ]);
        setConversationStage('initial');
      }
    } catch (error) {
      console.error('Error al modificar la asistencia:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: 'Hubo un error al procesar tu solicitud. Por favor, intenta de nuevo más tarde.',
          isUser: false,
        },
      ]);
      setConversationStage('initial');
    } finally {
      setLoading(false);
    }
  };
  const validateUserInput = (input: string): boolean => {
    // Supongamos que estás validando que el input sea un DNI numérico de 8 dígitos
    const dniRegex = /^\d{8}$/;
    return dniRegex.test(input); // Valida que el input sea un número de 8 dígitos
  };

  return { handleModificar };
};

export default useModificar;
