
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialLinksProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  orientation?: "horizontal" | "vertical";
}

export const SocialLinks = ({ 
  className = "", 
  size = "md", 
  orientation = "horizontal" 
}: SocialLinksProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10", 
    lg: "h-12 w-12"
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  const containerClasses = orientation === "horizontal" 
    ? "flex items-center space-x-3" 
    : "flex flex-col space-y-3";

  return (
    <div className={`${containerClasses} ${className}`}>
      {/* X (Twitter) Link */}
      <Button
        variant="ghost"
        size="sm"
        asChild
        className={`${sizeClasses[size]} bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20 group`}
      >
        <a 
          href="https://x.com/autonoma_ai" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center relative"
        >
          <svg 
            className={`${iconSizes[size]} text-cyan-300 group-hover:text-cyan-200 transition-colors`}
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </a>
      </Button>

      {/* Telegram Link */}
      <Button
        variant="ghost"
        size="sm"
        asChild
        className={`${sizeClasses[size]} bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/20 group`}
      >
        <a 
          href="https://t.me/autonoma_community" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center relative"
        >
          <svg 
            className={`${iconSizes[size]} text-blue-300 group-hover:text-blue-200 transition-colors`}
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </a>
      </Button>
    </div>
  );
};
