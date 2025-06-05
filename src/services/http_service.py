from fastapi import FastAPI
from pydantic import BaseModel
from src.services.rag_service import RAGService
from src.services.conversation_service import ConversationService
import asyncio

app = FastAPI()
rag_service = RAGService()
conversation_service = ConversationService()

class MessageInput(BaseModel):
    conversation_id: str
    message: str

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