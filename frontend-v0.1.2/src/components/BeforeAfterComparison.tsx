
import { AlertTriangle, Sparkles, ArrowRight } from "lucide-react";

export const BeforeAfterComparison = () => {
  const beforeItems = [
    "Hire developers for months",
    "Complex payment integrations",
    "Endless debugging cycles",
    "Expensive technical infrastructure", 
    "Learning curve nightmares",
    "Launch delays and cost overruns"
  ];

  const afterItems = [
    "Visual no-code builder",
    "Payment infrastructure included",
    "Deploy with one click",
    "Enterprise-grade, startup-friendly pricing",
    "Intuitive drag-and-drop interface",
    "Live in minutes, earning today"
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-orange-400 via-yellow-400 to-cyan-400 bg-clip-text mb-6">
          Stop Building, Start Shipping
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Why spend months on infrastructure when you could be making money today?
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start relative">
        {/* Transformation Arrow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:block">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center border-4 border-black shadow-lg animate-pulse">
              <ArrowRight className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-2 -left-2 w-20 h-20 border-2 border-cyan-400/30 rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Before - Traditional Approach */}
        <div className="space-y-6 relative">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-700/50 border-2 border-gray-500 rounded-full mb-4 backdrop-blur-sm">
              <AlertTriangle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-gray-300 mb-2">The Old Way</h3>
            <p className="text-gray-500">Expensive, slow, complicated</p>
          </div>

          <div className="space-y-3">
            {beforeItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-gray-900/40 border border-gray-600/40 rounded-lg backdrop-blur-sm hover:border-gray-500/60 transition-all duration-300">
                <div className="w-2 h-2 bg-gray-500 rounded-full flex-shrink-0 opacity-60"></div>
                <span className="text-gray-400 flex-1">{item}</span>
              </div>
            ))}
          </div>

          <div className="text-center py-6">
            <div className="inline-flex items-center space-x-2 text-gray-500 font-mono bg-gray-900/30 px-4 py-2 rounded-full border border-gray-600/30">
              <span>3-6 months to launch</span>
              <span className="text-2xl">😴</span>
            </div>
          </div>

          {/* Subtle grid overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-br from-gray-600/20 to-transparent"></div>
          </div>
        </div>

        {/* After - Our Platform */}
        <div className="space-y-6 relative">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 border-2 border-cyan-400 rounded-full mb-4 backdrop-blur-sm animate-enhanced-glow">
              <Sparkles className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="text-3xl font-bold text-cyan-400 mb-2">The Smart Way</h3>
            <p className="text-cyan-300/80">Fast, affordable, entrepreneur-friendly</p>
          </div>

          <div className="space-y-3">
            {afterItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-cyan-900/20 border border-cyan-500/40 rounded-lg backdrop-blur-sm hover:border-cyan-400/60 transition-all duration-300 hover:bg-cyan-900/30 hover:shadow-lg hover:shadow-cyan-500/20 group">
                <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex-shrink-0 shadow-lg shadow-cyan-400/50 group-hover:shadow-cyan-400/80 transition-all duration-300"></div>
                <span className="text-gray-200 flex-1 group-hover:text-white transition-colors duration-300">{item}</span>
              </div>
            ))}
          </div>

          <div className="text-center py-6">
            <div className="inline-flex items-center space-x-2 text-cyan-400 font-mono bg-gradient-to-r from-cyan-900/30 to-blue-900/30 px-6 py-3 rounded-full border border-cyan-500/50 shadow-lg shadow-cyan-500/20 animate-tech-pulse">
              <span className="font-semibold">Launch today</span>
              <span className="text-2xl">🚀</span>
            </div>
          </div>

          {/* Enhanced tech overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-1 h-full bg-gradient-to-t from-transparent via-blue-400/60 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <div className="inline-flex items-center space-x-4 p-8 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/50 rounded-xl backdrop-blur-sm shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-500 group">
          <div className="text-4xl group-hover:animate-bounce">💡</div>
          <div className="text-left">
            <h4 className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text mb-1">
              Ready to Ship Your First AI Agent?
            </h4>
            <p className="text-gray-300 text-lg">Join entrepreneurs already building the future with AI.</p>
          </div>
          <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </div>
    </div>
  );
};
