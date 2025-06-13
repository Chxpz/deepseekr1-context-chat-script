import { useWalletAuth } from "@/hooks/useWalletAuth";
import { LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ShareButton } from "./ShareButton";
import { SocialLinks } from "./SocialLinks";

export const ChatHeader = () => {
  const { walletAddress, logout } = useWalletAuth();

  const formatWalletAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleDisconnect = () => {
    logout();
  };

  return (
    <div className="w-full bg-black/90 backdrop-blur-md border-b border-cyan-500/20 relative z-20">
      {/* Tech overlay effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5"></div>
      
      <div className="relative flex items-center justify-between px-6 py-3">
        {/* Left side - Navigation Menu */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-300 font-mono text-xs tracking-wider">SYSTEM ONLINE</span>
          </div>
          
          <nav className="flex items-center space-x-6">
            <button 
              className="relative group px-4 py-2 text-sm font-medium text-gray-400 hover:text-cyan-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              <span className="relative z-10">Dashboard</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </button>
            
            <button 
              className="relative group px-4 py-2 text-sm font-medium text-gray-400 hover:text-cyan-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              <span className="relative z-10">Create Agent</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </button>
          </nav>
        </div>

        {/* Right side - Social Links, Share, User Profile */}
        <div className="flex items-center space-x-4">
          {/* Social Links */}
          <SocialLinks size="sm" />

          {/* Share Button */}
          <ShareButton />

          {/* Wallet Address Display */}
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-300 font-mono text-xs tracking-wider">
              {formatWalletAddress(walletAddress || "")}
            </span>
          </div>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="relative group h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300"
              >
                <User className="w-4 h-4 text-cyan-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent 
              align="end" 
              className="w-56 bg-black/95 backdrop-blur-md border-cyan-500/30 shadow-xl shadow-cyan-500/10"
            >
              <div className="px-3 py-2 border-b border-cyan-500/20">
                <p className="text-sm font-medium text-cyan-300">Profile Settings</p>
                <p className="text-xs text-gray-400 font-mono">{formatWalletAddress(walletAddress || "")}</p>
              </div>
              
              <DropdownMenuItem 
                disabled
                className="text-gray-400 focus:text-gray-300 focus:bg-cyan-500/10 disabled:opacity-50"
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                disabled
                className="text-gray-400 focus:text-gray-300 focus:bg-cyan-500/10 disabled:opacity-50"
              >
                <User className="mr-2 h-4 w-4" />
                <span>Update Profile</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="bg-cyan-500/20" />
              
              <DropdownMenuItem 
                onClick={handleDisconnect}
                className="text-red-400 focus:text-red-300 focus:bg-red-500/10 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Disconnect Wallet</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Bottom tech line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
    </div>
  );
};
