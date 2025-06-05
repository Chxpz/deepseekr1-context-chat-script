import requests
import time
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
        """Format the prompt with optional context."""
        if context:
            return f"<think>\nContext: {context}\n\nQuestion: {prompt}\n</think>"
        return f"<think>\n{prompt}\n</think>"
    
    def run_job(self, prompt: str, context: Optional[str] = None) -> str:
        """Run a job on RunPod."""
        try:
            formatted_prompt = self._format_prompt(prompt, context)
            payload = {
                "input": {
                    "prompt": formatted_prompt,
                    "temperature": settings.MODEL_TEMPERATURE,
                    "max_tokens": settings.MODEL_MAX_TOKENS,
                    "top_p": settings.MODEL_TOP_P,
                    "stop": ["</think>"]
                }
            }
            
            url = f"https://api.runpod.ai/v2/{self.endpoint_id}/run"
            response = requests.post(url, headers=self.headers, json=payload)
            response.raise_for_status()
            return response.json()["id"]
        except Exception as e:
            print(f"Error starting job: {str(e)}")
            raise
    
    def check_status(self, job_id: str) -> Dict[str, Any]:
        """Check the status of a job."""
        try:
            url = f"https://api.runpod.ai/v2/{self.endpoint_id}/status/{job_id}"
            response = requests.get(url, headers=self.headers)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"Error checking status: {str(e)}")
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
    
    def _process_output(self, output: Dict[str, Any]) -> str:
        """Process the model output to extract the response text."""
        try:
            if isinstance(output, dict) and "choices" in output:
                choices = output["choices"]
                if choices and len(choices) > 0:
                    tokens = choices[0].get("tokens", [])
                    if tokens:
                        return " ".join(tokens).strip()
            return str(output).strip()
        except Exception as e:
            print(f"Warning: Failed to process output: {str(e)}")
            return str(output).strip() 