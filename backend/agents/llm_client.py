import requests
import json
import logging

logger = logging.getLogger(__name__)

class LLMClient:
    def __init__(self, engine: str = "ollama", base_url: str = "http://localhost:11434", api_key: str = None):
        self.engine = engine
        self.base_url = base_url
        self.api_key = api_key
        
    def generate(self, prompt: str, model: str = "llama3"):
        if self.engine == "ollama":
            return self._generate_ollama(prompt, model)
        else:
            return {"error": "Only Ollama engine is supported in this iteration."}

    def _generate_ollama(self, prompt: str, model: str):
        try:
            url = f"{self.base_url}/api/generate"
            payload = {
                "model": model,
                "prompt": prompt,
                "stream": False
            }
            response = requests.post(url, json=payload, timeout=60)
            if response.status_code == 200:
                data = response.json()
                return {"response": data.get("response", "")}
            else:
                logger.error(f"Ollama API Error: {response.text}")
                return {"error": response.text}
        except Exception as e:
            logger.error(f"Failed to connect to Ollama: {e}")
            return {"error": str(e)}

    def list_models_ollama(self):
        try:
            url = f"{self.base_url}/api/tags"
            resp = requests.get(url, timeout=5)
            if resp.status_code == 200:
                return [m["name"] for m in resp.json().get("models", [])]
            return []
        except:
            return []

llm_client = LLMClient()
