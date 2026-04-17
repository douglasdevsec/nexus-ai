from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
from modules.nmap_scanner import nmap_engine
from modules.hash_scanner import hash_scanner
from db.crud import save_scan, get_recent_scans
from agents.analyst import analyst_agent
from agents.remediator import remediator_agent
from agents.report_generator import report_generator
from agents.orchestrator import orchestrator_agent
from modules.service_scanner import service_scanner
from modules.event_scanner import event_scanner

class NetworkTarget(BaseModel):
    target: str

class AgentPrompt(BaseModel):
    prompt: str

class MalwareTarget(BaseModel):
    path: str

class ScanControl(BaseModel):
    command: str

class AnalyzeTarget(BaseModel):
    scan_id: int
    raw_data: dict
    scan_type: str

app = FastAPI(title="AegisAgent Backend API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/scan/analyze")
def analyze_scan(payload: AnalyzeTarget):
    # 1. Analyst
    analysis = analyst_agent.analyze_findings(payload.raw_data, payload.scan_type)
    
    # 2. Remediator (for each finding)
    findings = analysis.get("findings", [])
    for f in findings:
        rem = remediator_agent.remediate_finding(f)
        f["remediation"] = rem
    
    # 3. Report Generation
    full_data = {"target": "Analyzed Target", "findings": findings}
    pdf_path = report_generator.generate_pdf(full_data, "Ejecutivo")
    html_path = report_generator.generate_html(full_data, "Técnico")

    return {
        "status": "success", 
        "analysis": analysis,
        "reports": {
            "pdf": pdf_path,
            "html": html_path
        }
    }

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "AegisAgent backend is running."}

@app.post("/scan/control")
def control_scan(payload: ScanControl):
    # Mocking process control for Phase 3
    print(f"Received scan control command: {payload.command}")
    return {"status": "success", "command_executed": payload.command}

@app.post("/scan/network")
def scan_network(payload: NetworkTarget):
    res = nmap_engine.scan_network(target=payload.target)
    save_scan(payload.target, "network", "completed" if "error" not in res else "failed", res)
    return res

@app.post("/scan/malware")
def scan_malware(payload: MalwareTarget):
    res = hash_scanner.scan_directory(directory_path=payload.path)
    save_scan(payload.path, "malware", "completed" if "error" not in res else "failed", res)
    return res

@app.post("/scan/services")
def scan_services():
    res = service_scanner.scan_services()
    save_scan("Services", "service", "completed" if "error" not in res else "failed", res)
    return res

@app.post("/scan/events")
def scan_events():
    res = event_scanner.scan_security_events(max_events=100)
    save_scan("Events", "event", "completed" if "error" not in res else "failed", res)
    return res

@app.post("/scan/agent")
def agent_scan(payload: AgentPrompt):
    intent = orchestrator_agent.parse_intent(payload.prompt)
    if intent == "SERVICE_SCAN":
        raw = service_scanner.scan_services()
        target = "Servicios de Windows"
    elif intent == "EVENT_SCAN":
        raw = event_scanner.scan_security_events(max_events=150)
        target = "Eventos de Seguridad"
    elif intent == "NETWORK_SCAN":
        raw = nmap_engine.scan_network(target="127.0.0.1")
        target = "Localhost Network"
    elif intent == "MALWARE_SCAN":
        raw = hash_scanner.scan_directory(directory_path="C:\\Windows\\Temp")
        target = "Malware (C:\\Windows\\Temp)"
    else:
        return {"status": "error", "message": "No entendí qué escaneo necesitas hacer."}
        
    analysis = analyst_agent.analyze_findings(raw, intent)
    
    findings = analysis.get("findings", [])
    for f in findings:
        rem = remediator_agent.remediate_finding(f)
        f["remediation"] = rem
        
    full_data = {"target": target, "intent": intent, "findings": findings}
    
    # Generar los 3 reportes
    report_paths = report_generator.generate_all_html_reports(full_data)
    
    return {
        "status": "success",
        "intent": intent,
        "analysis": analysis,
        "reports": report_paths
    }

@app.get("/scans")
def get_scans():
    return get_recent_scans()
