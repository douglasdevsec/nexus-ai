import json
from .llm_client import llm_client

class OrchestratorAgent:
    def __init__(self):
        self.system_prompt = """Eres un Orquestador de Inteligencia Artificial para el sistema de ciberseguridad AegisAgent.
El usuario te dará una instrucción en lenguaje natural. Tu objetivo es predecir cuál de los siguientes análisis desea ejecutar:
1. NETWORK_SCAN (si pide escanear red, puertos, nmap, ips)
2. MALWARE_SCAN (si pide buscar virus, malware en archivos, hashes)
3. SERVICE_SCAN (si pide revisar servicios de windows, servicios en ejecución, cosas raras en fondo)
4. EVENT_SCAN (si pide buscar eventos, logs, quien se conectó, RDP, conexiones remotas)

Devuelve ÚNICAMENTE un JSON con este formato: {"intent": "TIPO_DE_SCAN"}
"""

    def parse_intent(self, user_prompt: str) -> str:
        prompt = f"{self.system_prompt}\n\nMensaje del usuario: '{user_prompt}'\n\nResponde SOLO con el JSON."
        resp = llm_client.generate(prompt=prompt)
        
        if "error" in resp:
            return "UNKNOWN"
        
        try:
            text = resp["response"].strip()
            if text.startswith("```json"): text = text[7:]
            if text.startswith("```"): text = text[3:]
            if text.endswith("```"): text = text[:-3]
            
            data = json.loads(text.strip())
            return data.get("intent", "UNKNOWN")
        except Exception as e:
            # Fallback parsing string matching
            text = resp.get("response", "").upper()
            if "SERVICE" in text: return "SERVICE_SCAN"
            if "EVENT" in text: return "EVENT_SCAN"
            if "NETWORK" in text: return "NETWORK_SCAN"
            if "MALWARE" in text: return "MALWARE_SCAN"
            return "UNKNOWN"

orchestrator_agent = OrchestratorAgent()
