// /components/Chatbot/ChatComponent.tsx
"use client";
import React, { useState } from 'react';
import ChatIcon from './ChatIcon';
import ChatWindow from './ChatWindow';

const ChatComponent: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div>
      {/* Icono flotante del chat */}
      <ChatIcon toggleChat={toggleChat} />
      {/* Ventana del chat */}
      {isChatOpen && <ChatWindow toggleChat={toggleChat} />}
    </div>
  );
};

export default ChatComponent;
