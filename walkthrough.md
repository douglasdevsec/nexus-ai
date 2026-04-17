# NEXUS AI - Bitácora y Roadmap (Walkthrough)

## Roadmap del Desarrollo Activo
### Fase 1: Scaffold 
Establecimiento de la estructura madre, creación de documentos fundacionales y setup de Tauri + Entorno nativo de Backend Python/Rust.

### Fase 2: UI Base
Diseño de la experiencia de usuario minimalista y desarrollo de Single Page Application. Navegación entre paneles principales de OSINT, Consultas de Malware, Escaneos de Red, y Prompts del LLM.

### Fase 3: Conectores Python
Implementación pura en Backend de lógica para el Nmap Connector, Integración con API VirusTotal, DB local SQlite y los wrappers de comandos de OSINT.

### Fase 4: Integración IA
Creación de la lógica del LLM Orchestrator estableciendo roles fijos para agentes de interfaz de Ollama: Agente Analista (revisa vulnerabilidades), Agente Remediador (brinda mitigaciones) y Agente de Reportes (compone conclusiones formales).

### Fase 5: Reportes
Desarrollo de las rutinas de compilación en PDF/JSON/HTML para la entrega de la auditoría. Ajustes finos y debugging global.

## Bitácora Diaria (Append-Only Log)
- **Fase 1:** Creados los archivos base de documentación y control (`agent.md`, `skill.md`, `tech.md`, `walkthrough.md`).
