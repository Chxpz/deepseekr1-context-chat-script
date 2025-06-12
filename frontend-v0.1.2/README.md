# Frontend Application

A React-based frontend application that provides a user interface for wallet authentication, social media verification, and chat functionality.

## Features

- Wallet connection (MetaMask, Coinbase Wallet)
- Social media verification (Twitter, Discord)
- Real-time chat interface
- Responsive design
- Dark/Light theme support

## Prerequisites

- Node.js 20+
- npm 9+
- Docker and Docker Compose (for containerized deployment)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# API Configuration
VITE_API_URL=http://localhost/api

# Social Media
VITE_TWITTER_USERNAME=your_twitter_username
VITE_DISCORD_GUILD_ID=your_discord_guild_id
```

## Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Building for Production

1. Build the application:
```bash
npm run build
```

2. Preview the production build:
```bash
npm run preview
```

## Docker Deployment

Build and run with Docker Compose:
```bash
docker-compose up --build
```

The application will be available at `http://localhost`.

## Project Structure

```
src/
├── components/     # React components
├── hooks/         # Custom React hooks
├── services/      # API and external service integrations
├── styles/        # Global styles and themes
└── utils/         # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Code splitting
- Lazy loading
- Image optimization
- Gzip compression
- Browser caching
