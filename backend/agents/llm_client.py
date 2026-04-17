import requests
import json
import logging
import google.generativeai as genai

logger = logging.getLogger(__name__)

class LLMClient:
    def __init__(self, engine: str = "ollama", base_url: str = "http://localhost:11434", api_key: str = None):
        self.engine = engine
        self.base_url = base_url
        self.api_key = api_key
        
    def update_config(self, engine: str, api_key: str = None):
        self.engine = engine
        self.api_key = api_key
        if engine == "gemini" and api_key:
            genai.configure(api_key=api_key)

    def generate(self, prompt: str, model: str = "llama3"):
        if self.engine == "ollama":
            return self._generate_ollama(prompt, model)
        elif self.engine == "gemini":
            return self._generate_gemini(prompt, model)
        else:
            return {"error": f"Engine {self.engine} is not currently supported."}

    def _generate_gemini(self, prompt: str, model: str):
        try:
            if not self.api_key:
                return {"error": "API Key is required for Gemini."}
            
            # Usar modelo de texto o fallback
            target_model = model if model.startswith("gemini") else "gemini-1.5-flash"
            gemini_model = genai.GenerativeModel(target_model)
            response = gemini_model.generate_content(prompt)
            return {"response": response.text}
        except Exception as e:
            logger.error(f"Failed to connect to Gemini: {e}")
            return {"error": str(e)}

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
