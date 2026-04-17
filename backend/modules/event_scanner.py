import subprocess
import json
import logging

logger = logging.getLogger(__name__)

class EventScanner:
    def scan_security_events(self, max_events=50) -> dict:
        """
        Analiza los logs de eventos de Seguridad de Windows, centrándose en
        conexiones de escritorio remoto (Logon Type 10) y fallos de inicio de sesión (4625).
        """
        ps_script = f"""
        $events = Get-WinEvent -FilterHashtable @{{LogName='Security'; Id=4624,4625}} -MaxEvents {max_events} -ErrorAction SilentlyContinue
        $results = @()
        foreach ($e in $events) {{
            $type = if ($e.Id -eq 4624) {{ "Successful Logon" }} else {{ "Failed Logon" }}
            
            # Extraer Logon Type si es posible del mensaje o propiedades.
            $logonType = "Unknown"
            if ($e.Message -match 'Logon Type:\s+(\d+)') {{
                $logonType = $matches[1]
            }}

            $risk = "Low"
            # Logon remoto interactivo RDP
            if ($logonType -eq "10" -and $e.Id -eq 4624) {{
                $risk = "Medium"
                $type = "RDP Successful Logon"
            }}
            # Fallo de Logon
            if ($e.Id -eq 4625) {{
                $risk = "Medium"
            }}

            $results += @{{
                EventID = $e.Id
                Type = $type
                Time = $e.TimeCreated.ToString('yyyy-MM-dd HH:mm:ss')
                LogonType = $logonType
                RiskLevel = $risk
            }}
        }}
        $results | ConvertTo-Json -Depth 2
        """
        
        try:
            result = subprocess.run(
                ["powershell", "-NoProfile", "-Command", ps_script],
                capture_output=True,
                text=True,
                check=True
            )
            
            output = result.stdout.strip()
            if not output:
                return {"target": "Windows Event Logs (Security)", "error": "No matching events found or no admin privileges."}
            
            data = json.loads(output)
            if isinstance(data, dict): # if single object
                data = [data]
                
            suspicious = [d for d in data if d.get("RiskLevel") in ["Medium", "High"]]
                
            return {
                "target": "Windows Event Logs (Security)",
                "total_analyzed": len(data),
                "suspicious_found": len(suspicious),
                "raw_findings": suspicious[:20] if suspicious else data[:10]
            }
        except subprocess.CalledProcessError as e:
            logger.error(f"Error scanning events: {e.stderr}")
            return {"target": "Windows Event Logs", "error": "Requiere correr el backend como Administrador. " + str(e.stderr)}
        except Exception as e:
            logger.error(f"Failed parsing events output: {e}")
            return {"target": "Windows Event Logs", "error": repr(e)}

event_scanner = EventScanner()
