
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
      // Mock implementation - replace with actual wallet signing
      const mockSignature = `mock_signature_${Date.now()}`;
      console.log('Generated mock signature:', mockSignature);
      return mockSignature;
    } catch (error: unknown) {
      console.error('Error signing message:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign message';
      throw new Error(errorMessage);
    }
  },

  async verifySignature(walletAddress: string, signature: string): Promise<{ token: string; user: any }> {
    try {
      console.log('Verifying signature for wallet:', walletAddress);
      // Mock implementation - replace with actual API call
      const mockToken = `mock_token_${Date.now()}`;
      const mockUser = {
        wallet: walletAddress,
        twitter: '',
        telegram: ''
      };
      console.log('Generated mock auth response:', { token: mockToken, user: mockUser });
      return { token: mockToken, user: mockUser };
    } catch (error: unknown) {
      console.error('Error verifying signature:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to verify signature';
      throw new Error(errorMessage);
    }
  }
};
