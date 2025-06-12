
# Autonoma - AI Agent Payment Platform

## Project Overview

Autonoma is a cutting-edge AI agent payment platform currently in development for the Coinbase 'Agents in Action' Hackathon. The platform enables seamless interactions between users and AI agents through a secure wallet-based authentication system with a beautiful, animated modal interface.

### Key Features

- **Wallet Authentication**: Secure Web3 authentication using MetaMask and message signing
- **Community Verification**: Social media follow/join verification for X and Telegram
- **Beautiful Modal Interface**: Animated, cyberpunk-themed authentication modal with multi-step flow
- **AI Chat Interface**: Interactive chat system for communicating with AI agents
- **User Profile Management**: Social media handle verification for platform access
- **Responsive Design**: Modern, cyberpunk-themed UI with animated backgrounds
- **Real-time Updates**: Live authentication state management and route protection
- **Global Error Handling**: Comprehensive error boundary and API error management
- **Social Sharing**: High-tech share button for platform promotion

### Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Framework**: Tailwind CSS, shadcn/ui components
- **State Management**: React hooks with localStorage persistence
- **Routing**: React Router DOM with protected routes
- **API Layer**: Centralized fetch-based API service with error handling
- **Wallet Integration**: MetaMask/Ethereum provider
- **Icons**: Lucide React
- **Animations**: CSS animations with Tailwind

## Project Structure

```
src/
├── components/
│   ├── auth/                    # Authentication components
│   │   ├── AuthStepContent.tsx  # Multi-step auth flow content
│   │   ├── ModalBackground.tsx  # Animated modal background
│   │   └── ModalHeader.tsx      # Modal header with logo
│   ├── AccessModal.tsx          # Main authentication modal
│   ├── ChatInterface.tsx        # Main chat interface
│   ├── UserProfileModal.tsx     # User profile setup modal
│   ├── ShareButton.tsx          # Social sharing component
│   ├── ErrorBoundary.tsx        # Global error handling
│   └── ui/                      # shadcn/ui components
├── hooks/
│   └── useWalletAuth.ts         # Wallet authentication hook
├── services/                    # API service layer
│   ├── api.ts                   # Base API service
│   ├── auth.ts                  # Authentication API calls
│   └── user.ts                  # User profile API calls
├── config/
│   └── api.ts                   # API configuration
├── pages/
│   ├── Index.tsx                # Landing page
│   ├── Chat.tsx                 # Protected chat page
│   └── NotFound.tsx             # 404 page
├── types/
│   └── env.d.ts                 # Environment type definitions
└── styles/                      # CSS styles and animations
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MetaMask browser extension
- Modern web browser with Web3 support

### Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd autonoma
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env file or set environment variables
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_VERSION=1.0.0
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Authentication Flow with Social Media Verification

### Frontend Flow

1. **Landing Page**: User clicks "Connect Wallet" to open the authentication modal
2. **Beautiful Modal**: Animated modal opens with cyberpunk theme and logo
3. **Wallet Connection**: User clicks "Connect Wallet" to connect MetaMask
4. **Message Signing**: Modal shows signing state while user signs nonce in MetaMask
5. **Social Verification**: User enters their X and Telegram usernames
6. **Community Joining**: User follows on X and joins Telegram group
7. **Profile Verification**: Backend verifies user has followed/joined (mock in demo)
8. **Success State**: Modal shows success animation before redirecting to chat
9. **Protected Chat**: User gains access to the AI chat interface

### Technical Implementation

The authentication system consists of:
- `AccessModal.tsx`: Main authentication modal with animated background
- `AuthStepContent.tsx`: Multi-step content based on authentication state
- `UserProfileModal.tsx`: Social media verification modal
- `useWalletAuth.ts`: Hook managing authentication state and localStorage persistence

## Backend Integration Guide for Social Media Verification

### API Endpoints Required

The frontend API service (`src/services/api.ts`) expects the following backend endpoints:

#### 1. Authentication Endpoints

**GET `/api/auth/nonce?wallet={walletAddress}`**
- Purpose: Generate a unique nonce for wallet signature
- Response:
```json
{
  "nonce": "random_string_12345"
}
```

**POST `/api/auth/verify`**
- Purpose: Verify wallet signature and authenticate user
- Request body:
```json
{
  "wallet": "0x1234...",
  "signature": "0xabcd..."
}
```
- Response:
```json
{
  "token": "jwt_token_here",
  "user": {
    "wallet": "0x1234...",
    "twitter": "@username",
    "telegram": "@username"
  }
}
```

#### 2. User Profile Endpoints

**GET `/api/user/profile?wallet={walletAddress}`**
- Purpose: Retrieve user profile information
- Response:
```json
{
  "wallet": "0x1234...",
  "twitter": "@username",
  "telegram": "@username"
}
```

**POST `/api/user/profile`**
- Purpose: Create new user profile
- Request body:
```json
{
  "wallet": "0x1234...",
  "twitter": "@username",
  "telegram": "@username"
}
```
- Response: Same as GET profile response

**PUT `/api/user/profile`**
- Purpose: Update existing user profile
- Request body: Same as POST
- Response: Same as GET profile response

#### 3. Social Media Verification Endpoints (NEW)

**POST `/api/verify/social`**
- Purpose: Verify user follows/joined social media
- Request body:
```json
{
  "wallet": "0x1234...",
  "twitter": "@username",
  "telegram": "@username"
}
```
- Response:
```json
{
  "verified": true,
  "twitter_verified": true,
  "telegram_verified": true,
  "message": "Social media accounts verified successfully"
}
```

### Social Media Verification Implementation

To implement the social media verification:

1. **Twitter API Integration**:
   - Use the Twitter API to check if a user with the given handle follows your account
   - Requires Twitter API credentials and OAuth setup
   - Implement webhook for real-time follow events

2. **Telegram Bot Integration**:
   - Create a Telegram bot that monitors your group members
   - Use the Telegram Bot API to check if a user with the given username is in your group
   - Set up webhook for group join notifications

3. **Verification Process**:
   - When user submits their handles, store them in the database
   - Periodically check if the user has followed/joined (or use webhooks)
   - Once verified, update the user's verification status
   - Allow access to protected routes only for verified users

### Backend Implementation Example (Node.js/Express)

```javascript
const express = require('express');
const { ethers } = require('ethers');
const jwt = require('jsonwebtoken');
const { TwitterApi } = require('twitter-api-v2');
const { Telegraf } = require('telegraf');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-deployed-domain.com'],
  credentials: true
}));

// Initialize Twitter API client
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

// Initialize Telegram bot
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const TELEGRAM_GROUP_ID = process.env.TELEGRAM_GROUP_ID;
const TWITTER_ACCOUNT_ID = process.env.TWITTER_ACCOUNT_ID;

// Store nonces and verification status temporarily (use Redis/DB in production)
const nonces = new Map();
const pendingVerifications = new Map();
const verifiedUsers = new Map();

// Generate nonce endpoint
app.get('/api/auth/nonce', (req, res) => {
  const { wallet } = req.query;
  const nonce = Math.random().toString(36).substring(2, 15);
  nonces.set(wallet.toLowerCase(), nonce);
  
  res.json({ nonce });
});

// Verify signature endpoint
app.post('/api/auth/verify', async (req, res) => {
  const { wallet, signature } = req.body;
  const nonce = nonces.get(wallet.toLowerCase());
  
  if (!nonce) {
    return res.status(400).json({ error: 'Nonce not found' });
  }
  
  try {
    const message = `Sign this nonce: ${nonce}`;
    const recoveredAddress = ethers.utils.verifyMessage(message, signature);
    
    if (recoveredAddress.toLowerCase() !== wallet.toLowerCase()) {
      return res.status(401).json({ error: 'Invalid signature' });
    }
    
    const token = jwt.sign({ wallet: wallet.toLowerCase() }, process.env.JWT_SECRET);
    nonces.delete(wallet.toLowerCase());
    
    // Check if user is already verified
    const isVerified = verifiedUsers.get(wallet.toLowerCase());
    const user = { 
      wallet: wallet.toLowerCase(),
      twitter: pendingVerifications.get(wallet.toLowerCase())?.twitter || null,
      telegram: pendingVerifications.get(wallet.toLowerCase())?.telegram || null,
      verified: isVerified || false
    };
    
    res.json({
      token,
      user
    });
  } catch (error) {
    res.status(401).json({ error: 'Signature verification failed' });
  }
});

// User profile endpoints
app.get('/api/user/profile', async (req, res) => {
  const { wallet } = req.query;
  // Get verification status and social handles
  const verificationData = pendingVerifications.get(wallet.toLowerCase());
  const isVerified = verifiedUsers.get(wallet.toLowerCase());
  
  if (!verificationData) {
    return res.status(404).json({ error: 'Profile not found' });
  }
  
  res.json({
    wallet: wallet.toLowerCase(),
    twitter: verificationData.twitter,
    telegram: verificationData.telegram,
    verified: isVerified || false
  });
});

app.post('/api/user/profile', async (req, res) => {
  const { wallet, twitter, telegram } = req.body;
  
  // Store profile data for verification
  pendingVerifications.set(wallet.toLowerCase(), {
    twitter: twitter,
    telegram: telegram,
    createdAt: new Date()
  });
  
  // Start verification process
  checkSocialMediaVerification(wallet.toLowerCase());
  
  res.json({
    wallet: wallet.toLowerCase(),
    twitter,
    telegram,
    verified: false,
    message: 'Profile created, verification pending'
  });
});

// Social media verification endpoint
app.post('/api/verify/social', async (req, res) => {
  const { wallet } = req.body;
  
  const verificationData = pendingVerifications.get(wallet.toLowerCase());
  if (!verificationData) {
    return res.status(404).json({ error: 'No verification pending' });
  }
  
  try {
    const { twitter, telegram } = verificationData;
    
    // Check Twitter follow status
    let twitterVerified = false;
    try {
      // Remove @ if present
      const twitterHandle = twitter.startsWith('@') ? twitter.substring(1) : twitter;
      const user = await twitterClient.v2.userByUsername(twitterHandle);
      const following = await twitterClient.v2.following(user.data.id);
      twitterVerified = following.data.some(follow => follow.id === TWITTER_ACCOUNT_ID);
    } catch (error) {
      console.error('Twitter verification error:', error);
    }
    
    // Check Telegram group membership
    let telegramVerified = false;
    try {
      // Remove @ if present
      const telegramUsername = telegram.startsWith('@') ? telegram.substring(1) : telegram;
      const chatMember = await bot.telegram.getChatMember(TELEGRAM_GROUP_ID, telegramUsername);
      telegramVerified = ['member', 'administrator', 'creator'].includes(chatMember.status);
    } catch (error) {
      console.error('Telegram verification error:', error);
    }
    
    // Both platforms must be verified
    const verified = twitterVerified && telegramVerified;
    
    if (verified) {
      verifiedUsers.set(wallet.toLowerCase(), true);
    }
    
    res.json({
      verified,
      twitter_verified: twitterVerified,
      telegram_verified: telegramVerified,
      message: verified 
        ? 'Social media accounts verified successfully' 
        : 'Some accounts could not be verified'
    });
  } catch (error) {
    res.status(500).json({ error: 'Verification failed', message: error.message });
  }
});

// Helper function to periodically check verification status
async function checkSocialMediaVerification(wallet) {
  // In production, implement a proper verification queue with retry logic
  setTimeout(async () => {
    try {
      // Make internal call to verify endpoint
      const verificationData = pendingVerifications.get(wallet);
      if (!verificationData) return;
      
      // For demo purposes, we'll auto-verify after a delay
      // In production, this would check actual social media follows/joins
      verifiedUsers.set(wallet, true);
      
      console.log(`User ${wallet} verified successfully`);
    } catch (error) {
      console.error(`Verification failed for ${wallet}:`, error);
    }
  }, 5000); // Check after 5 seconds for demo
}

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Database Schema

Suggested user table structure:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  wallet VARCHAR(42) UNIQUE NOT NULL,
  twitter VARCHAR(100),
  telegram VARCHAR(100),
  twitter_verified BOOLEAN DEFAULT FALSE,
  telegram_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_wallet ON users(wallet);
CREATE INDEX idx_users_verification ON users(twitter_verified, telegram_verified);
```
