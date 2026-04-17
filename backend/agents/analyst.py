import json
from .llm_client import llm_client

class AnalystAgent:
    def __init__(self):
        self.system_prompt = """Eres un experto analista de ciberseguridad. Tu tarea es recibir los resultados en crudo de escaneos (JSON), clasificar la severidad usando CVSS (Informativa, Baja, Media, Alta, Crítica) y filtrar falsos positivos. Devuelve el resultado en formato JSON con la siguiente estructura: { "findings": [ { "title": "...", "severity": "...", "description": "...", "cvss_score": 0.0 } ] }."""

    def analyze_findings(self, raw_data: dict, scan_type: str) -> dict:
        prompt = f"{self.system_prompt}\n\nAnaliza los siguientes resultados del escaneo tipo {scan_type}:\n{json.dumps(raw_data)}\n\nDevuelve SOLAMENTE el JSON."
        resp = llm_client.generate(prompt=prompt)
        
        if "error" in resp:
            return {"error": resp["error"]}
        
        try:
            # Basic parsing to extract JSON if LLM added markdown tags
            text = resp["response"].strip()
            if text.startswith("```json"): text = text[7:]
            if text.startswith("```"): text = text[3:]
            if text.endswith("```"): text = text[:-3]
            
            return json.loads(text.strip())
        except Exception as e:
            # Fallback if LLM fail
            return {
                "findings": [{
                    "title": "Unparsed finding",
                    "severity": "info",
                    "description": resp.get("response", "No response"),
                    "cvss_score": 0.0
                }]
            }

analyst_agent = AnalystAgent()
