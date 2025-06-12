
import { useState, useEffect } from "react";

export const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    comparison: false,
    technical: false,
    chat: false,
    footer: false,
  });

  useEffect(() => {
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
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isVisible;
};
