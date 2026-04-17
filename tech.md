# NEXUS AI - Stack Tecnológico y Arquitectura

## Arquitectura y Principios
El proyecto se rige bajo Arquitectura Limpia (Clean Architecture), asegurando una fuerte separación de responsabilidades y modularidad absoluta.

## Definición del Stack
- **Frontend (UI Desktop Native):** Framework web moderno (React/Vue) empaquetado con **Tauri**. Se eligió por brindar una compilación nativa en Windows con extrema ligereza en comparación a Electron.
- **Backend (Core Lógico):** Implementaciones y scripts en Python / Rust garantizando la ejecución de procesos críticos y acceso al sistema (sockets nativos, manipulación de archivos y procesos paralelos de escaneo).
- **Inteligencia Artificial:**  
  - Principal: Inferencias estrictamente locales a través de **Ollama** utilizando modelos ligeros y rápidos (Qwen, Llama 3) para preservar la máxima privacidad de datos sensitivos dentro de los análisis.
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

- **Integración Nativa de SO (Windows):** Módulos (`service_scanner.py` y `event_scanner.py`) que ejecutan `Powershell` y utilidades de `WMI`/`CIM` en un empaquetado asíncrono para recolectar telemetría en vivo del entorno host sin necesidad de agentes de terceros.
- **Orquestador PNL (Procesamiento de Lenguaje Natural):** Nuevo endpoint inteligente que toma la instrucción escrita del usuario y de manera autónoma ejecuta funciones en el backend gracias a la interpretación del LLM.
- **Reporting Multi-perfil:** Arquitectura expandida del generador que compila de manera simultánea un reporte Técnico, uno Ejecutivo/Profesional, y uno en Lenguaje Natural usando HTML/CSS dinámico.
- **Refactorización de Interfaces y Seguridad React:** Migración hacia *Vercel Composition Patterns*, definiendo directivas fuertes en TS (`src/types/backend.ts`), segregando componentes complejos como `Scanners.tsx` a submódulos (`AiAssistant.tsx`), reforzando semántica WAI-ARIA, e integrando variables inyectadas de entorno `.env` en vez de *endpoints* estáticos.
