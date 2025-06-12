from fastapi import APIRouter, Depends, HTTPException
from ..services.auth import AuthService
from ..middleware.auth import get_current_user
from ..models.user import User
from ..middleware.rate_limit import rate_limit

router = APIRouter()
auth_service = AuthService()

@router.post("/nonce")
@rate_limit(times=5, period=60)
async def get_nonce(wallet_address: str):
    """Generate a nonce for wallet authentication."""
    return {"nonce": f"Sign this message to authenticate: {wallet_address}"}

@router.post("/wallet")
@rate_limit(times=5, period=60)
async def authenticate_wallet(wallet_address: str, signature: str, message: str):
    """Authenticate a wallet using a signature."""
    is_valid = await auth_service.verify_signature(wallet_address, signature, message)
    if not is_valid:
        raise HTTPException(status_code=401, detail="Invalid signature")
    
    token = await auth_service.authenticate(wallet_address)
    return {"token": token}

@router.get("/me", response_model=User)
async def get_current_user_info(current_user: str = Depends(get_current_user)):
    """Get the current user's information."""
    user = await auth_service.get_or_create_user(current_user)
    return user 