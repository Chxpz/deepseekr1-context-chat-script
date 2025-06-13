export interface User {
  id: string;
  username: string;
  wallet: string;
  // ... outros campos
}

export interface WalletAuthState {
  isAuthenticated: boolean;
  user: User | null;
  logout: () => void;
  // ... outros campos
}

export interface AccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
} 