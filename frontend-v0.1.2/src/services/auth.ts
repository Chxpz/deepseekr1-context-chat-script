import { ethers } from 'ethers';

interface AuthResponse {
  token: string;
  user: {
    wallet_address: string;
    twitter_username?: string;
    discord_username?: string;
    twitter_verified: boolean;
    discord_verified: boolean;
  };
}

class AuthService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
  }

  async signMessage(): Promise<{ address: string; signature: string }> {
    if (!window.ethereum) {
      throw new Error('No Ethereum wallet found');
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    // Get nonce from backend
    const nonce = await this.fetchNonce(address);

    // Sign message
    const message = `Sign this message to authenticate with Autonoma AI. Nonce: ${nonce}`;
    const signature = await signer.signMessage(message);

    return { address, signature };
  }

  async fetchNonce(address: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/auth/nonce`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch nonce');
    }

    const data = await response.json();
    return data.nonce;
  }

  async verifySignature(address: string, signature: string, message: string): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/auth/wallet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address,
        signature,
        message,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to verify signature');
    }

    return response.json();
  }
}

export const authService = new AuthService();
