import json
import os
from .llm_client import llm_client
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
import uuid

class ReportGenerator:
    def __init__(self):
        self.output_dir = os.path.join(os.path.dirname(__file__), "..", "..", "reports")
        os.makedirs(self.output_dir, exist_ok=True)
        
    def generate_html(self, data: dict, profile: str) -> str:
        prompt = f"""
Genera un reporte de auditoría en formato HTML completo con estilos CSS integrados usando tema oscuro (dark mode) y diseño moderno y profesional.
Perfil: {profile}

Los datos del hallazgo son:
{json.dumps(data, indent=2)}

Devuelve SOLO EL CÓDIGO HTML sin explicaciones ni backticks markdown, comienza con <!DOCTYPE html>.
"""
        resp = llm_client.generate(prompt=prompt)
        text = resp.get("response", "<html><body>Error generando HTML</body></html>")
        # cleanup markdown
        if text.startswith("```html"): text = text[7:]
        if text.endswith("```"): text = text[:-3]
        
        filename = f"report_{profile}_{uuid.uuid4().hex[:8]}.html"
        filepath = os.path.join(self.output_dir, filename)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(text.strip())
            
        return filepath

    def generate_pdf(self, data: dict, profile: str) -> str:
        # For full implementation, ReportLab needs lots of paragraph logic.
        # This is a stub that creates a simple PDF.
        filename = f"report_{profile}_{uuid.uuid4().hex[:8]}.pdf"
        filepath = os.path.join(self.output_dir, filename)
        
        c = canvas.Canvas(filepath, pagesize=letter)
        c.drawString(100, 750, f"AegisAgent - Reporte {profile.capitalize()}")
        c.drawString(100, 730, f"Objetivo: {data.get('target', 'N/A')}")
        c.drawString(100, 710, "Este es un reporte exportado automáticamente.")
        
        y = 680
        for info in data.get('findings', []):
            if y < 100:
                c.showPage()
                y = 750
            c.drawString(100, y, f"- {info.get('title', 'Unknown')} ({info.get('severity', 'info')})")
            y -= 20
        c.save()
        return filepath

report_generator = ReportGenerator()
