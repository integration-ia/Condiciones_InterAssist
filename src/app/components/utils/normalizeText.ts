// utils/normalizeText.ts

// Función para eliminar acentos y normalizar el texto
export const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD') // Descomponer caracteres unicode
      .replace(/[\u0300-\u036f]/g, '') // Eliminar los diacríticos (acentos)
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') // Eliminar signos de puntuación
      .trim(); // Eliminar espacios en blanco al inicio y al final
  };
  