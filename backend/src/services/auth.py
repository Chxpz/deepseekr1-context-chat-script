import jwt
from datetime import datetime, timedelta
from typing import Dict, Optional
from eth_account.messages import encode_defunct
from web3 import Web3
from ..config import settings
from ..db import execute_query
from ..middleware.auth import create_access_token
from ..models.user import User, CreateUserDTO

class AuthService:
    def __init__(self):
        self.web3 = Web3()

    @staticmethod
    def generate_token(wallet_address: str) -> str:
        """Generate a JWT token for the given wallet address."""
        payload = {
            'wallet_address': wallet_address,
            'exp': datetime.utcnow() + timedelta(days=1)
        }
        return jwt.encode(payload, settings.JWT_SECRET, algorithm='HS256')

    async def verify_signature(self, address: str, signature: str, message: str) -> bool:
        """Verify the signature of a message from a wallet."""
        try:
            # Create a message hash
            message_hash = encode_defunct(text=message)
            
            # Recover the address from the signature
            recovered_address = self.web3.eth.account.recover_message(message_hash, signature=signature)
            
            # Compare the recovered address with the provided wallet address
            return recovered_address.lower() == address.lower()
        except Exception as e:
            print(f"Error verifying signature: {e}")
            return False

    @staticmethod
    def verify_token(token: str) -> Optional[Dict]:
        """Verify a JWT token and return its payload."""
        try:
            return jwt.decode(token, settings.JWT_SECRET, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            print("Token has expired")
            return None
        except jwt.InvalidTokenError as e:
            print(f"Invalid token: {e}")
            return None

    async def get_or_create_user(self, wallet_address: str) -> User:
        # Check if user exists
        result = await execute_query(
            "SELECT * FROM users WHERE wallet_address = %s",
            (wallet_address,)
        )
        
        if result:
            return User(**result[0])
        
        # Create new user
        new_user = CreateUserDTO(wallet_address=wallet_address)
        result = await execute_query(
            """
            INSERT INTO users (wallet_address)
            VALUES (%s)
            RETURNING *
            """,
            (new_user.wallet_address,)
        )
        
        return User(**result[0])

    async def authenticate(self, wallet_address: str) -> str:
        user = await self.get_or_create_user(wallet_address)
        return create_access_token(user.wallet_address) 