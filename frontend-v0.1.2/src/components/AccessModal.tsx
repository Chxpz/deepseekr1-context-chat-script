import { useState } from "react";
import { X, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useWalletAuth } from "@/hooks/useWalletAuth";
import { UserProfileModal } from "./UserProfileModal";
import { AuthStepContent } from "./auth/AuthStepContent";
import { ModalBackground } from "./auth/ModalBackground";
import { ModalHeader } from "./auth/ModalHeader";

interface AccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
}

export const AccessModal = ({ isOpen, onClose, onAuthenticated }: AccessModalProps) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [authStep, setAuthStep] = useState<'connect' | 'signing' | 'profile' | 'complete'>('connect');
  const [showProfileModal, setShowProfileModal] = useState(false);
  
  const { authenticate, checkUserProfile, createUserProfile, isLoading, error } = useWalletAuth();

  const connectWallet = async () => {
    setAuthStep('connect');
    try {
      // Check if MetaMask is available
      if (window.ethereum && !window.ethereum.isCoinbaseWallet) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        
        if (accounts.length > 0) {
          const address = accounts[0];
          setWalletAddress(address);
          await handleAuthentication(address);
        }
      } else {
        // Redirect to MetaMask if not available
        window.open('https://metamask.io/', '_blank');
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  const handleAuthentication = async (address: string) => {
    try {
      setAuthStep('signing');
      
      // First authenticate with signature
      await authenticate(address);
      
      // Check if user has a complete profile
      const existingProfile = await checkUserProfile(address);
      
      // We now require both Twitter and Telegram handles
      if (existingProfile && existingProfile.twitter && existingProfile.telegram) {
        // User has complete profile with required social media handles
        setAuthStep('complete');
        setTimeout(() => {
          onAuthenticated();
          onClose();
        }, 1500);
      } else {
        // Show profile setup modal for social media verification
        setAuthStep('profile');
        setShowProfileModal(true);
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      setAuthStep('connect');
    }
  };

  const handleProfileSubmit = async (profileData: { twitter: string; telegram: string }) => {
    if (!walletAddress) return;
    
    // Create profile with the wallet and social media handles (no email/discord)
    await createUserProfile({
      wallet: walletAddress,
      twitter: profileData.twitter,
      telegram: profileData.telegram,
    });
    
    setShowProfileModal(false);
    setAuthStep('complete');
    
    // In a real implementation, this is where backend verification would happen
    // For now we immediately proceed to successful authentication
    setTimeout(() => {
      onAuthenticated();
      onClose();
    }, 1500);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent 
          className="max-w-2xl bg-black/95 border-2 border-cyan-500/30 backdrop-blur-xl text-white relative p-8 mx-auto my-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 fixed"
          hideCloseButton={true}
        >
          <ModalBackground />

          {/* Our custom close button */}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 z-20 p-3 rounded-full bg-black/40 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-200 flex items-center justify-center group"
          >
            <X className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
          </button>

          <ModalHeader />

          <div className="space-y-6 relative z-10">
            {error && (
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <AuthStepContent 
              authStep={authStep}
              isLoading={isLoading}
              onConnectWallet={connectWallet}
            />

            <div className="text-center text-xs text-gray-500 mt-6">
              By connecting, you agree to our community guidelines and social verification process.
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <UserProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onSubmit={handleProfileSubmit}
        walletAddress={walletAddress || ''}
      />
    </>
  );
};
