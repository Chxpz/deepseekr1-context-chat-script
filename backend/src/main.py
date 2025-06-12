import asyncio
import sys
import uvicorn
from src.services.rag_service import RAGService
from src.services.conversation_service import ConversationService

async def main():
    """Main function to run the RAG chat application."""
    rag_service = RAGService()
    conversation_service = ConversationService()
    
    # Create a new conversation
    conversation = await conversation_service.create_conversation()
    if not conversation:
        print("Error: Could not create conversation")
        sys.exit(1)
    
    conversation_id = conversation["id"]
    print(f"\nNova conversa iniciada (ID: {conversation_id})")
    print("Digite 'exit' para sair ou 'history' para ver o histórico da conversa atual")
    
    while True:
        try:
            # Get user input
            user_input = input("\nVocê: ").strip()
            
            # Handle special commands
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
            
            # Store user message
            await conversation_service.add_message(conversation_id, "user", user_input)
            
            # Get response from RAG service
            response = await rag_service.ask_with_context(user_input)
            
            # Store assistant's response
            await conversation_service.add_message(conversation_id, "assistant", response)
            
            # Print response
            print(f"\nAssistente: {response}")
            
        except KeyboardInterrupt:
            print("\n\nEncerrando conversa...")
            break
        except Exception as e:
            print(f"\nErro: {str(e)}")
            continue

if __name__ == "__main__":
    uvicorn.run("src.services.http_service:app", host="0.0.0.0", port=8000, reload=True) 