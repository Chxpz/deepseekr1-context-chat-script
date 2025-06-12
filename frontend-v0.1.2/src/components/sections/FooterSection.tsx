
import { SocialLinks } from "@/components/SocialLinks";

interface FooterSectionProps {
  isVisible: boolean;
}

export const FooterSection = ({ isVisible }: FooterSectionProps) => {
  return (
    <section 
      id="footer" 
      className={`py-20 relative z-10 transition-all duration-1000 delay-1100 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="text-center space-y-8">
          <p className="text-xl text-gray-400 pulse-text">
            Built for the Coinbase <span className="text-cyan-400 font-bold">'Agents in Action'</span> Hackathon — Where Payment Infrastructure Meets AI Autonomy.
          </p>
          
          <div className="flex flex-col items-center space-y-4">
            <p className="text-lg text-cyan-300 font-medium">Join our community</p>
            <SocialLinks size="lg" className="justify-center" />
          </div>
        </div>
      </div>
    </section>
  );
};
