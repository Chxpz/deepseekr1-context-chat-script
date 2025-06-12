import { useState, useEffect } from "react";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { Message } from "@/types/chat";

// Generate a simple UUID for conversation_id
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
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
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="p-6 border-b border-cyan-500/30 bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div>
            <h2 className="text-xl font-bold text-cyan-400">Chat with Autonoma</h2>
            <p className="text-sm text-gray-400">Ready to elevate your payment infrastructure (5 interactions left)</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <ChatMessages messages={messages} isTyping={isTyping} />
      </div>

      {/* Chat Input */}
      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSendMessage={handleSendMessage}
        isTyping={isTyping}
        ghostText={showGhostTyping ? ghostText : ""}
      />
    </div>
  );
};
