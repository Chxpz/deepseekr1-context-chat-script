import { useState, useEffect } from "react";
import { Bot } from "lucide-react";
import { Message } from "@/types/chat";
import { AgentHeader } from "./AgentHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

// Generate a simple UUID for conversation_id
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [ghostText, setGhostText] = useState("");
  const [showGhostTyping, setShowGhostTyping] = useState(true);
  const [conversationId] = useState(() => generateUUID());

  const ghostTypingMessages = [
    "How can I enable payments for my AI agent?",
    "What makes your payment infrastructure unique?",
    "Can you integrate with my existing agent?",
    "How secure are the CDP wallet transactions?",
    "Show me the x402 protocol capabilities",
    "What's the deployment process like?"
  ];

  useEffect(() => {
    // Ghost typing effect before user interaction
    if (showGhostTyping && messages.length === 0) {
      let currentMessageIndex = 0;
      let currentCharIndex = 0;
      
      const typeGhostMessage = () => {
        const currentMessage = ghostTypingMessages[currentMessageIndex];
        
        if (currentCharIndex < currentMessage.length) {
          setGhostText(currentMessage.slice(0, currentCharIndex + 1));
          currentCharIndex++;
          setTimeout(typeGhostMessage, 50 + Math.random() * 50);
        } else {
          // Wait before starting next message
          setTimeout(() => {
            currentCharIndex = 0;
            currentMessageIndex = (currentMessageIndex + 1) % ghostTypingMessages.length;
            setGhostText("");
            setTimeout(typeGhostMessage, 1000);
          }, 2000);
        }
      };

      setTimeout(typeGhostMessage, 2000);
    }
  }, [showGhostTyping, messages.length]);

  useEffect(() => {
    // Welcome message on component mount
    const welcomeTimer = setTimeout(() => {
      addMessage("◉ AUTONOMA PAYMENT SYSTEMS ONLINE ◉ Welcome to the future of AI agent payments. I specialize in integrating CDP Wallet and x402 protocol with any AI agent. How can I upgrade your agent's financial capabilities?", false);
    }, 1000);

    return () => clearTimeout(welcomeTimer);
  }, []);

  const addMessage = (text: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      isUser,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    
    if (isUser) {
      setShowGhostTyping(false);
    }
  };

  const sendMessageToBackend = async (message: string) => {
    try {
      const response = await fetch('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversation_id: conversationId,
          message: message,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error sending message to backend:', error);
      return "I'm having trouble connecting to the backend service. Please make sure the server is running at http://localhost:8000 and try again.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    addMessage(inputValue, true);
    const userMessage = inputValue;
    setInputValue("");
    setIsTyping(true);
    setShowGhostTyping(false);

    // Send message to backend and get response
    const backendResponse = await sendMessageToBackend(userMessage);
    setIsTyping(false);
    addMessage(backendResponse, false);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="relative">
        {/* Enhanced Agent Header */}
        <AgentHeader />

        {/* Chat Interface */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/80 backdrop-blur-xl border-2 border-cyan-500/30 rounded-xl overflow-hidden relative shadow-2xl shadow-cyan-500/20 chat-container">
            {/* Enhanced animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-600/20"></div>
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(45deg, transparent 40%, rgba(0, 255, 255, 0.1) 50%, transparent 60%),
                  linear-gradient(-45deg, transparent 40%, rgba(0, 150, 255, 0.1) 50%, transparent 60%)
                `,
                backgroundSize: '60px 60px',
                animation: 'slide 8s linear infinite'
              }}></div>
            </div>
            
            {/* Enhanced Chat Header */}
            <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 border-b border-cyan-500/30 p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-cyan-400 font-bold text-xl">Payment Infrastructure Interface</h3>
                    <p className="text-cyan-300/80 text-sm">Connected to Backend • Session: {conversationId.slice(0, 8)}...</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <ChatMessages messages={messages} isTyping={isTyping} />

            {/* Enhanced Input Area with Ghost Typing */}
            <ChatInput 
              inputValue={inputValue}
              setInputValue={setInputValue}
              onSendMessage={handleSendMessage}
              isTyping={isTyping}
              ghostText={showGhostTyping ? ghostText : ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
