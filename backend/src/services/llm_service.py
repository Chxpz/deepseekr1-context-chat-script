import requests
import time
import json
from typing import Dict, Any, Optional
from src.config.settings import settings

class LLMService:
    def __init__(self):
        self.headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {settings.RUNPOD_API_TOKEN}"
        }
        self.endpoint_id = settings.RUNPOD_ENDPOINT_ID
    
    def _format_prompt(self, prompt: str, context: Optional[str] = None) -> str:
        """Format the prompt with agent personality and optional context."""
        if context:
            return f"<think>\nPersonality: {settings.AGENT_PERSONALITY}\nContext: {context}\n\nQuestion: {prompt}\n</think>"
        return f"<think>\nPersonality: {settings.AGENT_PERSONALITY}\n\nQuestion: {prompt}\n</think>"
    
    def run_job(self, prompt: str, context: Optional[str] = None) -> str:
        """Run a job on RunPod."""
        try:
            formatted_prompt = self._format_prompt(prompt, context)
            payload = {
                "input": {
                    "prompt": formatted_prompt,
                    "temperature": settings.TEMPERATURE,
                    "max_tokens": settings.MAX_TOKENS,
                    "top_p": settings.TOP_P,
                    "stop": ["</think>"]
                }
            }
            url = f"https://api.runpod.ai/v2/{self.endpoint_id}/run"
            response = requests.post(url, headers=self.headers, json=payload)
            response.raise_for_status()
            return response.json()["id"]
        except Exception as e:
            print(f"❌ Error starting job: {str(e)}")
            raise
    
    def check_status(self, job_id: str) -> Dict[str, Any]:
        """Check the status of a job."""
        try:
            url = f"https://api.runpod.ai/v2/{self.endpoint_id}/status/{job_id}"
            response = requests.get(url, headers=self.headers)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"❌ Error checking status: {str(e)}")
            raise
    
    def wait_for_result(self, job_id: str, interval: int = 2) -> str:
        """Wait for job completion and return the result."""
        print("🔄 Waiting for processing...")
        while True:
            result = self.check_status(job_id)
            status = result["status"]
            
            if status == "COMPLETED":
                print("✅ Processing complete!")
                return self._process_output(result.get("output", {}))
            elif status == "FAILED":
                print("❌ Job failed!")
                if "error" in result:
                    print(f"Error: {result['error']}")
                raise Exception("Job failed")
            elif status == "IN_QUEUE":
                print("⏳ In queue...")
            elif status == "IN_PROGRESS":
                print("⚙️ Processing...")
            
            time.sleep(interval)
        
    def _process_output(self, output: Any) -> str:
        """Extract and return clean plain-text response from the LLM output."""
        try:
            if isinstance(output, str):
                try:
                    output = json.loads(output)
                except json.JSONDecodeError:
                    return self._clean_text(output)

            if isinstance(output, list):
                for item in output:
                    if isinstance(item, dict):
                        choices = item.get("choices", [])
                        for choice in choices:
                            tokens = choice.get("tokens")
                            if isinstance(tokens, list):
                                joined = "".join(tokens)
                                return self._clean_text(joined)
                            elif isinstance(tokens, str):
                                return self._clean_text(tokens)

            if isinstance(output, dict):
                for key in ["text", "response", "output", "result"]:
                    if key in output:
                        return self._clean_text(str(output[key]))

            return self._clean_text(str(output))

        except Exception as e:
            print(f"⚠️ Warning: Failed to process output: {str(e)}")
            return self._clean_text(str(output))
    
    def _clean_text(self, text: str) -> str:
        """Remove noise from the model's response for clean output."""
        text = text.replace('\\n', '\n').replace('\\t', '    ').replace('\\"', '"')
        text = text.replace('[', '').replace(']', '').replace('{', '').replace('}', '')
        text = text.replace("'", '').replace('"', '')
        text = ' '.join(text.split())  # remove múltiplos espaços e quebras
        return text.strip()
