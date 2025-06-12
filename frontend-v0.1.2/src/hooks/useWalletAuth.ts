
import { useState, useEffect } from 'react';
import { authService } from '@/services/auth';
import { userService } from '@/services/user';

export interface UserProfile {
  wallet: string;
  twitter?: string;
  telegram?: string;
  email?: string;
  discord?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  user: UserProfile | null;
  error: string | null;
}

export const useWalletAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    token: null,
    user: null,
    error: null,
  });

  useEffect(() => {
    console.log('useWalletAuth: Checking for saved authentication...');
    
    const savedToken = localStorage.getItem('autonoma_auth_token');
    const savedUser = localStorage.getItem('autonoma_user_profile');
    
    console.log('useWalletAuth: Saved token exists:', !!savedToken);
    console.log('useWalletAuth: Saved user exists:', !!savedUser);
    
    if (savedToken && savedUser) {
      console.log('useWalletAuth: Restoring authentication state');
      setAuthState(prev => ({
        ...prev,
        isAuthenticated: true,
        isLoading: false,
        token: savedToken,
        user: JSON.parse(savedUser),
      }));
    } else {
      console.log('useWalletAuth: No saved authentication found');
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
      }));
    }
  }, []);

  const checkUserProfile = async (wallet: string): Promise<UserProfile | null> => {
    return userService.getProfile(wallet);
  };

  const createUserProfile = async (profileData: UserProfile): Promise<UserProfile> => {
    return userService.createProfile(profileData);
  };

  const authenticate = async (walletAddress: string) => {
    console.log('useWalletAuth: Starting authentication for wallet:', walletAddress);
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const nonce = await authService.fetchNonce(walletAddress);
      const message = `Sign this nonce: ${nonce}`;
      const signature = await authService.signMessage(message);
      const { token, user } = await authService.verifySignature(walletAddress, signature);
      
      console.log('useWalletAuth: Authentication successful, storing data');
      
      localStorage.setItem('autonoma_auth_token', token);
      localStorage.setItem('autonoma_user_profile', JSON.stringify(user));
      
      setAuthState({
        isAuthenticated: true,
        isLoading: false,
        token,
        user,
        error: null,
      });
      
      console.log('useWalletAuth: Authentication state updated');
      return { token, user };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
      console.error('useWalletAuth: Authentication failed:', errorMessage);
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  const logout = () => {
    console.log('useWalletAuth: Logging out');
    localStorage.removeItem('autonoma_auth_token');
    localStorage.removeItem('autonoma_user_profile');
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
      token: null,
      user: null,
      error: null,
    });
  };

  console.log('useWalletAuth: Current state -', {
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    hasToken: !!authState.token,
    hasUser: !!authState.user
  });

  return {
    ...authState,
    authenticate,
    logout,
    checkUserProfile,
    createUserProfile,
  };
};
