from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
import time
from typing import Dict, Tuple, Callable
from functools import wraps

class RateLimiter:
    def __init__(self, requests_per_minute: int = 60):
        self.requests_per_minute = requests_per_minute
        self.requests: Dict[str, list] = {}

    async def check_rate_limit(self, request: Request) -> None:
        client_ip = request.client.host
        current_time = time.time()

        # Initialize or clean up old requests
        if client_ip not in self.requests:
            self.requests[client_ip] = []
        
        # Remove requests older than 1 minute
        self.requests[client_ip] = [
            req_time for req_time in self.requests[client_ip]
            if current_time - req_time < 60
        ]

        # Check if rate limit is exceeded
        if len(self.requests[client_ip]) >= self.requests_per_minute:
            raise HTTPException(
                status_code=429,
                detail="Too many requests. Please try again later."
            )

        # Add current request
        self.requests[client_ip].append(current_time)

# Create a global rate limiter instance
rate_limiter = RateLimiter()

# Global middleware for entire app
async def rate_limit_middleware(request: Request, call_next):
    try:
        await rate_limiter.check_rate_limit(request)
        response = await call_next(request)
        return response
    except HTTPException as e:
        return JSONResponse(
            status_code=e.status_code,
            content={"detail": e.detail}
        )

# Per-route decorator using global rate_limiter instance
def rate_limit(times: int = 5, period: int = 60):
    rate_limiter.requests_per_minute = times  # Shared config

    def decorator(func: Callable):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            request = kwargs.get('request')
            if request:
                await rate_limiter.check_rate_limit(request)
            return await func(*args, **kwargs)
        return wrapper
    return decorator 