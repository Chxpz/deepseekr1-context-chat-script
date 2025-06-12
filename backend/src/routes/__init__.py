"""
Routes package initialization.
"""

from .index import router as main_router
from .auth import router as auth_router
from .verify import router as verify_router

__all__ = ["main_router", "auth_router", "verify_router"] 