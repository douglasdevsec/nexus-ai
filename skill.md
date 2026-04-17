# NEXUS AI - Registro de Capacidades (Skills)

## Herramientas Core y Funciones Planificadas
Este documento mantiene el registro de los módulos, conectores y lógicas que componen la funcionalidad del proyecto.

### Módulos Principales
- **Nmap Connector:** Controlador de procesos para ejecución de Nmap y parsing avanzado (XML/estructurado) de resultados.
- **OSINT Scraper:** Módulo para la automatización de búsqueda e indexación de fuentes abiertas.
- **Wappalyzer Logic:** Implementación asincrona para reconocimiento de tecnologías empleadas en los assets web detectados.
- **VirusTotal Hash Checker:** Servicio asíncrono para consumir APIs de VT verificando hashes de archivos detectados (MD5/SHA256).
- **LLM Orchestrator:** Sistema multi-agente central para coordinar instrucciones con Ollama, administrando el flujo entre IA local, Backend y Frontend.

## Registro Histórico de Capacidades
*(Nuevas funciones añadidas a continuación)*

- **Scan Windows Services:** Capacidad de enumerar servicios en ejecución locales e identificar "Unquoted service paths" y directorios peligrosos de ejecución (AppData/Temp).
- **Windows Security Event Parser:** Capacidad de consumir registros de seguridad local para detectar Eventos Críticos (Logon failures - 4625, RDP Interactive - Type 10) de forma algorítmica.
- **NLP Orchestrator:** Habilidad de digerir lenguaje natural crudo para predecir y auto-ejecutar el tipo de escaneo idóneo sin interactuar directamente con la UI técnica.
