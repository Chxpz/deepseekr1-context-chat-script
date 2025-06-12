import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';
import { userService } from '../services/user';

interface User {
  wallet_address: string;
  twitter_username?: string;
  discord_username?: string;
  twitter_verified: boolean;
  discord_verified: boolean;
}

interface WalletAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  user: User | null;
  wallet: string | null;
  profile: {
    twitter?: string;
    discord?: string;
  };
  connectWallet: () => Promise<void>;
  disconnect: () => void;
  disconnectWallet: () => void;
  verifyTwitter: (username: string) => Promise<void>;
  verifyDiscord: (username: string) => Promise<void>;
}

export const useWalletAuth = (): WalletAuthState => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [wallet, setWallet] = useState<string | null>(null);
  const [profile, setProfile] = useState<{ twitter?: string; discord?: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      const userData = await userService.getProfile();
      setUser(userData);
      setWallet(userData.wallet_address);
      setProfile({
        twitter: userData.twitter_username,
        discord: userData.discord_username
      });
      setIsAuthenticated(true);
    } catch (err) {
      console.error('Auth check failed:', err);
      setIsAuthenticated(false);
      setUser(null);
      setWallet(null);
      setProfile({});
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false);
    }
  };

  const connectWallet = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { address, signature } = await authService.signMessage();
      const response = await authService.verifySignature(address, signature, 'Sign this message to authenticate with Autonoma AI');
      
      localStorage.setItem('token', response.token);
      setUser(response.user);
      setWallet(address);
      setProfile({
        twitter: response.user.twitter_username,
        discord: response.user.discord_username
      });
      setIsAuthenticated(true);
    } catch (err) {
      console.error('Wallet connection failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    setWallet(null);
    setProfile({});
    navigate('/');
  };

  const disconnectWallet = () => {
    disconnect();
  };

  const verifyTwitter = async (username: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedUser = await userService.updateProfile({ twitter_username: username });
      setUser(updatedUser);
      setProfile(prev => ({ ...prev, twitter: username }));
    } catch (err) {
      console.error('Twitter verification failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to verify Twitter');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyDiscord = async (username: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedUser = await userService.updateProfile({ discord_username: username });
      setUser(updatedUser);
      setProfile(prev => ({ ...prev, discord: username }));
    } catch (err) {
      console.error('Discord verification failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to verify Discord');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isAuthenticated,
    isLoading,
    error,
    user,
    wallet,
    profile,
    connectWallet,
    disconnect,
    disconnectWallet,
    verifyTwitter,
    verifyDiscord
  };
};
