// /hooks/useInitialChoice.ts

import { Dispatch, SetStateAction } from 'react';
import { getCategoryFromInput } from '../utils/keywordMatching';
import { normalizeText } from '../utils/normalizeText';

const useInitialChoice = (
  setMessages: Dispatch<SetStateAction<any[]>>,
  setConversationStage: Dispatch<SetStateAction<string>>
) => {
  const handleInitialChoice = (input: string) => {
    const normalizedInput = normalizeText(input);
    const category = getCategoryFromInput(normalizedInput);

    if (category === 'cotizar') {
      setConversationStage('cotizar');
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: 'Para cotizar necesito:\n- Cantidad de pasajeros\n- Edad de pasajeros\n- Días de viaje\n- Destino',
          isUser: false,
        },
      ]);
    } else if (category === 'modificar') {
      setConversationStage('modificar');
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: 'Para modificar una asistencia, por favor proporciona el número de identificación de la cobertura y tu número de DNI.',
          isUser: false,
        },
      ]);
    } else {
      // Manejar entrada desconocida
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: 'No he podido identificar tu solicitud. Por favor, indica si deseas "Cotizar" o "Modificar".',
          isUser: false,
        },
      ]);
    }
  };

  return { handleInitialChoice };
};

export default useInitialChoice;
