# Backend Service

A FastAPI-based backend service that handles authentication, user management, and social media verification.

## Features

- Wallet-based authentication using Web3
- JWT token management
- User profile management
- Twitter and Discord verification
- Rate limiting
- PostgreSQL database integration

## Prerequisites

- Python 3.9+
- PostgreSQL 15+
- Docker and Docker Compose (for containerized deployment)

## Environment Variables

Create a `.env` file in the backend root with:

```env
# Server (optional)
PORT=8000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/hackathon

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Twitter API
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret
TWITTER_ACCESS_TOKEN=your_twitter_access_token
TWITTER_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret
TWITTER_BEARER_TOKEN=your_twitter_bearer_token
TWITTER_USERNAME=your_twitter_username

# Telegram
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHANNEL_ID=your_telegram_channel_id

# Discord
DISCORD_GUILD_ID=your_discord_guild_id
```

## API Endpoints

### Authentication
- `POST /api/auth/nonce` - Get authentication nonce
- `POST /api/auth/wallet` - Authenticate with wallet
- `GET /api/auth/me` - Get current user info

### Verification
- `POST /api/verify/twitter` - Verify Twitter account
- `POST /api/verify/discord` - Verify Discord account

## Development

1. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
.\venv\Scripts\activate  # Windows
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the development server:
```bash
uvicorn src.main:app --reload
```

## Docker Deployment

Build and run with Docker Compose:
```bash
docker-compose up --build
```

The API will be available at `http://localhost:8000`.

## Database

The application uses PostgreSQL. The database schema is automatically created on startup.

## Security

- JWT-based authentication
- Rate limiting on sensitive endpoints
- Input validation using Pydantic models
- Secure password hashing
- CORS protection

## Error Handling
The API returns appropriate HTTP status codes and error messages:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 429: Too Many Requests
- 500: Internal Server Error

## Development
- Use `black` for code formatting
- Use `isort` for import sorting
- Use `flake8` for linting
- Write tests for new features

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details. 