
import { Cpu, Zap, Shield } from "lucide-react";

export const AgentHeader = () => {
  return (
    <div className="text-center mb-12 relative z-10">
      <div className="relative inline-block">
        {/* Enhanced floating energy rings */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
          <div className="w-80 h-80 border-2 border-cyan-400/40 rounded-full shadow-lg shadow-cyan-400/20"></div>
        </div>
        <div className="absolute inset-2 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
          <div className="w-76 h-76 border border-blue-400/30 rounded-full"></div>
        </div>
        <div className="absolute inset-6 animate-spin" style={{ animationDuration: '25s' }}>
          <div className="w-68 h-68 border border-purple-400/20 rounded-full"></div>
        </div>

        {/* Quantum particle effects */}
        <div className="absolute inset-0">
          <div className="quantum-particle quantum-particle-1"></div>
          <div className="quantum-particle quantum-particle-2"></div>
          <div className="quantum-particle quantum-particle-3"></div>
          <div className="quantum-particle quantum-particle-4"></div>
          <div className="quantum-particle quantum-particle-5"></div>
          <div className="quantum-particle quantum-particle-6"></div>
        </div>
        
        {/* Enhanced Central Agent Image */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-blue-600/40 to-purple-600/30 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute inset-2 bg-gradient-to-r from-cyan-400/20 via-blue-500/30 to-purple-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-cyan-400/60 shadow-2xl shadow-cyan-500/60 agent-presence">
            <img 
              src="/lovable-uploads/66cbc30b-4508-4233-b086-462e1ee73115.png" 
              alt="Autonoma AI Agent" 
              className="w-full h-full object-cover"
            />
            {/* Enhanced overlay effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30"></div>
            
            {/* Scanning line effect */}
            <div className="absolute inset-0 scanning-line"></div>
          </div>
          
          {/* Enhanced power indicators */}
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/60 border-2 border-green-300"></div>
          <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/60 border-2 border-cyan-300" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/2 -right-5 w-4 h-4 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/60 border border-blue-300" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/4 -left-5 w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-lg shadow-purple-400/60 border border-purple-300" style={{ animationDelay: '1.5s' }}></div>
        </div>
        
        {/* Enhanced Agent Identity */}
        <h2 className="text-6xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text mb-4 tracking-wider drop-shadow-lg">
          AUTONOMA
        </h2>
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Cpu className="w-6 h-6 text-cyan-400 animate-pulse" />
          <span className="text-cyan-300 font-mono text-xl">PAYMENT INFRASTRUCTURE SPECIALIST</span>
          <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
        </div>
        
        {/* Enhanced Status Indicators */}
        <div className="flex justify-center space-x-8 mb-8">
          <div className="flex items-center space-x-3 px-4 py-2 bg-green-900/30 border border-green-400/50 rounded-full backdrop-blur-sm">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
            <span className="text-green-400 text-sm font-mono font-bold">PAYMENTS READY</span>
          </div>
          <div className="flex items-center space-x-3 px-4 py-2 bg-blue-900/30 border border-blue-400/50 rounded-full backdrop-blur-sm">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-mono font-bold">SECURED</span>
          </div>
          <div className="flex items-center space-x-3 px-4 py-2 bg-cyan-900/30 border border-cyan-400/50 rounded-full backdrop-blur-sm">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50" style={{ animationDelay: '0.5s' }}></div>
            <span className="text-cyan-400 text-sm font-mono font-bold">DEPLOYING</span>
          </div>
        </div>
      </div>
    </div>
  );
};
