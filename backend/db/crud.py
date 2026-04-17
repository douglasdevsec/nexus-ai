import sqlite3
import json
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "aegis.db")

def get_connection():
    return sqlite3.connect(DB_PATH)

def save_scan(target: str, scan_type: str, status: str, result_json: dict):
    conn = get_connection()
    c = conn.cursor()
    c.execute(
        "INSERT INTO scans (target, module_name, status) VALUES (?, ?, ?)",
        (target, scan_type, status)
    )
    scan_id = c.lastrowid
    
    # Store raw result somehow or just ignore it in findings since AI isn't doing it yet.
    # We will serialize as description for now to keep the JSON.
    c.execute(
        "INSERT INTO findings (scan_id, severity, title, description, remediation) VALUES (?, ?, ?, ?, ?)",
        (scan_id, 'info', f'Raw result for {scan_type}', json.dumps(result_json), 'N/A')
    )
    
    conn.commit()
    conn.close()
    return scan_id

def get_recent_scans(limit: int = 10):
    conn = get_connection()
    c = conn.cursor()
    c.execute(
        "SELECT id, target, module_name, status, created_at FROM scans ORDER BY created_at DESC LIMIT ?",
        (limit,)
    )
    rows = c.fetchall()
    conn.close()
    
    scans = []
    for r in rows:
        scans.append({
            "id": r[0],
            "target": r[1],
            "type": r[2], # mapper calls it vulns, our frontend wants type for the table
            "status": r[3],
            "timestamp": r[4]
        })
    return scans
