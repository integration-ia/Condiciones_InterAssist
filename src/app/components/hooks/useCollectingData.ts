// src/hooks/useCollectingData.ts

import { Dispatch, SetStateAction } from 'react';
import { ConversationStage, Message, UserData } from '../../types';
import { normalizeText } from '../utils/normalizeText';

const useCollectingData = (
  setMessages: Dispatch<SetStateAction<Message[]>>,
  setConversationStage: Dispatch<SetStateAction<ConversationStage>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setUserData: Dispatch<SetStateAction<UserData | null>>
) => {
  
  const handleCollectingData = async (input: string) => {
    setLoading(true);
    
    try {
      // Espera una entrada en el formato: "FirstName, LastName, Age, DNI, FechaNacimiento"
      const [firstName, lastName, ageStr, dniStr, fechaNacimientoStr] = input.split(',').map(item => item.trim());

      // Validar la presencia de todos los campos
      if (!firstName || !lastName || !ageStr || !dniStr || !fechaNacimientoStr) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Por favor, proporciona todos los datos: Nombre, Apellido, Edad, DNI y Fecha de Nacimiento, separados por comas.', isUser: false },
        ]);
        setConversationStage('collectingData');
        return;
      }

      // Validar el tipo y el valor de cada campo
      const age = Number(ageStr);
      const dni = Number(dniStr);
      const fechaNacimiento = new Date(fechaNacimientoStr);

      if (isNaN(age) || age <= 0) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'La edad debe ser un número válido y positivo.', isUser: false },
        ]);
        setConversationStage('collectingData');
        return;
      }

      if (!/^\d{7,8}$/.test(dniStr)) { // Ejemplo: DNI con 7 u 8 dígitos
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'El DNI debe ser un número válido de 7 u 8 dígitos.', isUser: false },
        ]);
        setConversationStage('collectingData');
        return;
      }

      if (isNaN(fechaNacimiento.getTime())) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'La fecha de nacimiento debe ser una fecha válida (YYYY-MM-DD).', isUser: false },
        ]);
        setConversationStage('collectingData');
        return;
      }

      // Verificar que la edad coincide con la fecha de nacimiento
      const today = new Date();
      let calculatedAge = today.getFullYear() - fechaNacimiento.getFullYear();
      const m = today.getMonth() - fechaNacimiento.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < fechaNacimiento.getDate())) {
        calculatedAge--;
      }

      if (calculatedAge !== age) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'La edad no coincide con la fecha de nacimiento proporcionada.', isUser: false },
        ]);
        setConversationStage('collectingData');
        return;
      }

      // Guardar los datos del usuario
      const userData: UserData = { firstName, lastName, age, dni, fecha_nacimiento: fechaNacimiento };
      setUserData(userData);

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `Gracias, ${firstName} ${lastName}. Tu contratación ha sido completada exitosamente. ¡Que tengas un buen viaje!`, isUser: false },
      ]);

      setConversationStage('completed'); // Definir una etapa 'completed' para finalizar la conversación

    } catch (error) {
      console.error('Error al recopilar los datos:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Hubo un error al procesar tus datos. Por favor, intenta de nuevo más tarde.', isUser: false },
      ]);
      setConversationStage('collectingData');
    } finally {
      setLoading(false);
    }
  };

  return { handleCollectingData };
};

export default useCollectingData;
