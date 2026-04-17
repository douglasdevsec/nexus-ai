import json
from .llm_client import llm_client

class RemediatorAgent:
    def __init__(self):
        self.system_prompt = """Eres un arquitecto de seguridad senior. Recibes un hallazgo de vulnerabilidad en formato JSON y debes proporcionar pasos detallados de mitigación orientados a entornos Windows. Devuelve un JSON estructurado de la forma: { "mitigation_steps": ["paso 1", "paso 2"], "impact": "alto/medio/bajo", "references": ["url1"] }."""

    def remediate_finding(self, finding: dict) -> dict:
        prompt = f"{self.system_prompt}\n\nVulnerabilidad:\n{json.dumps(finding)}\n\nDevuelve SOLAMENTE el JSON."
        resp = llm_client.generate(prompt=prompt)
        
        if "error" in resp:
            return {"error": resp["error"]}
        
        try:
            text = resp["response"].strip()
            if text.startswith("```json"): text = text[7:]
            if text.startswith("```"): text = text[3:]
            if text.endswith("```"): text = text[:-3]
            
            return json.loads(text.strip())
        except Exception as e:
            return {
                "mitigation_steps": ["Review system logs and update system."],
                "impact": "unknown",
                "references": []
            }

remediator_agent = RemediatorAgent()
