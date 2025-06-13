import asyncio
import sys
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.routes import auth, verify
from src.middleware.rate_limit import rate_limit_middleware  # 🚀 rate limit import
from src.services.rag_service import RAGService
from src.services.conversation_service import ConversationService

app = FastAPI()

# 🌐 Register middleware
app.middleware("http")(rate_limit_middleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔧 Routes
@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/")
async def root():
    return {"message": "Welcome to Autonoma API"}

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(verify.router, prefix="/api/verify", tags=["verify"])

# 🧠 Optional: CLI mode to run conversation loop
rag_service = RAGService()

async def main():
    conversation_service = ConversationService()
    conversation = await conversation_service.create_conversation()
    if not conversation:
        print("Error: Could not create conversation")
        sys.exit(1)
    
    conversation_id = conversation["id"]
    print(f"\nNova conversa iniciada (ID: {conversation_id})")
    print("Digite 'exit' para sair ou 'history' para ver o histórico da conversa atual")

    while True:
        try:
            user_input = input("\nVocê: ").strip()
            if user_input.lower() == 'exit':
                print("\nEncerrando conversa...")
                break
            elif user_input.lower() == 'history':
                messages = await conversation_service.get_conversation_history(conversation_id)
                print("\nHistórico da conversa:")
                for msg in messages:
                    role = "Você" if msg["role"] == "user" else "Assistente"
                    print(f"\n{role}: {msg['content']}")
                continue
            if not user_input:
                continue

            await conversation_service.add_message(conversation_id, "user", user_input)
            response = await rag_service.ask_with_context(user_input)
            await conversation_service.add_message(conversation_id, "assistant", response)
            print(f"\nAssistente: {response}")

        except KeyboardInterrupt:
            print("\n\nEncerrando conversa...")
            break
        except Exception as e:
            print(f"\nErro: {str(e)}")
            continue

# 🔄 Use correct entrypoint for API
if __name__ == "__main__":
    uvicorn.run("src.main:app", host="0.0.0.0", port=8000, reload=True)
