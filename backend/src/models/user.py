from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class User(BaseModel):
    id: int
    wallet_address: str
    twitter_username: Optional[str] = None
    discord_username: Optional[str] = None
    twitter_verified: bool = False
    discord_verified: bool = False
    created_at: datetime
    updated_at: datetime

class CreateUserDTO(BaseModel):
    wallet_address: str
    twitter_username: Optional[str] = None
    discord_username: Optional[str] = None

class UpdateUserDTO(BaseModel):
    twitter_username: Optional[str] = None
    discord_username: Optional[str] = None
    twitter_verified: Optional[bool] = None
    discord_verified: Optional[bool] = None 