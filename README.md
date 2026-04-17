# AegisAgent (NEXUS AI)

Aplicación de escritorio nativa orientada a la auditoría de seguridad corporativa, análisis de vulnerabilidades, escaneo de red y detección de amenazas (Malware/Ransomware). 
Construida bajo **Arquitectura Limpia** con componentes de React (Vercel Composition Patterns) e impulsada por un robusto orquestador de Inteligencia Artificial que comprende el lenguaje natural.

## Tecnologías Principales
- **Frontend**: React + TypeScript + Vite (Tauri v2)
- **Backend**: Python 3.10+ (FastAPI, pydantic)
- **IA y Orquestación**: `google-generativeai` (Gemini API) y agentes totalmente locales (Ollama).
- **Herramientas Nativas**: Nmap, OSINT Modules, Análisis de Servicios Windows y EventLog Security Parsers.

---

## 🔐 Seguridad y Privacidad (Uso de IAs)

NEXUS AI interconecta diferentes motores de Inteligencia Artificial en función de las necesidades de la corporación. Hemos garantizado que el sistema sea seguro y resistente al filtrado de datos:

### 1. Ejecución Local (Ollama)
**Nivel de Privacidad: Máxima (Privacy-First / Air-Gapped) 🟢**
* Por defecto, la app puede rutear toda su lógica a través de Ollama (`localhost:11434`).
* *Qué significa esto:* El modelo corre 100% en el procesador/tarjeta gráfica del usuario. No se envía ningún extracto de código, logs de servidores, red o promts a internet o nubes externas. Todo queda retenido físicamente en la computadora.

### 2. Ejecución Remota (Google Gemini API / OpenAI)
**Nivel de Privacidad: Segura (Efímera) 🟡**
Si los usuarios requieren mayor poder de razonamiento rápido y seleccionan Google Gemini desde el panel de `<Configuración>`:
* **Inyección Efímera:** La API Key (`AIzaSy...`) introducida en la interfaz se guarda estrictamente en la Memoria RAM (`llm_client.py`) mientras la herramienta esté encendida. No transacciona hacia el disco duro ni se expone a archivos base de código `.py` o `.ts`.
* **Regla de ORO para colabores en GitHub:** **Jamás incrustes (hardcode) una API Key en el código fuente de este repositorio público**. Hacerlo provocará que bots automatizados secuestren las credenciales en segundos causando infiltraciones de facturación considerables en tu consola de GCP/AWS.
* *Próximos pasos:* Para despliegues corporativos compilados finales, las claves se almacenarán en bóvedas fuertemente encriptadas por las configuraciones nativas seguras de la bóveda de Tauri o variables de un archivo ignorado estricto `.env`.

---

## Instalación y Ejecución Local

### Prerrequisitos
1. **Node.js** y **npm** (Frontend).
2. **Rust** y **Cargo** (Backbone Nativo de Tauri V2).
3. **Python 3.10+** (Motor Analítico de FastAPI).
4. *(Opcional)* Terminal o CLI de [Ollama](https://ollama.com/) para escaneos sin internet + el modelo `llama3`.

### 1. Levantar el Motor Backend (Python)
Dentro del nivel de la carpeta `/backend`:
```bash
# Crear entorno
python -m venv venv
.\venv\Scripts\activate
# Instalar dependencias
pip install -r requirements.txt
# Iniciar Servidor
uvicorn main:app --reload --port 8000
```

### 2. Levantar el Frontend (React / Tauri)
En otra terminal, en el nivel raíz del proyecto:
```bash
npm install
npm run tauri dev
```

> Tu GUI en ventana nativa aislará la aplicación y estará 100% conectada al puerto dinámico `VITE_API_URL`.
