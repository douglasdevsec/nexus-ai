from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
from modules.nmap_scanner import nmap_engine
from modules.hash_scanner import hash_scanner
from db.crud import save_scan, get_recent_scans

class NetworkTarget(BaseModel):
    target: str

class MalwareTarget(BaseModel):
    path: str

class ScanControl(BaseModel):
    command: str

app = FastAPI(title="AegisAgent Backend API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
