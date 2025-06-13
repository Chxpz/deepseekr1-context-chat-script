import React from 'react';

interface TechnicalSectionProps {
  isVisible: boolean;
  onCTAClick: (e: React.MouseEvent) => void;
}

export const TechnicalSection = ({ isVisible, onCTAClick }: TechnicalSectionProps) => {
  return (
    <section 
      id="technical" 
      className={`py-20 relative z-10 transition-all duration-1000 delay-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="technical-panel p-8 rounded-lg border-2 border-cyan-500/50 bg-black/70 backdrop-blur-sm relative overflow-hidden">
            <div className="circuit-border absolute inset-0"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-cyan-400 mb-6 text-center">Powered by Industry Leaders</h3>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="space-y-4">
                  <div className="text-4xl text-cyan-400">🏗️</div>
                  <h4 className="text-xl font-bold text-white">Coinbase AgentKit</h4>
                  <p className="text-gray-300">Enterprise-grade foundation for autonomous agents</p>
                </div>
                <div className="space-y-4">
                  <div className="text-4xl text-green-400">💳</div>
                  <h4 className="text-xl font-bold text-white">CDP Wallet</h4>
                  <p className="text-gray-300">Seamless payments without the technical headaches</p>
                </div>
                <div className="space-y-4">
                  <div className="text-4xl text-blue-400">⚡</div>
                  <h4 className="text-xl font-bold text-white">x402 Protocol</h4>
                  <p className="text-gray-300">The future of AI-to-AI transactions</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={onCTAClick}
              className="launch-button group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold py-4 px-12 rounded-lg text-xl transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10">Start Your AI Business</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 transform -skew-x-12 group-hover:translate-x-full"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
