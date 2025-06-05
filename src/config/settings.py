from dotenv import load_dotenv
from pydantic_settings import BaseSettings
from functools import lru_cache
import os

# Load environment variables from .env file
load_dotenv()

class Settings(BaseSettings):
    """Application settings."""
    
    # RunPod settings
    RUNPOD_API_TOKEN: str
    RUNPOD_ENDPOINT_ID: str
    
    # Supabase settings
    SUPABASE_URL: str
    SUPABASE_KEY: str
    
    # Model parameters
    TEMPERATURE: float = 0.7
    MAX_TOKENS: int = 2000
    TOP_P: float = 0.9
    STOP_SEQUENCE: str = "###"
    
    class Config:
        env_file = ".env"
        case_sensitive = True
        env_file_encoding = 'utf-8'

@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance."""
    try:
        return Settings()
    except Exception as e:
        print(f"Error loading settings: {str(e)}")
        print("Current environment variables:")
        print(f"RUNPOD_API_TOKEN: {'*' * len(os.getenv('RUNPOD_API_TOKEN', ''))}")
        print(f"RUNPOD_ENDPOINT_ID: {os.getenv('RUNPOD_ENDPOINT_ID', '')}")
        print(f"SUPABASE_URL: {os.getenv('SUPABASE_URL', '')}")
        print(f"SUPABASE_KEY: {'*' * len(os.getenv('SUPABASE_KEY', ''))}")
        raise

# Create settings instance
settings = get_settings() 