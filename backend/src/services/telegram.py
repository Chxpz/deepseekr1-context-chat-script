import os
import requests
from typing import Optional

class TelegramService:
    def __init__(self):
        self.bot_token = os.getenv("TELEGRAM_BOT_TOKEN")
        self.channel_id = os.getenv("TELEGRAM_CHANNEL_ID")
        self.base_url = f"https://api.telegram.org/bot{self.bot_token}"

    async def send_message(self, message: str) -> bool:
        """Send message to Telegram channel."""
        if not self.bot_token or not self.channel_id:
            print("Telegram credentials not configured")
            return False

        try:
            url = f"{self.base_url}/sendMessage"
            data = {
                "chat_id": self.channel_id,
                "text": message,
                "parse_mode": "HTML"
            }
            response = requests.post(url, json=data)
            return response.status_code == 200
        except Exception as e:
            print(f"Error sending Telegram message: {str(e)}")
            return False

    async def verify_user(self, username: str) -> bool:
        """
        Verify if a user (by username) is a member of the Telegram channel.
        Returns True if the user is a member, False otherwise.
        """
        try:
            # Get all members (Telegram API does not provide a direct way to list all members for bots in private channels)
            # So we try to get the member by username
            member = await self.bot.get_chat_member(chat_id=self.channel_id, user_id=f"@{username}")
            # If the call succeeds and the user is not 'left' or 'kicked', they are a member
            if member.status not in ["left", "kicked"]:
                return True
            return False
        except TelegramError as e:
            # User not found or not a member
            return False
        except Exception as e:
            print(f"Error verifying Telegram user: {e}")
            return False 

# Singleton instance
telegram_service = TelegramService() 