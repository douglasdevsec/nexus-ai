import { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { Bot, Download, CheckCircle, AlertTriangle } from 'lucide-react';
import { IAiScanResult } from '../types/backend';

export const AiAssistant = () => {
  const [nlpPrompt, setNlpPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<IAiScanResult | null>(null);

  const executeAiScan = async () => {
    if (!nlpPrompt.trim()) return;
    setAiLoading(true);
    setAiResult(null);

    const controller = new AbortController();
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/scan/agent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: nlpPrompt }),
        signal: controller.signal
      });
      const data: IAiScanResult = await res.json();
      setAiResult(data);
    } catch (e) {
      if (e instanceof Error && e.name !== 'AbortError') {
        console.error("AI Scan Error:", e);
      }
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="ai-assistant-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
      <Input 
        label="Instrucción en Lenguaje Natural" 
        placeholder="ej. Analiza mis servicios de Windows o chequea si hay conexiones remotas..."
        value={nlpPrompt}
        onChange={(e) => setNlpPrompt(e.target.value)}
        aria-label="Prompt de lenguaje natural para IA"
      />
      <Button 
        variant="primary" 
        style={{ alignSelf: 'flex-start', display: 'flex', gap: '0.5rem', alignItems: 'center' }} 
        onClick={executeAiScan} 
        disabled={aiLoading}
        aria-disabled={aiLoading}
        aria-live="polite"
      >
        <Bot size={16} aria-hidden="true" /> {aiLoading ? 'Analizando, por favor espera...' : 'Ejecutar Escaneo Inteligente'}
      </Button>
      
      {aiResult && (
        <section 
          className="ai-result-panel" 
          aria-live="assertive"
          style={{ marginTop: '1.5rem', padding: '1.5rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}
        >
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <CheckCircle size={20} color="var(--primary-color)" aria-hidden="true" /> Resultados del Análisis
          </h3>
          <p style={{ margin: '1rem 0' }}>
            <strong>Intención Detectada:</strong> <span style={{ color: 'var(--primary-color)' }}>{aiResult.intent}</span>
          </p>
          
          <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }}>
            <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={16} color="#ff9800" aria-hidden="true" /> Hallazgos Resumidos
            </h4>
            <ul style={{ margin: '0', paddingLeft: '1.5rem', color: 'var(--text-secondary)' }} aria-label="Lista de hallazgos del análisis">
                {(aiResult.analysis?.findings && aiResult.analysis.findings.length > 0) ? (
                  aiResult.analysis.findings.map((f, idx) => (
                    <li key={idx} style={{ marginBottom: '1rem' }}>
                      <strong style={{ color: 'white' }}>{f.title}</strong>{' '}
                      <span className="cvss-badge" style={{ fontSize: '0.8rem', padding: '2px 6px', background: 'var(--bg-tertiary)', borderRadius: '4px' }}>
                        CVSS: {f.cvss_score}
                      </span><br/>
                      {f.description} <br/>
                      {f.remediation && <span style={{ fontSize: '0.9rem', color: '#ff9800' }}>Remediación: {f.remediation}</span>}
                    </li>
                  ))
                ) : (
                  <li>No hubieron hallazgos detectados o el modelo no arrojó resultados interpretables.</li>
                )}
            </ul>
          </div>

          <h4>Exportar Reportes de Auditoría</h4>
          <nav aria-label="Descargas de reportes" style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              {aiResult.reports?.tecnico && (
                <Button style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'var(--bg-primary)' }} onClick={() => alert("Reporte Técnico: " + aiResult.reports?.tecnico)}>
                  <Download size={14} aria-hidden="true" /> Técnico
                </Button>
              )}
              {aiResult.reports?.profesional && (
                <Button style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'var(--bg-primary)' }} onClick={() => alert("Reporte Profesional: " + aiResult.reports?.profesional)}>
                  <Download size={14} aria-hidden="true" /> Profesional
                </Button>
              )}
              {aiResult.reports?.natural && (
                <Button style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'var(--bg-primary)' }} onClick={() => alert("Reporte Lenguaje Natural: " + aiResult.reports?.natural)}>
                  <Download size={14} aria-hidden="true" /> Lenguaje Natural
                </Button>
              )}
          </nav>
        </section>
      )}
    </div>
  );
};
