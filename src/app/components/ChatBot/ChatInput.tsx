// /components/Chatbot/ChatInput.tsx
import React from 'react';

interface ChatInputProps {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  handleUserInput: (input: string) => void;
  loading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ prompt, setPrompt, handleUserInput, loading }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (prompt.trim() === '') return;
    handleUserInput(prompt);
    setPrompt('');
  };

  return (
    <div className="border-t border-gray-200 p-4 bg-gray-100">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-grow bg-white border-gray-300 rounded-full p-2 text-gray-700"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-full"
          disabled={loading}
        >
          {loading ? '...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
