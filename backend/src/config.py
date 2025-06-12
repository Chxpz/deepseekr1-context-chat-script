import os
from typing import Dict, Any
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Settings:
    # Server configuration
    PORT: int = int(os.getenv("PORT", "8000"))
    NODE_ENV: str = os.getenv("NODE_ENV", "development")

    # Database configuration
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")

    # Twitter API configuration
    TWITTER_API_KEY: str = os.getenv("TWITTER_API_KEY", "")
    TWITTER_API_SECRET: str = os.getenv("TWITTER_API_SECRET", "")
    TWITTER_ACCESS_TOKEN: str = os.getenv("TWITTER_ACCESS_TOKEN", "")
    TWITTER_ACCESS_TOKEN_SECRET: str = os.getenv("TWITTER_ACCESS_TOKEN_SECRET", "")
    TWITTER_BEARER_TOKEN: str = os.getenv("TWITTER_BEARER_TOKEN", "")
    TWITTER_USERNAME: str = os.getenv("TWITTER_USERNAME", "")

    # Discord configuration
    DISCORD_GUILD_ID: str = os.getenv("DISCORD_GUILD_ID", "")

    # JWT configuration
    JWT_SECRET: str = os.getenv("JWT_SECRET", "")
    JWT_EXPIRES_IN: str = os.getenv("JWT_EXPIRES_IN", "7d")

    # Rate limiting
    RATE_LIMIT_WINDOW_MS: int = 15 * 60 * 1000  # 15 minutes
    RATE_LIMIT_MAX_REQUESTS: int = 100

    def __init__(self):
        self._validate_required_env_vars()

    def _validate_required_env_vars(self) -> None:
        """Validate that all required environment variables are set."""
        required_vars = [
            "DATABASE_URL",
            "TWITTER_API_KEY",
            "TWITTER_API_SECRET",
            "TWITTER_ACCESS_TOKEN",
            "TWITTER_ACCESS_TOKEN_SECRET",
            "TWITTER_BEARER_TOKEN",
            "TWITTER_USERNAME",
            "DISCORD_GUILD_ID",
            "JWT_SECRET"
        ]

        missing_vars = [var for var in required_vars if not getattr(self, var)]
        if missing_vars:
            raise ValueError(f"Missing required environment variables: {', '.join(missing_vars)}")

    def dict(self) -> Dict[str, Any]:
        """Convert settings to dictionary."""
        return {
            key: value for key, value in self.__dict__.items()
            if not key.startswith('_')
        }

# Create settings instance
settings = Settings() 