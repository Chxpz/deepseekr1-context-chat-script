from typing import Optional, Dict, Any
from dataclasses import dataclass
from pydantic import BaseModel

@dataclass
class User:
    id: Optional[int] = None
    wallet_address: str = ""
    username: Optional[str] = None
    email: Optional[str] = None
    twitter_username: Optional[str] = None
    telegram_username: Optional[str] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "wallet_address": self.wallet_address,
            "username": self.username,
            "email": self.email,
            "twitter_username": self.twitter_username,
            "telegram_username": self.telegram_username,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'User':
        return cls(**data)

class CreateUserDTO(BaseModel):
    wallet_address: str
    twitter_username: Optional[str] = None
    discord_username: Optional[str] = None

class UpdateUserDTO(BaseModel):
    twitter_username: Optional[str] = None
    discord_username: Optional[str] = None
    twitter_verified: Optional[bool] = None
    discord_verified: Optional[bool] = None 