
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BeforeAfterComparison } from "@/components/BeforeAfterComparison";
import { AccessModal } from "@/components/AccessModal";
import { useWalletAuth } from "@/hooks/useWalletAuth";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { TechnicalSection } from "@/components/sections/TechnicalSection";
import { FooterSection } from "@/components/sections/FooterSection";

const Index = () => {
  const [showAccessModal, setShowAccessModal] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useWalletAuth();
  const isVisible = useScrollAnimation();

  const handleCTAClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate('/chat');
    } else {
      setShowAccessModal(true);
    }
  };

  const handleAuthenticated = () => {
    setShowAccessModal(false);
    navigate('/chat');
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

      {/* Access Modal */}
      <AccessModal 
        isOpen={showAccessModal} 
        onClose={() => setShowAccessModal(false)}
        onAuthenticated={handleAuthenticated}
      />
    </div>
  );
};

export default Index;
