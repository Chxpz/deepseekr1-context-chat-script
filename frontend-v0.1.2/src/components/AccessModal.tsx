import React, { useState } from 'react';
import { useWalletAuth } from '../hooks/useWalletAuth';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Loader2 } from 'lucide-react';

interface AccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
}

export const AccessModal: React.FC<AccessModalProps> = ({ isOpen, onClose, onAuthenticated }) => {
  const {
    isAuthenticated,
    isLoading,
    error,
    user,
    wallet,
    connectWallet,
    disconnectWallet,
    verifyTwitter,
    verifyDiscord
  } = useWalletAuth();

  const [twitterUsername, setTwitterUsername] = useState('');
  const [discordUsername, setDiscordUsername] = useState('');

  if (!isOpen) return null;

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (err) {
      console.error('Failed to connect wallet:', err);
    }
  };

  const handleTwitterVerify = async () => {
    try {
      await verifyTwitter(twitterUsername);
      setTwitterUsername('');
    } catch (err) {
      console.error('Failed to verify Twitter:', err);
    }
  };

  const handleDiscordVerify = async () => {
    try {
      await verifyDiscord(discordUsername);
      setDiscordUsername('');
    } catch (err) {
      console.error('Failed to verify Discord:', err);
    }
  };

  const handleAccess = () => {
    onAuthenticated();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-white mb-6">Access Chat</h2>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        ) : error ? (
          <div className="text-red-500 mb-4">{error}</div>
        ) : !isAuthenticated ? (
          <div className="space-y-4">
            <p className="text-gray-300 mb-4">
              Connect your wallet to access the chat
            </p>
            <Button
              onClick={handleConnect}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Connect Wallet
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-300">Connected Wallet:</p>
              <p className="text-white font-mono text-sm break-all">{wallet}</p>
            </div>

            {!user?.twitter_verified && (
              <div className="space-y-2">
                <p className="text-gray-300">Verify Twitter</p>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Twitter Username"
                    value={twitterUsername}
                    onChange={(e) => setTwitterUsername(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleTwitterVerify}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Verify
                  </Button>
                </div>
              </div>
            )}

            {!user?.discord_verified && (
              <div className="space-y-2">
                <p className="text-gray-300">Verify Discord</p>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Discord Username"
                    value={discordUsername}
                    onChange={(e) => setDiscordUsername(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleDiscordVerify}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Verify
                  </Button>
                </div>
              </div>
            )}

            {user?.twitter_verified && user?.discord_verified && (
              <Button
                onClick={handleAccess}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Access Chat
              </Button>
            )}

            <Button
              onClick={disconnectWallet}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              Disconnect
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
