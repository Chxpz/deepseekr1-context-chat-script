from typing import Optional
import discord
from ..config import settings

class DiscordService:
    def __init__(self):
        self.client = discord.Client(intents=discord.Intents.default())
        self.guild_id = settings.DISCORD_GUILD_ID

    async def verify_user(self, username: str) -> bool:
        """Verify if a user is a member of the Discord server."""
        try:
            # Get the guild
            guild = await self.client.fetch_guild(self.guild_id)
            if not guild:
                return False

            # Get all members
            members = await guild.fetch_members()
            
            # Check if user is a member
            return any(m.name == username for m in members)
        except Exception as e:
            print(f"Error verifying Discord user: {e}")
            return False

    async def check_membership(self, username: str) -> bool:
        """Check if a user is a member of the target guild."""
        try:
            # Get the guild
            guild = self.client.get_guild(int(self.guild_id))
            if not guild:
                return False
            
            # Get all members
            members = await guild.fetch_members()
            
            # Check if username matches any member
            return any(
                member.name.lower() == username.lower() or
                str(member).lower() == username.lower()
                for member in members
            )
        except Exception as e:
            print(f"Error checking Discord membership: {e}")
            return False

    async def start(self):
        """Start the Discord client."""
        await self.client.start(settings.DISCORD_BOT_TOKEN) 