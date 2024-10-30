// /components/Chatbot/ChatWindow.tsx
import React from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import useChat from '../hooks/useChat';

interface ChatWindowProps {
  toggleChat: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ toggleChat }) => {
  const {
    messages,
    prompt,
    setPrompt,
    loading,
    handleUserInput,
  } = useChat();

  return (
    <div className="fixed bottom-16 right-4 w-full max-w-md mx-auto shadow-2xl border-0 bg-gray-100 rounded-3xl overflow-hidden z-50">
      {/* Encabezado del chat */}
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Asistente Virtual</h1>
        <button onClick={toggleChat} className="text-white text-xl">✖️</button>
      </div>
      {/* Área de mensajes */}
      <ChatMessages messages={messages} />
      {/* Formulario de entrada */}
      <ChatInput
        prompt={prompt}
        setPrompt={setPrompt}
        handleUserInput={handleUserInput}
        loading={loading}
      />
    </div>
  );
};

export default ChatWindow;
