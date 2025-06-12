
import { Share2, Twitter, Linkedin, Facebook, Copy, Check } from "lucide-react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const ShareButton = () => {
  const [copied, setCopied] = useState(false);
  
  const shareUrl = window.location.href;
  const shareText = "Check out Autonoma - The future of AI-powered payment infrastructure! 🚀";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log('Failed to copy link');
    }
  };

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText);
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    };
    
    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="relative group h-10 px-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Share2 className="w-4 h-4 text-cyan-300 mr-2" />
          <span className="text-cyan-300 font-medium text-sm">Share</span>
          
          {/* Tech particles around button */}
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '0.7s' }}></div>
        </Button>
      </PopoverTrigger>
      
      <PopoverContent 
        align="end" 
        className="w-72 p-0 bg-black/95 backdrop-blur-md border-cyan-500/30 shadow-xl shadow-cyan-500/10"
      >
        {/* Header */}
        <div className="p-4 border-b border-cyan-500/20">
          <div className="flex items-center space-x-2">
            <Share2 className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-medium text-cyan-300">Share Autonoma</h3>
          </div>
          <p className="text-xs text-gray-400 mt-1">Spread the future of AI payments</p>
        </div>

        {/* Share Options */}
        <div className="p-3 space-y-2">
          {/* Social Media Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleShare('twitter')}
              className="h-12 flex-col space-y-1 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
            >
              <Twitter className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-blue-300">Twitter</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleShare('linkedin')}
              className="h-12 flex-col space-y-1 bg-gradient-to-r from-blue-600/10 to-cyan-500/10 border border-blue-600/20 hover:border-blue-500/40 transition-all duration-300"
            >
              <Linkedin className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-blue-300">LinkedIn</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleShare('facebook')}
              className="h-12 flex-col space-y-1 bg-gradient-to-r from-blue-700/10 to-cyan-500/10 border border-blue-700/20 hover:border-blue-600/40 transition-all duration-300"
            >
              <Facebook className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-blue-300">Facebook</span>
            </Button>
          </div>

          <Separator className="bg-cyan-500/20" />

          {/* Copy Link Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyLink}
            className="w-full justify-start h-10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-green-300 text-sm">Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-cyan-400 mr-2" />
                <span className="text-cyan-300 text-sm">Copy Link</span>
              </>
            )}
          </Button>
        </div>

        {/* Footer tech line */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
      </PopoverContent>
    </Popover>
  );
};
