# RAG-Enhanced LLM Assistant

Uma aplicação Python que combina o poder de Large Language Models (LLM) com Retrieval-Augmented Generation (RAG) usando Supabase como banco de dados vetorial. Agora expõe um endpoint HTTP para integração com frontends modernos (ex: React/Lovable).

## Principais Funcionalidades

- 🤖 Integração com DeepSeek-R1-Distill-Qwen-7B via RunPod API
- 🔍 Busca vetorial e contexto via Supabase
- 💬 Endpoint HTTP para chat estilo ChatGPT
- 💾 Histórico de conversas e mensagens
- 🐳 Suporte completo a Docker

## Estrutura do Projeto

```
.
├── src/
│   ├── config/
│   │   └── settings.py         # Configuração e variáveis de ambiente
│   ├── services/
│   │   ├── llm_service.py     # Integração com RunPod LLM
│   │   ├── supabase_service.py # Operações com Supabase
│   │   ├── rag_service.py     # Lógica RAG
│   │   ├── conversation_service.py # Gerenciamento de conversas
│   │   └── http_service.py    # API HTTP (FastAPI)
│   └── main.py                # Inicialização do servidor
├── .env                       # Variáveis de ambiente
├── requirements.txt           # Dependências Python
├── Dockerfile                 # Configuração Docker
├── docker-compose.yml         # Orquestração Docker
└── README.md                  # Documentação
```

## Como rodar (Docker)

1. Crie um arquivo `.env` com suas credenciais:

```
RUNPOD_API_TOKEN=seu_token_runpod
RUNPOD_ENDPOINT_ID=seu_endpoint_id
SUPABASE_URL=sua_url_supabase
SUPABASE_KEY=sua_service_key_supabase
```

2. Suba o container:

```bash
docker-compose up --build
```

3. O backend estará disponível em: [http://localhost:8000](http://localhost:8000)

## API HTTP

### Enviar mensagem ao agente

**Endpoint:**
```
POST /message
```

**Payload:**
```json
{
  "conversation_id": "<uuid da conversa>",
  "message": "Olá, agente!"
}
```

**Resposta:**
```json
{
  "response": "Olá! Como posso ajudar?"
}
```

### Fluxo sugerido para o frontend
- Criar uma conversa (endpoint futuro ou criar direto no banco)
- Enviar mensagens via POST `/message`
- Exibir a resposta retornada

## Supabase: Estrutura das Tabelas

```sql
create table conversations (
    id uuid primary key default gen_random_uuid(),
    created_at timestamp with time zone default timezone('utc'::text, now()),
    updated_at timestamp with time zone default timezone('utc'::text, now()),
    title text,
    metadata jsonb
);

create table messages (
    id uuid primary key default gen_random_uuid(),
    conversation_id uuid references conversations(id) on delete cascade,
    role text not null check (role in ('user', 'assistant')),
    content text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index messages_conversation_id_idx on messages(conversation_id);
```

## Observações
- Use a **service key** do Supabase para evitar problemas de permissão.
- O endpoint HTTP está pronto para integração com qualquer frontend moderno (React, Vue, etc).
- Para testes, acesse [http://localhost:8000/docs](http://localhost:8000/docs) (Swagger UI do FastAPI).

## Requisitos
- Python 3.8+
- Docker e Docker Compose
- Conta no RunPod e Supabase

## Segurança
2. Enable the pgvector extension if not already enabled:
```sql
create extension if not exists vector;
```

3. Create the similarity search function:
```sql
create or replace function match_documents (
  query_text text,
  match_count int default 5
) returns table (
  id uuid,
  content text,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    id,
    content,
    1 - (documents.embedding <=> query_text::vector) as similarity
  from documents
  where 1 - (documents.embedding <=> query_text::vector) > 0.5
  order by similarity desc
  limit match_count;
end;
$$;
```

## Usage

1. Run the application (either locally or with Docker)

2. Available commands:
- Type your questions normally to chat with the assistant
- Type 'history' to view the current conversation history
- Type 'exit' to end the conversation

## Features in Detail

### Conversation Management
- Each session creates a new conversation with a unique ID
- All messages (both user and assistant) are stored in the database
- Conversations can be retrieved and reviewed later
- Messages are timestamped and organized by conversation

### RAG Implementation
- Uses vector similarity search to find relevant context
- Combines retrieved context with LLM responses
- Maintains conversation flow and context awareness

### Error Handling
- Graceful error handling for API failures
- Automatic retry mechanisms for transient errors
- Clear error messages for debugging

## Requirements

- Python 3.8+ (for local development)
- Docker and Docker Compose (for containerized deployment)
- RunPod API token and endpoint ID
- Supabase account with vector database setup
- Required Python packages (see requirements.txt)

## Security Notes

- Never commit your `.env` file
- Keep your API tokens secure
- Use appropriate access controls in Supabase
- Regularly rotate your API keys
- When using Docker, mount the `.env` file as read-only

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 