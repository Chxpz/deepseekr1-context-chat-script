from fastapi import APIRouter
from .auth import router as auth_router
from .verify import router as verify_router

router = APIRouter()

# Include all route modules
router.include_router(auth_router, prefix="/auth", tags=["auth"])
router.include_router(verify_router, prefix="/verify", tags=["verify"]) 