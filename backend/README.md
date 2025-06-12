# RAG-Enhanced LLM Assistant

A Python application that combines the power of Large Language Models (LLM) with Retrieval-Augmented Generation (RAG) using Supabase as a vector database. Now exposes an HTTP endpoint for integration with modern frontends (e.g., React/Lovable).

## Main Features

- 🤖 Integration with DeepSeek-R1-Distill-Qwen-7B via RunPod API
- 🔍 Vector search and context via Supabase
- 💬 HTTP endpoint for ChatGPT-style chat
- 💾 Conversation and message history
- 🐳 Full Docker support

## Project Structure

```
.
├── src/
│   ├── config/
│   │   └── settings.py         # Configuration and environment variables
│   ├── services/
│   │   ├── llm_service.py     # RunPod LLM integration
│   │   ├── supabase_service.py # Supabase operations
│   │   ├── rag_service.py     # RAG logic
│   │   ├── conversation_service.py # Conversation management
│   │   └── http_service.py    # HTTP API (FastAPI)
│   └── main.py                # Server initialization
├── .env                       # Environment variables
├── requirements.txt           # Python dependencies
├── Dockerfile                 # Docker configuration
├── docker-compose.yml         # Docker orchestration
└── README.md                  # Documentation
```

## How to Run (Docker)

1. Create a `.env` file with your credentials:

```
RUNPOD_API_TOKEN=your_runpod_token
RUNPOD_ENDPOINT_ID=your_endpoint_id
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_key
```

2. Start the container:

```bash
docker-compose up --build
```

3. The backend will be available at: [http://localhost:8000](http://localhost:8000)

## HTTP API

### Send a message to the agent

**Endpoint:**
```
POST /message
```

**Payload:**
```json
{
  "conversation_id": "<conversation uuid>",
  "message": "Hello, agent!"
}
```

**Response:**
```json
{
  "response": "Hello! How can I help you?"
}
```

### Suggested Frontend Flow
- Create a conversation (future endpoint or directly in the database)
- Send messages via POST `/message`
- Display the returned response

## Supabase: Table Structure

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

## Notes
- Use the **service key** from Supabase to avoid permission issues.
- The HTTP endpoint is ready for integration with any modern frontend (React, Vue, etc).
- For testing, access [http://localhost:8000/docs](http://localhost:8000/docs) (FastAPI Swagger UI).

## Requirements
- Python 3.8+
- Docker and Docker Compose
- RunPod and Supabase accounts

## Security
- Never share your `.env` or your keys publicly.
- Use secure environment variables in production.

---


Enable the pgvector extension if not already enabled:
```sql
create extension if not exists vector;
```

Create the similarity search function:
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
Run the application (either locally or with Docker)

Available commands:
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
- Fork the repository
- Create a feature branch
- Commit your changes
- Push to the branch
- Create a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details. 