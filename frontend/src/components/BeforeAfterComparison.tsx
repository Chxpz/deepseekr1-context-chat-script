
import { CheckCircle, XCircle } from "lucide-react";

export const BeforeAfterComparison = () => {
  const beforeItems = [
    "Build payment system from scratch",
    "Months of wallet integration",
    "Complex transaction handling",
    "Security vulnerabilities",
    "Limited to single blockchain",
    "Manual settlement processes"
  ];

  const afterItems = [
    "Plug-and-play payment infrastructure",
    "CDP Wallet integration in minutes",
    "Automated x402 transactions",
    "Enterprise-grade security built-in",
    "Multi-chain compatibility",
    "Instant automated settlements"
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 bg-clip-text mb-6">
          The Payment Infrastructure Revolution
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Stop reinventing the wheel. Transform your development workflow with our payment-first approach.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Before - Traditional Approach */}
        <div className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 border-2 border-red-500 rounded-full mb-4">
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-3xl font-bold text-red-400 mb-2">Traditional Approach</h3>
            <p className="text-gray-400">Complex, time-consuming, error-prone</p>
          </div>

          <div className="space-y-3">
            {beforeItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>

          <div className="text-center py-6">
            <div className="inline-flex items-center space-x-2 text-red-400 font-mono">
              <span>6-12 months development</span>
              <span className="text-2xl">⏰</span>
            </div>
          </div>
        </div>

        {/* After - Our Platform */}
        <div className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 border-2 border-green-500 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-3xl font-bold text-green-400 mb-2">Our Platform</h3>
            <p className="text-gray-400">Simple, fast, production-ready</p>
          </div>

          <div className="space-y-3">
            {afterItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>

          <div className="text-center py-6">
            <div className="inline-flex items-center space-x-2 text-green-400 font-mono">
              <span>30 seconds setup</span>
              <span className="text-2xl">🚀</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <div className="inline-flex items-center space-x-4 p-6 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/50 rounded-xl backdrop-blur-sm">
          <div className="text-3xl">💡</div>
          <div className="text-left">
            <h4 className="text-xl font-bold text-cyan-400">Ready to Transform Your Development?</h4>
            <p className="text-gray-300">Join the payment infrastructure revolution for AI agents.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
