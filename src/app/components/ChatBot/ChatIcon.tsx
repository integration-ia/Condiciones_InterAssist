// /components/Chatbot/ChatIcon.tsx
import React from 'react';
import Image from 'next/image'; // Importa Image desde next/image

interface ChatIconProps {
  toggleChat: () => void;
}

const ChatIcon: React.FC<ChatIconProps> = ({ toggleChat }) => {
  return (
    <div
      onClick={toggleChat}
      className="fixed bottom-4 right-4 bg-blue-500 rounded-full p-4 cursor-pointer shadow-lg"
      style={{ width: '70px', height: '70px' }}
    >
      <Image
        src="/images/chatbot.png" // Nota: debes usar rutas relativas para assets públicos
        alt="Chat Icon"
        width={70} // Especifica el ancho
        height={70} // Especifica la altura
        className="w-full h-full"
      />
    </div>
  );
};

export default ChatIcon;
