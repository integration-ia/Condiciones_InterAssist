// /hooks/useInitialChoice.ts
import { Dispatch, SetStateAction } from 'react';

const useInitialChoice = (
  setMessages: Dispatch<SetStateAction<any[]>>,
  setConversationStage: Dispatch<SetStateAction<string>>
) => {
  const handleInitialChoice = (input: string) => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('cotizar')) {
      setConversationStage('cotizar');
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Para cotizar necesito:\n- Cantidad de pasajeros\n- Edad de pasajeros\n- Días de viaje\n- Destino', isUser: false },
      ]);
    } else if (lowerInput.includes('modificar')) {
      setConversationStage('modificar');
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Para modificar una asistencia es necesario que me brindes el número de identificación de la cobertura y tu número de DNI.', isUser: false },
      ]);
    } else if (lowerInput.includes('eliminar')) {
      setConversationStage('eliminar');
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Para dar de baja una asistencia es necesario que me brindes el número de identificación de la cobertura y tu número de DNI.', isUser: false },
      ]);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Por favor, elige una de las opciones: "Cotizar", "Modificar" o "Eliminar".', isUser: false },
      ]);
    }
  };

  return { handleInitialChoice };
};

export default useInitialChoice;
