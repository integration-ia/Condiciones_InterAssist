// /components/Chatbot/ChatMessages.tsx
import React, { useRef, useEffect } from 'react';
import MessageItem from './MessageItem';

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="p-0 bg-[url('/whatsapp-bg.png')] bg-repeat h-[400px] w-full p-4 overflow-y-auto">
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
