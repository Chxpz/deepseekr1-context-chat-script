import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface UserProfile {
  wallet_address: string;
  twitter_username?: string;
  discord_username?: string;
  twitter_verified: boolean;
  discord_verified: boolean;
}

interface VerificationResponse {
  verified: boolean;
}

export const userService = {
  async getProfile(): Promise<UserProfile> {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.get<UserProfile>(`${API_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw new Error('Failed to fetch profile');
    }
  },

  async updateProfile(data: {
    twitter_username?: string;
    discord_username?: string;
  }): Promise<UserProfile> {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.put<UserProfile>(`${API_URL}/user/profile`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw new Error('Failed to update profile');
    }
  },

  async verifyTwitter(username: string): Promise<boolean> {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.post<VerificationResponse>(`${API_URL}/verify/twitter`, { username }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.verified;
    } catch (error) {
      console.error('Error verifying Twitter:', error);
      throw new Error('Failed to verify Twitter');
    }
  },

  async verifyDiscord(username: string): Promise<boolean> {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.post<VerificationResponse>(`${API_URL}/verify/discord`, { username }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.verified;
    } catch (error) {
      console.error('Error verifying Discord:', error);
      throw new Error('Failed to verify Discord');
    }
  }
};
