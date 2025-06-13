from fastapi import APIRouter, Depends, HTTPException
from ..services.twitter import TwitterService
from ..services.telegram import TelegramService
from ..services.user import UserService
from ..middleware.auth import get_current_user
from ..models.user import User

router = APIRouter()
twitter_service = TwitterService()
telegram_service = TelegramService()
user_service = UserService()

@router.post("/twitter")
async def verify_twitter(
    twitter_username: str,
    current_user: str = Depends(get_current_user)
):
    """Verify a user's Twitter account."""
    user = await user_service.get_user_by_wallet(current_user)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    is_verified = await twitter_service.verify_user(twitter_username)
    if not is_verified:
        raise HTTPException(status_code=400, detail="Twitter verification failed")
    
    updated_user = await user_service.update_user(
        current_user,
        {"twitter_username": twitter_username, "twitter_verified": True}
    )
    return updated_user

@router.post("/telegram")
async def verify_telegram(
    telegram_username: str,
    current_user: str = Depends(get_current_user)
):
    """Verify a user's Telegram account (if they joined the channel)."""
    user = await user_service.get_user_by_wallet(current_user)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    is_verified = await telegram_service.verify_user(telegram_username)
    if not is_verified:
        raise HTTPException(status_code=400, detail="Telegram verification failed")
    
    updated_user = await user_service.update_user(
        current_user,
        {"telegram_username": telegram_username, "telegram_verified": True}
    )
    return updated_user 