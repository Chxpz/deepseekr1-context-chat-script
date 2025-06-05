import requests
import time
import os
import sys
import json
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Check if required environment variables are set
RUNPOD_API_TOKEN = os.getenv("RUNPOD_API_TOKEN")
RUNPOD_ENDPOINT_ID = os.getenv("RUNPOD_ENDPOINT_ID")

if not RUNPOD_API_TOKEN or not RUNPOD_ENDPOINT_ID:
    print("❌ Error: Environment variables not found!")
    print("Please create a .env file with the following variables:")
    print("RUNPOD_API_TOKEN=your_token_here")
    print("RUNPOD_ENDPOINT_ID=your_endpoint_id_here")
    sys.exit(1)

HEADERS = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {RUNPOD_API_TOKEN}"
}

def clean_response(text):
    """Cleans and formats the model's raw response."""
    text = text.replace('\n\n', '\n').strip()
    text = text.replace('\\n', '\n')
    text = text.replace('\\"', '"')
    text = text.replace('\\t', '    ')
    text = ' '.join(text.split())
    text = ''.join(char for char in text if ord(char) >= 32 or char == '\n')
    text = text.strip()
    text = text.replace('[', '').replace(']', '')
    text = text.replace('{', '').replace('}', '')
    text = text.replace("'", '').replace('"', '')
    return text

def run_job(prompt):
    try:
        # Format the prompt for DeepSeek-style inference
        formatted_prompt = f"<think>\n{prompt}\n</think>"

        # 1. Send the prompt to the endpoint
        payload = {
            "input": {
                "prompt": formatted_prompt,
                "temperature": 0.6,
                "max_tokens": 2048,
                "top_p": 0.95,
                "stop": ["</think>"]
            }
        }
        url = f"https://api.runpod.ai/v2/{RUNPOD_ENDPOINT_ID}/run"
        response = requests.post(url, headers=HEADERS, json=payload)
        response.raise_for_status()
        job_id = response.json()["id"]
        print(f"📝 Job started with ID: {job_id}")
        return job_id
    except requests.exceptions.RequestException as e:
        print(f"❌ Failed to start job: {str(e)}")
        sys.exit(1)

def check_status(job_id):
    try:
        # 2. Check job status
        url = f"https://api.runpod.ai/v2/{RUNPOD_ENDPOINT_ID}/status/{job_id}"
        response = requests.get(url, headers=HEADERS)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"❌ Failed to check job status: {str(e)}")
        sys.exit(1)

def process_output(output):
    """Extracts and returns the clean plain-text response from the LLM output."""
    try:
        if isinstance(output, str):
            try:
                output = json.loads(output)
            except json.JSONDecodeError:
                return output.strip()

        if isinstance(output, list):
            for item in output:
                if isinstance(item, dict):
                    choices = item.get("choices", [])
                    for choice in choices:
                        tokens = choice.get("tokens")
                        if isinstance(tokens, list):
                            return " ".join(tokens).strip()
                        elif isinstance(tokens, str):
                            return tokens.strip()

        if isinstance(output, dict):
            for key in ["text", "response", "output", "result"]:
                if key in output:
                    return str(output[key]).strip()

        return str(output).strip()

    except Exception as e:
        print(f"⚠️ Warning: Failed to process output: {str(e)}")
        return str(output).strip()

def wait_for_result(job_id, interval=2):
    # 3. Polling loop until job completes
    print("🔄 Waiting for processing...")
    while True:
        result = check_status(job_id)
        status = result["status"]

        if status == "COMPLETED":
            print("✅ Processing complete!")
            return process_output(result.get("output", {}))
        elif status == "FAILED":
            print("❌ Job failed!")
            if "error" in result:
                print(f"Error: {result['error']}")
            sys.exit(1)
        elif status == "IN_QUEUE":
            print("⏳ In queue...")
        elif status == "IN_PROGRESS":
            print("⚙️ Processing...")

        time.sleep(interval)

def ask_llm(prompt):
    try:
        job_id = run_job(prompt)
        output = wait_for_result(job_id)
        return output
    except Exception as e:
        print(f"❌ Unexpected error: {str(e)}")
        sys.exit(1)

def main():
    print("🤖 Starting LLM Assistant...")
    print("Type 'exit' to quit the program")

    while True:
        prompt = input("\n📝 Enter your question: ").strip()

        if prompt.lower() == 'exit':
            print("👋 Goodbye!")
            break

        if not prompt:
            print("❌ Please enter a valid question!")
            continue

        try:
            response = ask_llm(prompt)
            print("\n🧠 LLM Response:\n", response)
        except KeyboardInterrupt:
            print("\n👋 Program interrupted by user!")
            break
        except Exception as e:
            print(f"\n❌ Error: {str(e)}")

if __name__ == "__main__":
    main()
