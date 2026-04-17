import hashlib
import os
import logging
from pathlib import Path

logger = logging.getLogger(__name__)

class HashScanner:
    def __init__(self):
        # In a real app, this would be loaded from SQLite or an external DB
        self.known_malicious_hashes = {
            "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8", # dummy
            "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" # empty string hash (dummy)
        }

    def compute_sha256(self, filepath: str) -> str:
        sha256_hash = hashlib.sha256()
        try:
            with open(filepath, "rb") as f:
                for byte_block in iter(lambda: f.read(4096), b""):
                    sha256_hash.update(byte_block)
            return sha256_hash.hexdigest()
        except Exception as e:
            logger.error(f"Error reading file {filepath}: {e}")
            return "ERROR"

    def scan_directory(self, directory_path: str):
        path = Path(directory_path)
        if not path.exists() or not path.is_dir():
            return {"error": "Invalid directory path."}

        results = []
        try:
            # For simplicity we only do max nesting 1 or top files to avoid huge lag
            for file in path.rglob("*"):
                if file.is_file():
                    h = self.compute_sha256(str(file))
                    status = "malicious" if h in self.known_malicious_hashes else "clean"
                    if h == "ERROR":
                        status = "error"

                    results.append({
                        "file": str(file),
                        "hash": h,
                        "status": status
                    })
                    
                    if len(results) > 100: # Limit for safety in this iterative phase
                        break
                        
            return {"target": directory_path, "scanned_files": len(results), "result": results}
        except Exception as e:
            logger.error(f"Error scanning directory: {e}")
            return {"error": str(e)}

hash_scanner = HashScanner()
