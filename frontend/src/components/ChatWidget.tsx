
import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatWidgetProps {
  isVisible: boolean;
  onToggle: () => void;
}

export const ChatWidget = ({ isVisible, onToggle }: ChatWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const aiResponses = [
    "Need help connecting x402 to your agent?",
    "Want to auto-deploy using AgentKit SDK?",
    "Yes, this platform supports imported agents.",
    "I can help you configure CDP Wallet integration.",
    "Your agent will have full crypto transaction capabilities.",
    "The deployment process takes approximately 30 seconds.",
    "All agents are secured with military-grade encryption.",
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      setTimeout(() => {
        addMessage("What kind of agent are you deploying today?", false);
      }, 500);
    }
  }, [isOpen, messages.length]);

  const addMessage = (text: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      isUser,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addMessage(inputValue, true);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      addMessage(randomResponse, false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
      }`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="chat-toggle-btn w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all duration-300 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
          <MessageCircle className="w-8 h-8 relative z-10" />
          <div className="absolute inset-0 rounded-full animate-ping bg-cyan-400 opacity-20"></div>
        </button>
      </div>

      {/* Chat Window */}
      <div className={`fixed bottom-24 right-6 w-96 h-[500px] z-50 transition-all duration-500 ${
        isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
      }`}>
        <div className="chat-window h-full bg-black/90 backdrop-blur-xl border-2 border-cyan-500/50 rounded-lg overflow-hidden relative">
          {/* Header */}
          <div className="chat-header p-4 border-b border-cyan-500/30 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src="/lovable-uploads/28970ed6-5b0a-4607-8a60-f56915fc30e4.png" 
                  alt="AI Agent" 
                  className="w-10 h-10 rounded-full object-cover border-2 border-cyan-400"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-cyan-400 font-bold">AI Agent Assistant</h3>
                <p className="text-xs text-gray-400">Online • Ready to Deploy</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages flex-1 p-4 space-y-4 overflow-y-auto h-80">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message-bubble ${
                  message.isUser 
                    ? 'ml-8 bg-gradient-to-r from-cyan-600 to-blue-600 text-white self-end' 
                    : 'mr-8 bg-gray-800 text-gray-100 border border-cyan-500/30'
                } p-3 rounded-lg max-w-xs animate-fade-in`}
              >
                <p className="text-sm">{message.text}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="mr-8 bg-gray-800 text-gray-100 border border-cyan-500/30 p-3 rounded-lg max-w-xs">
                <div className="typing-dots flex space-x-1">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="chat-input p-4 border-t border-cyan-500/30">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about agent deployment..."
                className="flex-1 bg-gray-900 border border-cyan-500/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-200"
              />
              <button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
