
import { Bot, Shield, Zap, CheckCircle, Wallet, Twitter, MessageCircle } from "lucide-react";

interface AuthStepContentProps {
  authStep: 'connect' | 'signing' | 'profile' | 'complete';
  isLoading: boolean;
  onConnectWallet: () => void;
}

export const AuthStepContent = ({ authStep, isLoading, onConnectWallet }: AuthStepContentProps) => {
  const renderStepContent = () => {
    switch (authStep) {
      case 'connect':
        return (
          <>
            <div className="text-center space-y-4">
              <p className="text-xl text-cyan-300 font-medium">
                Join Our Community to Access Autonoma
              </p>
              <p className="text-gray-300 leading-relaxed">
                Currently in development for the <span className="text-cyan-400 font-semibold">Coinbase 'Agents in Action' Hackathon</span>. 
                Connect your wallet and join our community to experience our AI interface.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 py-6">
              <div className="text-center space-y-2">
                <Wallet className="w-8 h-8 text-cyan-400 mx-auto" />
                <h4 className="text-sm font-semibold text-white">Connect Wallet</h4>
                <p className="text-xs text-gray-400">Verify your identity</p>
              </div>
              <div className="text-center space-y-2">
                <Twitter className="w-8 h-8 text-blue-400 mx-auto" />
                <h4 className="text-sm font-semibold text-white">Follow on X</h4>
                <p className="text-xs text-gray-400">Join our X community</p>
              </div>
              <div className="text-center space-y-2">
                <MessageCircle className="w-8 h-8 text-cyan-400 mx-auto" />
                <h4 className="text-sm font-semibold text-white">Join Telegram</h4>
                <p className="text-xs text-gray-400">Participate in discussions</p>
              </div>
            </div>

            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
              <p className="text-sm text-cyan-200 text-center">
                <strong>Community Verification:</strong> You'll need to follow us on X and join our Telegram group to access the platform.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-center text-gray-300 font-medium">
                Connect your wallet to begin the verification process
              </p>
              
              <div className="flex justify-center">
                <button
                  onClick={onConnectWallet}
                  disabled={isLoading}
                  className="relative group overflow-hidden bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-2 border-cyan-400/30 hover:border-cyan-400/60 rounded-xl px-8 py-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/25 backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="flex items-center space-x-3 relative z-10">
                    <Wallet className="w-5 h-5 text-cyan-400" />
                    <span className="text-white font-semibold text-lg">Connect Wallet</span>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                </button>
              </div>
            </div>
          </>
        );

      case 'signing':
        return (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full flex items-center justify-center border border-cyan-400/30">
              <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-cyan-300">Authenticating</h3>
              <p className="text-gray-300">Please sign the message in your wallet to verify ownership</p>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full flex items-center justify-center border border-cyan-400/30">
              <div className="flex gap-2">
                <Twitter className="w-8 h-8 text-blue-400" />
                <MessageCircle className="w-8 h-8 text-cyan-400" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-cyan-300">Join Our Community</h3>
              <p className="text-gray-300">Follow us on X and join our Telegram group to continue</p>
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-400/20 to-cyan-500/20 rounded-full flex items-center justify-center border border-green-400/30">
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-green-300">Verification Complete!</h3>
              <p className="text-gray-300">Thanks for joining our community. Redirecting to chat...</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return renderStepContent();
};
