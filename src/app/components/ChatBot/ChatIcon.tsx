// /components/Chatbot/ChatIcon.tsx
import React from 'react';

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
      <img
        src="images/chatbot.png"
        alt="Chat Icon"
        className="w-full h-full"
      />
    </div>
  );
};

export default ChatIcon;
