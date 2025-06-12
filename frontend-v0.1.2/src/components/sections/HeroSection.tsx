
import { useWalletAuth } from "@/hooks/useWalletAuth";

interface HeroSectionProps {
  isVisible: boolean;
  onCTAClick: (e: React.MouseEvent) => void;
}

export const HeroSection = ({ isVisible, onCTAClick }: HeroSectionProps) => {
  return (
    <section 
      id="hero" 
      className={`min-h-screen flex items-center justify-center relative z-10 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-6 text-center">
        <div className="space-y-8 max-w-5xl mx-auto">
          <h1 className="text-6xl lg:text-8xl font-bold leading-tight cyber-glow">
            <span className="neon-text">Build</span> Payment-Ready
            <br />
            <span className="text-cyan-400 cyber-glow">AI Agents</span>
          </h1>
          
          <div className="space-y-6">
            <p className="text-2xl lg:text-3xl text-gray-300 font-light tracking-wide">
              No-code AI agents that actually make money.
            </p>
            <p className="text-xl lg:text-2xl text-cyan-300 font-medium">
              Launch autonomous agents with built-in payments in minutes, not months.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={onCTAClick}
              className="launch-button group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold py-4 px-12 rounded-lg text-xl transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10">Start Building Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 transform -skew-x-12 group-hover:translate-x-full"></div>
            </button>
            
            <div className="flex items-center space-x-3 text-cyan-400">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-mono">No coding required</span>
            </div>
          </div>

          <div className="mt-12 text-sm text-gray-500 font-mono">
            <span className="text-cyan-400">●</span> First AI agent? Perfect. 
            <span className="text-cyan-400 mx-2">●</span> Already building? Scale faster.
          </div>
        </div>
      </div>
    </section>
  );
};
