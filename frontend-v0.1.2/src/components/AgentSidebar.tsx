
import { CreditCard, Layers, Server, Zap, Shield, Activity } from "lucide-react";
import { HorizontalMatrixTicker } from "./HorizontalMatrixTicker";

export const AgentSidebar = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 max-w-md relative h-full py-4">
      {/* Agent Title with enhanced effects */}
      <div className="text-center relative">
        <h1 className="text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text mb-3 relative">
          AUTONOMA
          <div className="absolute inset-0 text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-cyan-300/20 bg-clip-text blur-sm animate-pulse"></div>
        </h1>
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="relative">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-30"></div>
          </div>
          <span className="text-cyan-300 font-mono text-xs tracking-wider">ONLINE & READY</span>
          <div className="flex space-x-1">
            <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Enhanced Agent Avatar with multiple layers */}
      <div className="relative group flex-shrink-0">
        {/* Outer rotating ring */}
        <div className="absolute -inset-6 rounded-full border-2 border-cyan-500/30 animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute -inset-4 rounded-full border border-blue-500/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
        
        {/* Multiple glow layers */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/40 via-blue-600/50 to-cyan-500/40 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute inset-1 bg-gradient-to-r from-cyan-400/30 via-blue-500/40 to-cyan-400/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Main Agent Container - Responsive size */}
        <div className="relative w-64 h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-cyan-400/80 shadow-2xl shadow-cyan-500/80 group-hover:border-cyan-300 transition-all duration-500">
          {/* Holographic overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-500/10 to-blue-500/20 opacity-60"></div>
          
          <img 
            src="/lovable-uploads/66cbc30b-4508-4233-b086-462e1ee73115.png" 
            alt="Autonoma AI Agent" 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Enhanced overlay effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/50 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40"></div>
          
          {/* Multiple scanning effects */}
          <div className="absolute inset-0">
            <div className="scanning-line"></div>
            <div className="scanning-line" style={{ animationDelay: '1.5s', animationDirection: 'reverse' }}></div>
          </div>
          
          {/* Hexagonal tech overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300ffff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '30px 30px'
            }}></div>
          </div>
        </div>

        {/* Enhanced status indicators */}
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse shadow-lg shadow-green-400/80 border-2 border-green-300 flex items-center justify-center">
          <Shield className="w-3 h-3 text-white" />
        </div>
        <div className="absolute -bottom-3 -left-3 w-5 h-5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/80 border border-cyan-300 flex items-center justify-center" style={{ animationDelay: '0.5s' }}>
          <Zap className="w-2 h-2 text-white" />
        </div>
        <div className="absolute top-1/2 -right-5 w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse shadow-lg shadow-blue-400/60" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Enhanced Stats Section - Compact */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm flex-shrink-0">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
          <div className="relative text-center p-2.5 bg-black/60 border-2 border-cyan-500/40 rounded-xl backdrop-blur-md hover:border-cyan-400/60 transition-all duration-300 hover:transform hover:scale-105">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/5 to-transparent rounded-xl"></div>
            <CreditCard className="w-4 h-4 text-cyan-400 mx-auto mb-1 drop-shadow-lg" />
            <div className="text-xs text-gray-300 mb-1 font-mono tracking-wider">PAYMENTS</div>
            <div className="text-xs text-cyan-400">
              <HorizontalMatrixTicker length={7} speed={150} className="text-xs" />
            </div>
            <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
          <div className="relative text-center p-2.5 bg-black/60 border-2 border-cyan-500/40 rounded-xl backdrop-blur-md hover:border-cyan-400/60 transition-all duration-300 hover:transform hover:scale-105">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-transparent rounded-xl"></div>
            <Layers className="w-4 h-4 text-cyan-400 mx-auto mb-1 drop-shadow-lg" />
            <div className="text-xs text-gray-300 mb-1 font-mono tracking-wider">INTEGRATIONS</div>
            <div className="text-xs text-cyan-400">
              <HorizontalMatrixTicker length={6} speed={170} className="text-xs" />
            </div>
            <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
      </div>

      {/* Enhanced Infrastructure Stats - Compact */}
      <div className="relative group w-full max-w-sm flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
        <div className="relative p-3 bg-black/60 border-2 border-cyan-500/40 rounded-xl backdrop-blur-md text-center hover:border-cyan-400/60 transition-all duration-300 hover:transform hover:scale-105">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-transparent rounded-xl"></div>
          <Server className="w-5 h-5 text-cyan-400 mx-auto mb-2 drop-shadow-lg" />
          <div className="text-xs text-gray-300 mb-1 font-mono tracking-wider">DEPLOYED AGENTS</div>
          <div className="text-xs text-cyan-400">
            <HorizontalMatrixTicker length={8} speed={140} className="text-xs" />
          </div>
          <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          {/* Additional tech elements */}
          <div className="absolute top-1 left-1 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
          <div className="absolute top-1 right-1 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.7s' }}></div>
        </div>
      </div>

      {/* Floating tech particles around the sidebar */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-8 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1.2s' }}></div>
        <div className="absolute bottom-32 left-6 w-1 h-1 bg-cyan-300 rounded-full animate-pulse opacity-50" style={{ animationDelay: '0.8s' }}></div>
        <div className="absolute bottom-60 right-12 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-30" style={{ animationDelay: '1.8s' }}></div>
      </div>
    </div>
  );
};
