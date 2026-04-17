import nmap
import json
import logging

logger = logging.getLogger(__name__)

class NmapEngine:
    def __init__(self):
        try:
            self.scanner = nmap.PortScanner()
        except nmap.PortScannerError as e:
            logger.error(f"Nmap not found or correctly installed: {e}")
            self.scanner = None

    def scan_network(self, target: str, ports: str = "1-1000", aggressive: bool = False):
        if not self.scanner:
            return {"error": "Nmap not installed on backend host."}

        # Base arguments: SYN scan, Service versioning. OS fingerprinting needs root.
        arguments = "-sS -sV"
        if aggressive:
            arguments += " -O" 

        try:
            logger.info(f"Starting Nmap scan against {target} with args {arguments} on ports {ports}")
            self.scanner.scan(hosts=target, ports=ports, arguments=arguments)
            
            result = []
            for host in self.scanner.all_hosts():
                host_info = {
                    "ip": host,
                    "state": self.scanner[host].state(),
                    "protocols": []
                }
                
                for proto in self.scanner[host].all_protocols():
                    proto_info = {"name": proto, "ports": []}
                    ports_list = self.scanner[host][proto].keys()
                    for port in sorted(ports_list):
                        port_status = self.scanner[host][proto][port]
                        proto_info["ports"].append({
                            "port": port,
                            "state": port_status['state'],
                            "service": port_status['name'],
                            "version": port_status['version']
                        })
                    host_info["protocols"].append(proto_info)
                
                # OS Match if available
                if 'osmatch' in self.scanner[host] and len(self.scanner[host]['osmatch']) > 0:
                    host_info['os'] = self.scanner[host]['osmatch'][0]['name']

                result.append(host_info)

            return {"target": target, "result": result}
        except Exception as e:
            logger.error(f"Nmap scan failed: {str(e)}")
            return {"error": str(e)}

# instance matching
nmap_engine = NmapEngine()
