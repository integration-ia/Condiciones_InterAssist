// /components/Chatbot/MessageItem.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
  text: string;
  isUser: boolean;
}

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  return (
    <div
      className={`flex items-end space-x-2 mb-4 ${message.isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!message.isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center shadow-md">
          <span>🤖</span>
        </div>
      )}
      <div className={`max-w-[70%] p-3 rounded-lg ${message.isUser ? 'bg-blue-100 text-gray-800' : 'bg-white text-gray-800'} shadow-md`}>
        <div className="text-sm">
          <ReactMarkdown>{message.text}</ReactMarkdown>
        </div>
      </div>
      {message.isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
          <span>👤</span>
        </div>
      )}
    </div>
  );
};

export default MessageItem;
