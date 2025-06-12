from typing import Optional
import tweepy
from ..config import settings

class TwitterService:
    def __init__(self):
        self.client = tweepy.Client(
            bearer_token=settings.TWITTER_BEARER_TOKEN,
            consumer_key=settings.TWITTER_API_KEY,
            consumer_secret=settings.TWITTER_API_SECRET,
            access_token=settings.TWITTER_ACCESS_TOKEN,
            access_token_secret=settings.TWITTER_ACCESS_TOKEN_SECRET
        )

    async def verify_user(self, username: str) -> bool:
        """Verify if a user follows the Twitter account."""
        try:
            # Get the user's ID
            user = self.client.get_user(username=username)
            if not user.data:
                return False

            # Check if they follow the target account
            follows = self.client.get_users_following(
                user.data.id,
                max_results=100
            )

            target_username = settings.TWITTER_USERNAME
            target_user = self.client.get_user(username=target_username)
            if not target_user.data:
                return False

            return any(f.id == target_user.data.id for f in follows.data or [])
        except Exception as e:
            print(f"Error verifying Twitter user: {e}")
            return False 