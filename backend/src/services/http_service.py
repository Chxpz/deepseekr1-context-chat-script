from fastapi import FastAPI
from pydantic import BaseModel
from src.services.rag_service import RAGService
from src.services.conversation_service import ConversationService
import asyncio
from typing import Dict, Any, Optional
from dataclasses import dataclass

app = FastAPI()
rag_service = RAGService()
conversation_service = ConversationService()

class MessageInput(BaseModel):
    conversation_id: str
    message: str

@dataclass
class HTTPResponse:
    status_code: int
    data: Optional[Dict[str, Any]] = None
    error: Optional[str] = None

    def is_success(self) -> bool:
        return 200 <= self.status_code < 300

    def to_dict(self) -> Dict[str, Any]:
        return {
            "status_code": self.status_code,
            "data": self.data,
            "error": self.error
        }

@app.post("/message")
async def send_message(input: MessageInput):
    # Armazena a mensagem do usuário
    await conversation_service.add_message(input.conversation_id, "user", input.message)
    # Obtém resposta do agente
    response = await rag_service.ask_with_context(input.message)
    # Armazena resposta do agente
    await conversation_service.add_message(input.conversation_id, "assistant", response)
    # Retorna resposta para o frontend
    return {"response": response} 