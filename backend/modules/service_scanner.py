import subprocess
import json
import logging

logger = logging.getLogger(__name__)

class ServiceScanner:
    def scan_services(self) -> dict:
        """
        Escanea los servicios de Windows en busca de rutas dudosas o ejecutables no estándar.
        Retorna una lista de servicios y sus posibles banderas de riesgo.
        """
        ps_script = """
        $services = Get-CimInstance Win32_Service | Select-Object Name, DisplayName, State, PathName, StartMode
        $results = @()
        foreach ($s in $services) {
            $risk = "None"
            $reason = ""
            
            # Chequear Unquoted Service Path (si tiene espacios y no tiene comillas)
            if ($s.PathName -notmatch '^"' -and $s.PathName -match ' ') {
                $risk = "Medium"
                $reason = "Unquoted Service Path detectado"
            }
            
            # Chequear carpetas inusuales (AppData, Temp, ProgramData)
            if ($s.PathName -match 'AppData' -or $s.PathName -match 'Temp') {
                $risk = "High"
                $reason = "Se ejecuta desde carpeta temporal o de usuario"
            }

            $results += @{
                Name = $s.Name
                DisplayName = $s.DisplayName
                State = $s.State
                PathName = $s.PathName
                StartMode = $s.StartMode
                RiskLevel = $risk
                Warning = $reason
            }
        }
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
                return {"target": "Windows Services", "error": "No result returned"}
            
            data = json.loads(output)
            
            # Filtrar para mostrar prioritariamente los sospechosos o en ejecución
            findings = []
            for item in data:
                if item.get("RiskLevel") in ["Medium", "High"]:
                    findings.append(item)
                    
            return {
                "target": "Windows Services",
                "total_scanned": len(data),
                "suspicious_found": len(findings),
                "raw_findings": findings if findings else data[:10] # Show some if none suspicious
            }
        except subprocess.CalledProcessError as e:
            logger.error(f"Error scanning services: {e.stderr}")
            return {"target": "Windows Services", "error": str(e.stderr)}
        except Exception as e:
            logger.error(f"Failed parsing services output: {e}")
            return {"target": "Windows Services", "error": str(e)}

service_scanner = ServiceScanner()
