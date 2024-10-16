// /hooks/useCotizarConfirm.ts
import { Dispatch, SetStateAction } from 'react';

const useCotizarConfirm = (
  setMessages: Dispatch<SetStateAction<any[]>>,
  setConversationStage: Dispatch<SetStateAction<string>>
) => {
  const handleCotizarConfirm = (input: string) => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('sí') || lowerInput.includes('si')) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: '¡Excelente! Por favor, proporciona tus datos personales para continuar con la contratación.', isUser: false },
      ]);
      // Cambiar a la siguiente etapa si es necesario
    } else if (lowerInput.includes('no')) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Entiendo. Si necesitas más información o tienes alguna otra consulta, estoy aquí para ayudarte.', isUser: false },
      ]);
      setConversationStage('initial'); // Reiniciar la conversación si lo deseas
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Por favor, indícame si deseas avanzar con alguna de las cotizaciones.', isUser: false },
      ]);
    }
  };

  return { handleCotizarConfirm };
};

export default useCotizarConfirm;
