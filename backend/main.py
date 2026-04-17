from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
from modules.nmap_scanner import nmap_engine
from modules.hash_scanner import hash_scanner
from db.crud import save_scan, get_recent_scans
from agents.analyst import analyst_agent
from agents.remediator import remediator_agent
from agents.report_generator import report_generator

class NetworkTarget(BaseModel):
    target: str

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

@app.get("/scans")
def get_scans():
    return get_recent_scans()
