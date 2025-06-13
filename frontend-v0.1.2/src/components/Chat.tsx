import React, { useEffect } from 'react';
import { useWalletAuth } from '../hooks/useWalletAuth';
import { ChatInterface } from './ChatInterface';
import { AccessModal } from './AccessModal';

export const Chat: React.FC = () => {
  const {
    isAuthenticated,
    isLoading,
    user
  } = useWalletAuth();

  const [showAccessModal, setShowAccessModal] = React.useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setShowAccessModal(true);
    }
  }, [isLoading, isAuthenticated]);

  const handleCloseAccessModal = () => {
    if (user?.twitter_verified && user?.discord_verified) {
      setShowAccessModal(false);
    }
  };

  const handleAuthenticated = () => {
    setShowAccessModal(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AccessModal
        isOpen={showAccessModal}
        onClose={handleCloseAccessModal}
        onAuthenticated={handleAuthenticated}
      />
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <ChatInterface />
    </div>
  );
}; 