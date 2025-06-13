import { useState, useEffect } from 'react';
import { authService } from '@/services/auth';

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  walletAddress: string | null;
  error: string | null;
}

export const useWalletAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    token: null,
    walletAddress: null,
    error: null,
  });

  useEffect(() => {
    const checkWalletConnection = async () => {
      const savedToken = localStorage.getItem('autonoma_auth_token');
      const savedWallet = localStorage.getItem('autonoma_wallet_address');

      if (savedToken && savedWallet && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts && accounts.length > 0 && accounts[0].toLowerCase() === savedWallet.toLowerCase()) {
            setAuthState(prev => ({
              ...prev,
              isAuthenticated: true,
              isLoading: false,
              token: savedToken,
              walletAddress: savedWallet,
            }));
            return;
          } else {
            // Wallet not connected or different wallet
            localStorage.removeItem('autonoma_auth_token');
            localStorage.removeItem('autonoma_wallet_address');
          }
        } catch (error) {
          // On error, clear session
          localStorage.removeItem('autonoma_auth_token');
          localStorage.removeItem('autonoma_wallet_address');
        }
      }
      setAuthState(prev => ({
        ...prev,
        isAuthenticated: false,
        isLoading: false,
        token: null,
        walletAddress: null,
      }));
    };
    checkWalletConnection();
  }, []);

  const authenticate = async (walletAddress: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }
      const nonce = await authService.fetchNonce(walletAddress);
      // Professional web3-style message
      const message = `Welcome to Autonoma!\n\nTo verify ownership of this wallet and sign in, please sign this one-time code:\n\nNonce: ${nonce}\n\nThis request will not trigger any blockchain transaction or cost any gas.`;
      const signature = await authService.signMessage(message);
      const { token } = await authService.verifySignature(walletAddress, signature);
      localStorage.setItem('autonoma_auth_token', token);
      localStorage.setItem('autonoma_wallet_address', walletAddress);
      setAuthState({
        isAuthenticated: true,
        isLoading: false,
        token,
        walletAddress,
        error: null,
      });
      return { token, walletAddress };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('autonoma_auth_token');
    localStorage.removeItem('autonoma_wallet_address');
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
      token: null,
      walletAddress: null,
      error: null,
    });
  };

  console.log('useWalletAuth: Current state -', {
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    hasToken: !!authState.token,
    hasWallet: !!authState.walletAddress
  });

  return {
    ...authState,
    authenticate,
    logout,
  };
};
