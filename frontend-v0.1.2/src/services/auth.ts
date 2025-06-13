export const authService = {
  async fetchNonce(walletAddress: string): Promise<string> {
    try {
      console.log('Fetching nonce for wallet:', walletAddress);
      // Mock implementation - replace with actual API call
      const mockNonce = Math.random().toString(36).substring(7);
      console.log('Generated mock nonce:', mockNonce);
      return mockNonce;
    } catch (error: unknown) {
      console.error('Error fetching nonce:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch nonce';
      throw new Error(errorMessage);
    }
  },

  async signMessage(message: string): Promise<string> {
    try {
      console.log('Signing message:', message);
      
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, accounts[0]],
      });

      console.log('Generated signature:', signature);
      return signature;
    } catch (error: unknown) {
      console.error('Error signing message:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign message';
      throw new Error(errorMessage);
    }
  },

  async verifySignature(walletAddress: string, signature: string): Promise<{ token: string }> {
    try {
      console.log('Verifying signature for wallet:', walletAddress);
      // Mock implementation - replace with actual API call
      const mockToken = `mock_token_${Date.now()}`;
      console.log('Generated mock auth response:', { token: mockToken });
      return { token: mockToken };
    } catch (error: unknown) {
      console.error('Error verifying signature:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to verify signature';
      throw new Error(errorMessage);
    }
  }
};
