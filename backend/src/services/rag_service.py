from typing import List, Dict, Any, Optional
from src.services.supabase_service import SupabaseService
from src.services.llm_service import LLMService

class RAGService:
    def __init__(self):
        """Initialize services for RAG functionality."""
        self.supabase = SupabaseService()
        self.llm = LLMService()
    
    async def get_relevant_context(self, query: str, limit: int = 3) -> str:
        """
        Retrieve relevant context from existing Supabase documents.
        """
        documents = await self.supabase.search_documents(query, limit)
        if not documents:
            return ""
            
        # Combine document contents into context
        context = "\n\n".join([doc.get('content', '') for doc in documents])
        return context
    
    async def ask_with_context(self, question: str) -> str:
        """
        Ask a question using RAG approach with existing knowledge base.
        """
        try:
            # Get relevant context from existing documents
            context = await self.get_relevant_context(question)
            
            if not context:
                print("No relevant context found. Proceeding with direct question.")
                job_id = self.llm.run_job(question)
                return self.llm.wait_for_result(job_id)
            
            # Run LLM with context
            job_id = self.llm.run_job(question, context)
            return self.llm.wait_for_result(job_id)
            
        except Exception as e:
            print(f"Error in RAG process: {str(e)}")
            return "Desculpe, ocorreu um erro ao processar sua pergunta."
    
    async def store_knowledge(self, content: str, metadata: Dict[str, Any]) -> Dict[str, Any]:
        """Store new knowledge in the vector database."""
        return await self.supabase.store_document(content, metadata) 