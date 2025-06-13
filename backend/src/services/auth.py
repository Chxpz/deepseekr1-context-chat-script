import os
import jwt
from datetime import datetime, timedelta
from typing import Dict, Optional, Any
from eth_account.messages import encode_defunct
from web3 import Web3
from ..services.supabase_service import supabase_service
from ..models.user import User, CreateUserDTO
from ..middleware.auth import create_access_token
from fastapi import HTTPException, status

class AuthService:
    def __init__(self):
        self.web3 = Web3()
        self.jwt_secret = os.getenv("JWT_SECRET", "dev_secret_key")
        self.jwt_algorithm = os.getenv("JWT_ALGORITHM", "HS256")
        self.access_token_expire_minutes = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

    @staticmethod
    def verify_signature(message: str, signature: str, wallet_address: str) -> bool:
        """Verify Ethereum signature."""
        try:
            message_hash = encode_defunct(text=message)
            recovered_address = Web3().eth.account.recover_message(message_hash, signature=signature)
            return recovered_address.lower() == wallet_address.lower()
        except Exception as e:
            print(f"Error verifying signature: {e}")
            return False

    def verify_token(self, token: str) -> Dict[str, Any]:
        """Verify JWT token."""
        try:
            payload = jwt.decode(token, self.jwt_secret, algorithms=[self.jwt_algorithm])
            return payload
        except jwt.ExpiredSignatureError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has expired"
            )
        except jwt.JWTError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials"
            )

    async def get_or_create_user(self, wallet_address: str) -> User:
        """Get existing user or create new one."""
        try:
            result = await supabase_service.client.table("users").select("*").eq("wallet_address", wallet_address).execute()
            if result.data:
                return User.from_dict(result.data[0])

            new_user = CreateUserDTO(wallet_address=wallet_address)
            result = await supabase_service.client.table("users").insert(new_user.dict()).execute()
            return User.from_dict(result.data[0])
        except Exception as e:
            print(f"Error in get_or_create_user: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error creating user"
            )

    def create_access_token(self, data: Dict[str, Any]) -> str:
        """Create JWT access token."""
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(minutes=self.access_token_expire_minutes)
        to_encode.update({"exp": expire})
        return jwt.encode(to_encode, self.jwt_secret, algorithm=self.jwt_algorithm)

    async def authenticate(self, wallet_address: str) -> str:
        user = await self.get_or_create_user(wallet_address)
        return self.create_access_token({"sub": user.wallet_address})

    async def authenticate_user(self, username: str, password: str) -> Optional[Dict[str, Any]]:
        """Authenticate user with Supabase."""
        try:
            response = await supabase_service.client.auth.sign_in_with_password({
                "email": username,
                "password": password
            })
            return response.user
        except Exception as e:
            print(f"Error authenticating user: {e}")
            return None

# Singleton instance
auth_service = AuthService() 