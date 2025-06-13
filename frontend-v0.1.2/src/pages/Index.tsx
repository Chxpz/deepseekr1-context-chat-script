import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BeforeAfterComparison } from "@/components/BeforeAfterComparison";
import { useWalletAuth } from "@/hooks/useWalletAuth";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { TechnicalSection } from "@/components/sections/TechnicalSection";
import { FooterSection } from "@/components/sections/FooterSection";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, authenticate, isLoading: isAuthLoading, error: authError } = useWalletAuth();
  const isVisible = useScrollAnimation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCTAClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate('/chat');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Check if MetaMask is available
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
      }

      if (window.ethereum.isCoinbaseWallet) {
        throw new Error('Coinbase Wallet is not supported. Please use MetaMask.');
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found. Please connect your wallet.');
      }

      const address = accounts[0];
      await authenticate(address);
      navigate('/chat');
    } catch (error) {
      console.error('Wallet connection failed:', error);
      setError(error instanceof Error ? error.message : 'Failed to connect wallet');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="neural-network"></div>
        <div className="circuit-lines"></div>
        <div className="particle-field"></div>
        <div className="quantum-particles"></div>
      </div>

      {(error || authError) && (
        <div className="fixed top-4 right-4 z-50 bg-red-900/20 border border-red-500/30 rounded-lg p-4 flex items-center gap-3 animate-fade-in">
          <div className="w-5 h-5 text-red-400 flex-shrink-0">⚠️</div>
          <p className="text-red-400 text-sm">{error || authError}</p>
        </div>
      )}

      {(isLoading || isAuthLoading) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-cyan-300">{isLoading ? 'Connecting wallet...' : 'Authenticating...'}</p>
          </div>
        </div>
      )}

      <HeroSection isVisible={isVisible.hero} onCTAClick={handleCTAClick} />
      <FeaturesSection isVisible={isVisible.features} />

      {/* Before/After Comparison Section */}
      <section 
        id="comparison" 
        className={`py-20 relative z-10 transition-all duration-1000 delay-500 ${
          isVisible.comparison ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-6">
          <BeforeAfterComparison />
        </div>
      </section>

      <TechnicalSection isVisible={isVisible.technical} onCTAClick={handleCTAClick} />
      <FooterSection isVisible={isVisible.footer} />
    </div>
  );
};

export default Index;
