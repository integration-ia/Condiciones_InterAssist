import React, { useRef, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa'; // Asegúrate de tener esta librería instalada

interface ChatInputProps {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  handleUserInput: (input: string) => void;
  loading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ prompt, setPrompt, handleUserInput, loading }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (prompt.trim() === '') return;
    handleUserInput(prompt);
    setPrompt('');
  };

  // Ajusta la altura del textarea según el contenido
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reinicia la altura antes de ajustar
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Ajusta a la altura del contenido
    }
  }, [prompt]);

  return (
    <div className="border-t border-gray-200 p-4 bg-gray-100">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <textarea
          ref={textareaRef}
          placeholder="Escribe tu mensaje..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-grow bg-white border-gray-300 rounded-lg p-2 text-gray-700 resize-none"
          rows={1} // Mínimo una línea, pero crece según el contenido
          style={{ maxHeight: '150px' }} // Limita la altura máxima
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-full h-10 w-10 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? '...' : <FaPaperPlane />}
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
