from functools import wraps
from typing import Callable, Optional
from fastapi import HTTPException, Request, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

load_dotenv()

security = HTTPBearer()

class JWTPayload:
    def __init__(self, address: str, exp: Optional[datetime] = None):
        self.address = address
        self.exp = exp or (datetime.utcnow() + timedelta(days=1))

def create_access_token(address: str) -> str:
    """Create a JWT token for the given wallet address."""
    payload = {
        "address": address,
        "exp": datetime.utcnow() + timedelta(days=1)
    }
    return jwt.encode(payload, os.getenv('JWT_SECRET', 'your-secret-key'), algorithm='HS256')

def verify_token(token: str) -> JWTPayload:
    """Verify a JWT token and return the payload."""
    try:
        payload = jwt.decode(
            token,
            os.getenv('JWT_SECRET', 'your-secret-key'),
            algorithms=['HS256']
        )
        return JWTPayload(
            address=payload['address'],
            exp=datetime.fromtimestamp(payload['exp'])
        )
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

def require_auth():
    """Decorator to require authentication for a route."""
    def decorator(func: Callable):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            request = kwargs.get('request')
            if not request:
                for arg in args:
                    if isinstance(arg, Request):
                        request = arg
                        break

            if not request:
                raise HTTPException(status_code=500, detail="Request object not found")

            auth = await security(request)
            if not auth:
                raise HTTPException(status_code=401, detail="No authorization header")

            try:
                payload = verify_token(auth.credentials)
                request.state.user = payload
                return await func(*args, **kwargs)
            except HTTPException as e:
                raise e
            except Exception as e:
                raise HTTPException(status_code=401, detail=str(e))

        return wrapper
    return decorator

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> JWTPayload:
    """Dependency to get the current user from the JWT token."""
    return verify_token(credentials.credentials) 