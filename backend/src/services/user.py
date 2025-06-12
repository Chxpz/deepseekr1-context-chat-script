from typing import Optional, Dict, Any, List
from fastapi import HTTPException
from ..db import execute_query
from ..models.user import User, CreateUserDTO, UpdateUserDTO

class UserService:
    @staticmethod
    async def create_or_update_user(data: CreateUserDTO) -> User:
        """Create a new user or update an existing one."""
        query = """
            INSERT INTO users (
                wallet_address,
                twitter_username,
                discord_username,
                twitter_verified,
                discord_verified
            ) VALUES (
                $1, $2, $3, $4, $5
            )
            ON CONFLICT (wallet_address) DO UPDATE
            SET
                twitter_username = EXCLUDED.twitter_username,
                discord_username = EXCLUDED.discord_username,
                updated_at = CURRENT_TIMESTAMP
            RETURNING *
        """
        
        values = (
            data.wallet_address,
            data.twitter_username,
            data.discord_username,
            False,  # twitter_verified
            False,  # discord_verified
        )
        
        result = await execute_query(query, values)
        return User(**result[0])

    @staticmethod
    async def update_verification_status(
        wallet_address: str,
        verification_type: str,
        is_verified: bool
    ) -> User:
        """Update the verification status of a user."""
        field = f"{verification_type}_verified"
        query = f"""
            UPDATE users
            SET {field} = $1,
                updated_at = CURRENT_TIMESTAMP
            WHERE wallet_address = $2
            RETURNING *
        """
        
        result = await execute_query(query, (is_verified, wallet_address))
        return User(**result[0])

    @staticmethod
    async def get_user_by_wallet(wallet_address: str) -> Optional[User]:
        """Get a user by their wallet address."""
        result = await execute_query(
            "SELECT * FROM users WHERE wallet_address = %s",
            (wallet_address,)
        )
        return User(**result[0]) if result else None

    @staticmethod
    async def update_user(wallet_address: str, data: UpdateUserDTO) -> User:
        # Build update query dynamically based on provided fields
        update_fields = []
        params = []
        
        if data.twitter_username is not None:
            update_fields.append("twitter_username = %s")
            params.append(data.twitter_username)
        
        if data.discord_username is not None:
            update_fields.append("discord_username = %s")
            params.append(data.discord_username)
        
        if data.twitter_verified is not None:
            update_fields.append("twitter_verified = %s")
            params.append(data.twitter_verified)
        
        if data.discord_verified is not None:
            update_fields.append("discord_verified = %s")
            params.append(data.discord_verified)
        
        if not update_fields:
            raise HTTPException(status_code=400, detail="No fields to update")
        
        # Add wallet_address to params
        params.append(wallet_address)
        
        # Execute update
        result = await execute_query(
            f"""
            UPDATE users 
            SET {', '.join(update_fields)}, updated_at = CURRENT_TIMESTAMP
            WHERE wallet_address = %s
            RETURNING *
            """,
            tuple(params)
        )
        
        if not result:
            raise HTTPException(status_code=404, detail="User not found")
        
        return User(**result[0])

    @staticmethod
    async def get_all_users() -> List[User]:
        result = await execute_query("SELECT * FROM users")
        return [User(**row) for row in result] 