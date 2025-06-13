import os
import tweepy
from typing import Optional

class TwitterService:
    def __init__(self):
        self.api_key = os.getenv("TWITTER_API_KEY")
        self.api_secret = os.getenv("TWITTER_API_SECRET")
        self.access_token = os.getenv("TWITTER_ACCESS_TOKEN")
        self.access_token_secret = os.getenv("TWITTER_ACCESS_TOKEN_SECRET")
        self.bearer_token = os.getenv("TWITTER_BEARER_TOKEN")
        self.username = os.getenv("TWITTER_USERNAME")
        self.client = None

        if all([self.api_key, self.api_secret, self.access_token, self.access_token_secret]):
            auth = tweepy.OAuth1UserHandler(
                self.api_key,
                self.api_secret,
                self.access_token,
                self.access_token_secret
            )
            self.client = tweepy.API(auth)

    async def verify_user(self, username: str) -> bool:
        """Verify if user follows the configured Twitter account."""
        if not self.client or not self.username:
            print("Twitter credentials not configured")
            return False

        try:
            user = self.client.get_user(screen_name=username)
            return user.following
        except Exception as e:
            print(f"Error verifying Twitter user: {e}")
            return False

# Singleton instance
twitter_service = TwitterService() 