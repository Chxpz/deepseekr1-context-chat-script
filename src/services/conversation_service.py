from typing import List, Dict, Any, Optional
from datetime import datetime
from src.services.supabase_service import SupabaseService

class ConversationService:
    def __init__(self):
        """Initialize conversation service with Supabase client."""
        self.supabase = SupabaseService()
        self.table_name = "conversations"
    
    async def create_conversation(self, title: str = None) -> Dict[str, Any]:
        """
        Create a new conversation.
        """
        try:
            conversation = {
                "title": title or f"Conversation {datetime.now().strftime('%Y-%m-%d %H:%M')}"
                # "metadata": {}  # descomente se quiser usar metadata
            }
            response = self.supabase.client.table(self.table_name).insert(conversation).execute()
            return response.data[0] if response.data else {}
        except Exception as e:
            print(f"Error creating conversation: {str(e)}")
            return {}
    
    async def add_message(self, conversation_id: str, role: str, content: str) -> Dict[str, Any]:
        """
        Add a message to a conversation.
        """
        try:
            message = {
                "conversation_id": conversation_id,
                "role": role,  # 'user' or 'assistant'
                "content": content,
                "created_at": datetime.now().isoformat()
            }
            
            response = self.supabase.client.table("messages").insert(message).execute()
            
            # Update conversation's updated_at timestamp
            self.supabase.client.table(self.table_name).update({
                "updated_at": datetime.now().isoformat()
            }).eq("id", conversation_id).execute()
            
            return response.data[0] if response.data else {}
        except Exception as e:
            print(f"Error adding message: {str(e)}")
            return {}
    
    async def get_conversation_history(self, conversation_id: str) -> List[Dict[str, Any]]:
        """
        Get all messages from a conversation.
        """
        try:
            response = self.supabase.client.table("messages")\
                .select("*")\
                .eq("conversation_id", conversation_id)\
                .order("created_at")\
                .execute()
            
            return response.data if response.data else []
        except Exception as e:
            print(f"Error getting conversation history: {str(e)}")
            return []
    
    async def get_recent_conversations(self, limit: int = 10) -> List[Dict[str, Any]]:
        """
        Get recent conversations.
        """
        try:
            response = self.supabase.client.table(self.table_name)\
                .select("*")\
                .order("updated_at", desc=True)\
                .limit(limit)\
                .execute()
            
            return response.data if response.data else []
        except Exception as e:
            print(f"Error getting recent conversations: {str(e)}")
            return [] 