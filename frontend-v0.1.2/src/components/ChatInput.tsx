
import { useRef } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onSendMessage: () => void;
  isTyping: boolean;
  ghostText?: string;
}

export const ChatInput = ({ inputValue, setInputValue, onSendMessage, isTyping, ghostText = "" }: ChatInputProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const placeholderText = inputValue ? "Continue your message..." : "Ask about payment integrations, blockchain protocols, or infrastructure optimization...";

  return (
    <div className="p-6 border-t border-cyan-500/30 bg-gradient-to-r from-gray-900/50 to-black/50 relative z-10">
      <div className="flex space-x-4 items-end">
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholderText}
            className="w-full bg-black/80 border-2 border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all duration-200 resize-none min-h-[50px] max-h-32 shadow-inner"
            rows={1}
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 pointer-events-none"></div>
        </div>
        <button
          onClick={onSendMessage}
          disabled={!inputValue.trim() || isTyping}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-700 text-white p-4 rounded-xl transition-all duration-200 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed group shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
        >
          <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-200" />
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-3 text-center font-mono">
        <span className="text-cyan-400">●</span> Payment infrastructure ready <span className="text-cyan-400">●</span> Enter to transmit <span className="text-cyan-400">●</span> Shift + Enter for new line
      </p>
    </div>
  );
};
