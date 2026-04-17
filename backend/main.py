from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AegisAgent Backend API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Tauri uses localhost or a custom scheme
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "AegisAgent backend is running."}
