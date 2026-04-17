import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "aegis.db")

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Create scans table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS scans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        module_name TEXT NOT NULL,
        target TEXT NOT NULL,
        status TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # Create findings table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS findings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        scan_id INTEGER,
        severity TEXT,
        title TEXT,
        description TEXT,
        remediation TEXT,
        FOREIGN KEY(scan_id) REFERENCES scans(id)
    )
    """)

    conn.commit()
    conn.close()
    print(f"Database initialized at {DB_PATH}")

if __name__ == "__main__":
    init_db()
