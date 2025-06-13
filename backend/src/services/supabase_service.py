import os
from supabase import create_client, Client
from typing import Dict, Any, List

class SupabaseService:
    def __init__(self):
        self.supabase_url = os.getenv("SUPABASE_URL")
        self.supabase_key = os.getenv("SUPABASE_KEY")
        
        if not self.supabase_url or not self.supabase_key:
            raise ValueError(
                "Supabase credentials not found. Please check if SUPABASE_URL and SUPABASE_KEY "
                "are properly set in your environment variables."
            )
            
        try:
            self.client: Client = create_client(self.supabase_url, self.supabase_key)
        except Exception as e:
            print(f"Error initializing Supabase client: {e}")
            raise

    def get_client(self) -> Client:
        return self.client

    async def search_documents(self, query: str, limit: int = 5) -> List[Dict[str, Any]]:
        """Search documents in Supabase."""
        try:
            response = await self.client.table("documents").select("*").text_search("content", query).limit(limit).execute()
            return response.data
        except Exception as e:
            print(f"Error searching documents: {e}")
            return []

    async def get_document_by_id(self, doc_id: str) -> Dict[str, Any]:
        """
        Retrieve a specific document by its ID from the existing table.
        """
        try:
            response = self.client.table('documents').select("*").eq("id", doc_id).execute()
            return response.data[0] if response.data else {}
        except Exception as e:
            print(f"Error retrieving document: {str(e)}")
            return {}

    async def store_document(self, content: str, metadata: Dict[str, Any] = None) -> Dict[str, Any]:
        """Store document in Supabase."""
        try:
            data = {
                "content": content,
                "metadata": metadata or {}
            }
            response = await self.client.table("documents").insert(data).execute()
            return response.data[0] if response.data else {}
        except Exception as e:
            print(f"Error storing document: {e}")
            return {}

# Singleton instance
try:
    supabase_service = SupabaseService()
except Exception as e:
    print(f"Failed to initialize Supabase service: {e}")
    raise 