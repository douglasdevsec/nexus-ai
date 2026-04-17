from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
from modules.nmap_scanner import nmap_engine
from modules.hash_scanner import hash_scanner

class NetworkTarget(BaseModel):
    target: str

class MalwareTarget(BaseModel):
    path: str

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

@app.post("/scan/network")
def scan_network(payload: NetworkTarget):
    res = nmap_engine.scan_network(target=payload.target)
    return res

@app.post("/scan/malware")
def scan_malware(payload: MalwareTarget):
    res = hash_scanner.scan_directory(directory_path=payload.path)
    return res
