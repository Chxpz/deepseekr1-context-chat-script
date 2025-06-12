
interface FeaturesSectionProps {
  isVisible: boolean;
}

export const FeaturesSection = ({ isVisible }: FeaturesSectionProps) => {
  const features = [
    { 
      icon: "🚀", 
      title: "Launch in Minutes",
      description: "Skip months of development. Get your AI agent live and earning today."
    },
    { 
      icon: "💰", 
      title: "Built-in Payments",
      description: "Every agent comes with enterprise-grade payment infrastructure included."
    },
    { 
      icon: "🔌", 
      title: "No-Code Builder",
      description: "Visual tools designed for entrepreneurs, not engineers."
    },
    { 
      icon: "⚡", 
      title: "Scale Instantly",
      description: "From prototype to profit without technical bottlenecks."
    },
  ];

  return (
    <section 
      id="features" 
      className={`py-20 relative z-10 transition-all duration-1000 delay-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text mb-6">
            Built for Digital Entrepreneurs
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Focus on your business, not the tech stack. We handle the complexity so you can focus on growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
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
  );
};
