from supabase import create_client, Client
from src.config.settings import settings
from typing import List, Dict, Any

class SupabaseService:
    def __init__(self):
        """Initialize Supabase client with existing configuration."""
        self.client: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
    
    async def search_documents(self, query: str, limit: int = 5) -> List[Dict[str, Any]]:
        """
        Search for relevant documents in the existing Supabase table.
        Uses the existing match_documents function for vector similarity search.
        """
        try:
            response = self.client.rpc(
                'match_documents',
                {
                    'query_text': query,
                    'match_count': limit
                }
            ).execute()
            
            if not response.data:
                print("No relevant documents found.")
                return []
                
            return response.data
        except Exception as e:
            print(f"Error searching documents: {str(e)}")
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
    
    async def store_document(self, content: str, metadata: Dict[str, Any], table: str = "documents") -> Dict[str, Any]:
        """
        Store a new document in Supabase.
        """
        try:
            data = {
                "content": content,
                "metadata": metadata
            }
            response = self.client.table(table).insert(data).execute()
            return response.data[0] if response.data else {}
        except Exception as e:
            print(f"Error storing document: {str(e)}")
            return {} 