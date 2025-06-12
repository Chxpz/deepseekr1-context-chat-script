import { useRef, useEffect } from "react";
import { User, Bot } from "lucide-react";
import { Message } from "@/types/chat";

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
}

export const ChatMessages = ({ messages, isTyping }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6 relative z-10 custom-scrollbar">
      {/* Welcome Message */}
      {messages.length === 0 && (
        <div className="message-wrapper flex justify-start animate-fade-in">
          <div className="flex items-start space-x-4 max-w-md">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-cyan-400/50 flex items-center justify-center shadow-lg shadow-cyan-400/30">
              <Bot className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="message-bubble p-4 rounded-xl bg-gradient-to-r from-gray-900/90 to-black/90 text-gray-100 border border-cyan-400/30 shadow-lg shadow-cyan-400/20 backdrop-blur-sm">
              <p className="text-sm leading-relaxed">
                💳 Welcome to Autonoma! I'm your AI assistant specializing in 
                payment infrastructure and blockchain integrations. Ask me about 
                CDP Wallet integration, x402 Protocol, or any payment system optimization. 
                You have limited interactions in this preview mode.
              </p>
              <span className="text-xs text-cyan-400 mt-2 block">11:41:58 PM</span>
            </div>
          </div>
        </div>
      )}

      {messages.map((message) => (
        <div
          key={message.id}
          className={`message-wrapper flex ${
            message.isUser ? 'justify-end' : 'justify-start'
          } animate-fade-in`}
        >
          <div className={`flex items-start space-x-4 max-w-md ${
            message.isUser ? 'flex-row-reverse space-x-reverse' : ''
          }`}>
            {/* Avatar */}
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
              message.isUser 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 shadow-cyan-500/50' 
                : 'bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-cyan-400/50 shadow-cyan-400/30'
            }`}>
              {message.isUser ? (
                <User className="w-5 h-5 text-white" />
              ) : (
                <Bot className="w-5 h-5 text-cyan-400" />
              )}
            </div>

            {/* Message Bubble */}
            <div className={`message-bubble p-4 rounded-xl backdrop-blur-sm shadow-lg ${
              message.isUser 
                ? 'bg-gradient-to-r from-cyan-600/90 to-blue-600/90 text-white shadow-cyan-500/30' 
                : 'bg-gradient-to-r from-gray-900/90 to-black/90 text-gray-100 border border-cyan-400/30 shadow-cyan-400/20'
            }`}>
              <p className="text-sm leading-relaxed">{message.text}</p>
              <span className="text-xs opacity-70 mt-2 block font-mono">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>
      ))}
      
      {/* Typing Indicator */}
      {isTyping && (
        <div className="message-wrapper flex justify-start animate-fade-in">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-cyan-400/50 flex items-center justify-center shadow-lg shadow-cyan-400/30">
              <Bot className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="message-bubble p-4 rounded-xl bg-gradient-to-r from-gray-900/90 to-black/90 border border-cyan-400/30 shadow-lg shadow-cyan-400/20">
              <div className="typing-indicator flex space-x-1">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
              <span className="text-xs text-cyan-400 mt-2 block">Autonoma is processing...</span>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};
