# AegisAgent (NEXUS AI)

Aplicación de escritorio nativa orientada a la auditoría de seguridad, análisis de vulnerabilidades y detección de amenazas (Malware/Ransomware). 
Construida bajo **Arquitectura Limpia** con capacidades modulares e impulsada por una IA local.

## Tecnologías Principales
- **Frontend**: React + TypeScript (Tauri)
- **Backend**: Python (FastAPI, integraciones de bajo nivel)
- **Inteligencia Artificial**: Agentes locales basados en Ollama (LLM)
- **Almacenamiento**: SQLite
- **Herramientas OS**: Nmap, Wappalyzer, VirusTotal Hashes

## Instalación y Ejecución Local

### Prerrequisitos
1. **Node.js** y **npm** (para el frontend de React).
2. **Rust** y **Cargo** (para los bindings nativos de Tauri).
3. **Python 3.10+** (para los submódulos de seguridad y motor de FastAPI).

### Pasos
1. Instalar dependencias del GUI:
   ```bash
   npm install
   ```
2. Iniciar el entorno de desarrollo de Tauri en Windows/Linux:
   ```bash
   npm run tauri dev
   ```

*(Instrucciones de backend y agentes IA se detallarán en Fases 3 y 4).*
