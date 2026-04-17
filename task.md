# NEXUS AI — Plan Maestro de Tareas (Append-Only)

> [!IMPORTANT]
> Este archivo es **append-only**. NUNCA se debe sobrescribir contenido existente.
> Solo se permite agregar nuevas tareas, actualizar estados de las existentes, o documentar mejoras.

> [!NOTE]
> Stack: **Tauri + React/TypeScript** (Frontend) · **Python/FastAPI** (Backend) · **SQLite** (DB) · **Ollama** (IA Local)
> Arquitectura: Clean Architecture con separación estricta Frontend ↔ Backend ↔ Capa IA

---

## Fase 1 — Scaffold y Estructura del Proyecto

> **Objetivo:** Generar la estructura de carpetas, archivos de configuración base y dependencias iniciales para que el proyecto compile y ejecute una ventana vacía de Tauri.

- [x] **1.1 Inicialización del proyecto Tauri + React**
  - [x] Crear proyecto con `create-tauri-app` (React + TypeScript)
  - [x] Verificar que `cargo tauri dev` levanta la ventana nativa vacía
  - [x] Configurar `tauri.conf.json` (título, dimensiones, icono placeholder)

- [x] **1.2 Estructura de carpetas del Frontend**
  - [x] `/src/components/` — Componentes reutilizables de UI
  - [x] `/src/pages/` — Vistas principales (Dashboard, Scanners, Reports, Settings)
  - [x] `/src/services/` — Clientes de comunicación con el backend
  - [x] `/src/stores/` — Estado global (Zustand o Context API)
  - [x] `/src/types/` — Interfaces y tipos TypeScript
  - [x] `/src/assets/` — Íconos, fuentes, imágenes

- [x] **1.3 Scaffold del Backend Python**
  - [x] Crear directorio `/backend/` en la raíz del proyecto
  - [x] `/backend/app/` — Módulo principal FastAPI
  - [x] `/backend/modules/` — Submódulos de escaneo (nmap, hashing, osint, web)
  - [x] `/backend/agents/` — Lógica de agentes IA
  - [x] `/backend/db/` — Modelos SQLite y migraciones
  - [x] `/backend/utils/` — Helpers y utilidades compartidas
  - [x] Generar `requirements.txt` con dependencias base
  - [x] Crear `backend/main.py` con servidor FastAPI mínimo (health-check endpoint)

- [x] **1.4 Base de Datos SQLite**
  - [x] Diseñar esquema inicial: tablas `scans`, `findings`, `reports`, `config`, `audit_log`
  - [x] Crear script de inicialización de la DB (`db/init_db.py`)

- [x] **1.5 Archivos de configuración y documentación**
  - [x] Crear `agent.md` — Directivas de comportamiento del agente
  - [x] Crear `skill.md` — Registro de capacidades y módulos
  - [x] Crear `tech.md` — Stack tecnológico y arquitectura
  - [x] Crear `walkthrough.md` — Bitácora y roadmap
  - [x] Crear `task.md` — Plan maestro de tareas (este archivo)
  - [x] `.gitignore` adecuado (node_modules, target, __pycache__, .env, *.db)
  - [x] Actualizar `README.md` con instrucciones de instalación y ejecución

---

## Fase 2 — GUI Base y Panel de Configuración IA

> **Objetivo:** Construir la interfaz de escritorio funcional con tema oscuro, navegación entre módulos, panel de configuración de IA y controles de escaneo.

- [x] **2.1 Sistema de diseño y tema oscuro**
  - [x] Definir paleta de colores (fondo oscuro, acentos funcionales, estados de alerta)
  - [x] Configurar tipografía (Inter / JetBrains Mono para consola)
  - [x] Crear variables CSS globales y tokens de diseño
  - [x] Implementar componentes base: Button, Card, Input, Badge, Table

- [x] **2.2 Layout principal y navegación**
  - [x] Sidebar con navegación entre módulos (Dashboard, Escáneres, Reportes, Configuración)
  - [x] Header con indicador de estado del sistema (IA conectada/desconectada, backend activo)
  - [x] Área de contenido principal con enrutamiento

- [x] **2.3 Panel de Configuración de IA (`/settings`)**
  - [x] Selector de motor: Local (Ollama) o API en la nube (OpenAI / Anthropic)
  - [x] Campo para API Key (con toggle de visibilidad y validación)
  - [x] Dropdown para modelo local disponible (detección automática vía Ollama API)
  - [x] Botón de "Test de Conexión" con feedback visual
  - [x] Persistencia de configuración en SQLite

- [x] **2.4 Página de Dashboard**
  - [x] Tarjetas de resumen: Total de escaneos, vulnerabilidades por severidad, último escaneo
  - [x] Tabla de actividad reciente (últimos 10 hallazgos)
  - [x] Indicadores de estado de cada módulo

- [x] **2.5 Interfaz de módulos de escaneo**
  - [x] Vista con tabs para cada módulo (Red, Malware, Web, OSINT, Infraestructura)
  - [x] Botones de control por módulo: `Iniciar`, `Pausar`, `Reanudar`, `Detener`
  - [x] Campos de input específicos por módulo (IP/dominio objetivo, ruta de archivos)

- [ ] **2.6 Consola integrada en tiempo real**
  - [ ] Área de terminal con scroll automático y timestamps
  - [ ] Diferenciación visual por tipo de mensaje (comando, resultado, error, pensamiento IA)
  - [ ] Botón de limpiar/exportar consola

- [ ] **2.7 Barra de chat interactiva (Input bidireccional)**
  - [ ] Input de texto para instrucciones en lenguaje natural
  - [ ] Historial de mensajes con burbujas diferenciadas (usuario vs. agente)
  - [ ] Parsing de intenciones (preparación para la Fase 4)

---

## Fase 3 — Integración del Backend Python

> **Objetivo:** Conectar el frontend con el backend Python. Implementar los primeros módulos funcionales (escaneo de puertos y hashing de archivos) con resultado visible en la GUI.

- [ ] **3.1 Canal de comunicación Tauri ↔ Python**
  - [ ] Implementar spawn de subproceso Python (sidecar) desde Tauri
  - [ ] Establecer protocolo de comunicación (stdin/stdout JSON o HTTP local)
  - [ ] Crear servicio frontend (`/src/services/backend.ts`) para enviar/recibir comandos
  - [ ] Manejo de errores y reconexión automática

- [ ] **3.2 Módulo de Red — Nmap Engine**
  - [ ] `backend/modules/nmap_scanner.py` — Wrapper de python-nmap
  - [ ] Escaneo TCP SYN básico por rango de puertos
  - [ ] Detección de servicios y versiones (`-sV`)
  - [ ] Fingerprinting de OS (`-O`) con privilegios
  - [ ] Output estructurado JSON → frontend → tabla de resultados
  - [ ] Streaming de progreso en tiempo real a la consola integrada

- [ ] **3.3 Módulo de Detección de Malware — Hash Scanner**
  - [ ] `backend/modules/hash_scanner.py` — Scanner del sistema de archivos
  - [ ] Cálculo de SHA-256 para archivos en una ruta dada
  - [ ] Comparación contra base de datos local de hashes maliciosos conocidos
  - [ ] Consulta opcional a API de VirusTotal para verificación cruzada
  - [ ] Output: lista de archivos con estado (limpio, sospechoso, malicioso)
  - [ ] Barra de progreso en el frontend

- [ ] **3.4 Persistencia de resultados**
  - [ ] Guardar cada escaneo y sus hallazgos en SQLite
  - [ ] Endpoint para consultar historial de escaneos
  - [ ] Renderizar historial en la tabla del Dashboard

- [ ] **3.5 Control de procesos**
  - [ ] Implementar lógica de `Pausar` / `Reanudar` / `Detener` en backend
  - [ ] Sincronizar estado de botones en el frontend con el estado real del proceso

---

## Fase 4 — Inyección del Agente IA

> **Objetivo:** Conectar Ollama (o API en la nube) al flujo de datos. Los resultados pasan por el LLM para análisis automatizado, clasificación CVSS y generación de reportes.

- [ ] **4.1 Conector Ollama / LLM**
  - [ ] `backend/agents/llm_client.py` — Cliente unificado para Ollama y APIs en la nube
  - [ ] Detección automática de modelos locales disponibles
  - [ ] Sistema de prompts con templates parametrizables
  - [ ] Manejo de streaming de respuestas del LLM

- [ ] **4.2 Agente Analista**
  - [ ] `backend/agents/analyst.py`
  - [ ] Recibe JSON crudo de los módulos de escaneo
  - [ ] Filtra falsos positivos mediante análisis contextual
  - [ ] Clasifica severidad usando estándar CVSS (Crítica, Alta, Media, Baja, Informativa)
  - [ ] Output: JSON enriquecido con análisis y scoring

- [ ] **4.3 Agente Remediador**
  - [ ] `backend/agents/remediator.py`
  - [ ] Por cada hallazgo válido, genera instrucciones de mitigación paso a paso
  - [ ] Priorización de remediaciones por impacto
  - [ ] Sugerencias específicas para entornos Windows

- [ ] **4.4 Generador de Reportes**
  - [ ] `backend/agents/report_generator.py`
  - [ ] **Perfil Técnico:** Comandos ejecutados, vectores de ataque, evidencia bruta, hashes
  - [ ] **Perfil Ejecutivo:** Resumen de riesgos de negocio, impacto financiero, soluciones
  - [ ] Exportación a PDF (weasyprint o reportlab)
  - [ ] Exportación a HTML con estilos embebidos
  - [ ] Selector de perfil en la interfaz de reportes

- [ ] **4.5 Flujo integrado end-to-end**
  - [ ] Escaneo → Análisis IA → Clasificación → Remediación → Reporte
  - [ ] Pensamientos del agente visibles en consola integrada en tiempo real
  - [ ] Barra de chat procesa instrucciones en lenguaje natural y ejecuta módulos
  - [ ] Validación completa del flujo con caso de prueba real

---

## Fase 5 — Reportes y Pulido Final

> **Objetivo:** Motor de compilación de reportes exportables y ajustes finos globales.

- [ ] **5.1 Motor de reportes**
  - [ ] Compilación PDF/JSON/HTML para entrega de auditoría
  - [ ] Templates personalizables por tipo de cliente
  - [ ] Inclusión de evidencia visual (screenshots, gráficos de severidad)

- [ ] **5.2 Pulido y QA**
  - [ ] Debugging global de todos los módulos
  - [ ] Optimización de rendimiento y uso de memoria
  - [ ] Tests unitarios y de integración

---

## Backlog — Módulos Futuros

> Estos módulos se implementarán después de validar las fases principales.

- [ ] Módulo de Infraestructura Web — Wappalyzer logic, SSL/TLS, cabeceras de seguridad
- [ ] Módulo OSINT Corporativo — Emails, teléfonos y datos expuestos por dominio
- [ ] Módulo de Vulnerabilidades Web — Directorios ocultos, archivos de config expuestos, secretos
- [ ] Auto-actualización de base de hashes maliciosos
- [ ] Sistema de notificaciones y alertas
- [ ] Exportación de logs de auditoría forense
