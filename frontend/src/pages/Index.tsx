
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChatWidget } from "@/components/ChatWidget";
import { BeforeAfterComparison } from "@/components/BeforeAfterComparison";

const Index = () => {
  const [showChat, setShowChat] = useState(false);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    comparison: false,
    technical: false,
    chat: false,
    footer: false,
  });

  useEffect(() => {
    // Auto-show chat after 5 seconds
    const timer = setTimeout(() => {
      setShowChat(true);
    }, 5000);

    // Scroll animations
    const handleScroll = () => {
      const sections = ['hero', 'features', 'comparison', 'technical', 'chat', 'footer'];
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isInView = rect.top < window.innerHeight * 0.8;
          setIsVisible(prev => ({ ...prev, [section]: isInView }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const features = [
    { 
      icon: "💳", 
      title: "CDP Wallet Native Integration",
      description: "Seamless payment infrastructure for your AI agents"
    },
    { 
      icon: "⚡", 
      title: "x402 Payment Protocol",
      description: "Instant microtransactions and automated settlements"
    },
    { 
      icon: "🔌", 
      title: "Universal Agent Compatibility",
      description: "Works with existing agents from any platform"
    },
    { 
      icon: "🛡️", 
      title: "Enterprise Security",
      description: "Bank-grade encryption and decentralized key management"
    },
    { 
      icon: "🚀", 
      title: "Zero Setup Deployment",
      description: "Payment-ready agents in under 30 seconds"
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="neural-network"></div>
        <div className="circuit-lines"></div>
        <div className="particle-field"></div>
        <div className="quantum-particles"></div>
      </div>

      {/* Hero Section */}
      <section 
        id="hero" 
        className={`min-h-screen flex items-center justify-center relative z-10 transition-all duration-1000 ${
          isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-6 text-center">
          <div className="space-y-8 max-w-5xl mx-auto">
            <h1 className="text-6xl lg:text-8xl font-bold leading-tight cyber-glow">
              <span className="neon-text">Unleash</span> Your AI Agents
              <br />
              <span className="text-cyan-400 cyber-glow">Payments at Scale</span>
            </h1>
            
            <div className="space-y-6">
              <p className="text-2xl lg:text-3xl text-gray-300 font-light tracking-wide">
                The first payment infrastructure designed for AI agents.
              </p>
              <p className="text-xl lg:text-2xl text-cyan-300 font-medium">
                Transform any AI agent into a payment-powered autonomous system with CDP Wallet + x402 Protocol.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                to="/chat"
                className="launch-button group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold py-4 px-12 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 inline-block"
              >
                <span className="relative z-10">Talk to Autonoma</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 transform -skew-x-12 group-hover:translate-x-full"></div>
              </Link>
              
              <div className="flex items-center space-x-3 text-cyan-400">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-mono">Payment Infrastructure Ready</span>
              </div>
            </div>

            <div className="mt-12 text-sm text-gray-500 font-mono">
              <span className="text-cyan-400">●</span> No existing payments? No problem. 
              <span className="text-cyan-400 mx-2">●</span> Already have agents? Upgrade them instantly.
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section 
        id="features" 
        className={`py-20 relative z-10 transition-all duration-1000 delay-300 ${
          isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text mb-6">
              Payment Infrastructure That Just Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stop building payment systems from scratch. Integrate enterprise-grade financial infrastructure in minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="feature-card p-8 rounded-lg border border-cyan-500/30 bg-black/50 backdrop-blur-sm hover:border-cyan-400 transition-all duration-300 hover:scale-105 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl mb-6 group-hover:animate-pulse">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-cyan-400 mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                <div className="feature-glow absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      {/* Technical Section */}
      <section 
        id="technical" 
        className={`py-20 relative z-10 transition-all duration-1000 delay-700 ${
          isVisible.technical ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="technical-panel p-8 rounded-lg border-2 border-cyan-500/50 bg-black/70 backdrop-blur-sm relative overflow-hidden">
              <div className="circuit-border absolute inset-0"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-cyan-400 mb-6 text-center">Built for the Coinbase Agent Ecosystem</h3>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div className="space-y-4">
                    <div className="text-4xl text-cyan-400">🏗️</div>
                    <h4 className="text-xl font-bold text-white">AgentKit SDK</h4>
                    <p className="text-gray-300">Composable framework for autonomous agent development</p>
                  </div>
                  <div className="space-y-4">
                    <div className="text-4xl text-green-400">💳</div>
                    <h4 className="text-xl font-bold text-white">CDP Wallet</h4>
                    <p className="text-gray-300">Gasless UX with enterprise-grade key management</p>
                  </div>
                  <div className="space-y-4">
                    <div className="text-4xl text-blue-400">⚡</div>
                    <h4 className="text-xl font-bold text-white">x402 Protocol</h4>
                    <p className="text-gray-300">HTTP-native payments for seamless agent transactions</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="text-center mt-12">
              <Link 
                to="/chat"
                className="launch-button group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold py-4 px-12 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 inline-block"
              >
                <span className="relative z-10">Get Started with Autonoma</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 transform -skew-x-12 group-hover:translate-x-full"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Interface Section */}
      

      {/* Footer */}
      <section 
        id="footer" 
        className={`py-20 relative z-10 transition-all duration-1000 delay-1100 ${
          isVisible.footer ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-6 text-center">
          <p className="text-xl text-gray-400 pulse-text">
            Built for the Coinbase <span className="text-cyan-400 font-bold">'Agents in Action'</span> Hackathon — Where Payment Infrastructure Meets AI Autonomy.
          </p>
        </div>
      </section>

      {/* Chat Widget */}
      <ChatWidget isVisible={showChat} onToggle={() => setShowChat(!showChat)} />
    </div>
  );
};

export default Index;
