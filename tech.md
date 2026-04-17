# NEXUS AI - Stack Tecnológico y Arquitectura

## Arquitectura y Principios
El proyecto se rige bajo Arquitectura Limpia (Clean Architecture), asegurando una fuerte separación de responsabilidades y modularidad absoluta.

## Definición del Stack
- **Frontend (UI Desktop Native):** Framework web moderno (React/Vue) empaquetado con **Tauri**. Se eligió por brindar una compilación nativa en Windows con extrema ligereza en comparación a Electron.
- **Backend (Core Lógico):** Implementaciones y scripts en Python / Rust garantizando la ejecución de procesos críticos y acceso al sistema (sockets nativos, manipulación de archivos y procesos paralelos de escaneo).
- **Inteligencia Artificial:**  
  - Principal: Inferencias estrictamente locales a través de **Ollama** utilizando modelos ligeros y rápidos (Qwen, Llama 3) para preservar la máxima privacidad de datos sensitivos dentro de los análisis.
  - Secundaria: Fallback o capas de contexto complejas configurables a APIs (OpenAI, Anthropic).
- **Almacenamiento Local:** **SQLite** empotrado, diseñado para persistir metadatos de auditorías, resultados, perfiles de proyectos y logs en un único archivo fácilmente auditable y manipulable sin servidores externos.

## Evolución de Arquitectura
*(Nuevos componentes arquitectónicos agregados a continuación)*
