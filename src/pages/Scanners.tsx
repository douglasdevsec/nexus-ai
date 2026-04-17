import { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Play, Square, Pause, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import { BackendService } from '../services/backend';
import { AiAssistant } from '../components/AiAssistant';

export const Scanners = () => {
  const [activeTab, setActiveTab] = useState('red');
  const [target, setTarget] = useState('');
  
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [scanError, setScanError] = useState<string | null>(null);

  const tabs = [
    { id: 'ai', label: 'Asistente IA ✨' },
    { id: 'red', label: 'Red (Nmap)' },
    { id: 'malware', label: 'Malware (Hash)' },
    { id: 'web', label: 'Vulnerabilidades Web' },
    { id: 'osint', label: 'OSINT' },
  ];


  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Módulos de Escaneo</h2>

      {/* Tabs */}
      <div 
        role="tablist" 
        aria-label="Módulos de Escaneo"
        style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => {
              setActiveTab(tab.id);
              setTarget('');
              setScanResult(null);
              setScanError(null);
            }}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: activeTab === tab.id ? 'var(--bg-tertiary)' : 'transparent',
              border: 'none',
              color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              borderRadius: '6px',
              fontWeight: 500,
              transition: 'all 0.2s'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
        <Card title={`Configuración: ${tabs.find(t => t.id === activeTab)?.label}`}>
          <div style={{ maxWidth: '500px', marginBottom: '1.5rem' }}>
          {activeTab === 'red' && (
            <Input 
              label="IP o Dominio Objetivo" 
              placeholder="ej. 192.168.1.5 o corp.local"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
          )}
          {activeTab === 'malware' && (
            <Input 
              label="Ruta del Directorio o Archivo" 
              placeholder="ej. C:\Users\Downloads"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
          )}
          {activeTab === 'web' && (
            <Input 
              label="URL Base" 
              placeholder="ej. https://example.com"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
          )}
          {activeTab === 'osint' && (
            <Input 
              label="Dominio Corporativo" 
              placeholder="ej. empresa.com"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
          )}
          {activeTab === 'ai' && <AiAssistant />}
        </div>

        {activeTab !== 'ai' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Button 
                variant="primary" 
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} 
                disabled={isScanning}
                onClick={async () => {
                  if (!target.trim()) {
                    setScanError("El objetivo (Target) no puede estar vacío.");
                    return;
                  }
                  setIsScanning(true);
                  setScanError(null);
                  setScanResult(null);
                  
                  try {
                    let res;
                    if (activeTab === 'red') res = await BackendService.scanNetwork(target);
                    else if (activeTab === 'malware') res = await BackendService.scanMalware(target);
                    else if (activeTab === 'web') res = await BackendService.scanWeb(target);
                    else if (activeTab === 'osint') res = await BackendService.scanOsint(target);
                    
                    if (res && res.error) {
                      setScanError(res.error);
                    } else {
                      setScanResult(res);
                    }
                  } catch (e) {
                      setScanError(e instanceof Error ? e.message : "Error fatal de conexión al backend.");
                  } finally {
                      setIsScanning(false);
                  }
                }}
              >
                <Play size={16} /> {isScanning ? 'Escaneando...' : 'Iniciar'}
              </Button>
              <Button disabled={isScanning} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={async () => await fetch('http://localhost:8000/scan/control', { method: 'POST', body: JSON.stringify({ command: 'pause' }), headers: { 'Content-Type': 'application/json' } })}>
                <Pause size={16} /> Pausar
              </Button>
              <Button disabled={isScanning} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={async () => await fetch('http://localhost:8000/scan/control', { method: 'POST', body: JSON.stringify({ command: 'resume' }), headers: { 'Content-Type': 'application/json' } })}>
                <RotateCcw size={16} /> Reanudar
              </Button>
              <Button variant="danger" disabled={!isScanning} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={async () => await fetch('http://localhost:8000/scan/control', { method: 'POST', body: JSON.stringify({ command: 'stop' }), headers: { 'Content-Type': 'application/json' } })}>
                <Square size={16} /> Detener
              </Button>
            </div>

            {/* Panel de Resultados / Error */}
            {scanError && (
              <div style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                <XCircle size={18} /> {scanError}
              </div>
            )}

            {scanResult && (
              <div style={{ marginTop: '1.5rem', padding: '1.5rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <CheckCircle size={20} color="var(--primary-color)" /> Resultados del Módulo
                </h3>
                <div style={{ 
                  background: 'var(--bg-primary)', 
                  padding: '1rem', 
                  borderRadius: '4px', 
                  border: '1px solid var(--border-color)',
                  maxHeight: '400px',
                  overflowY: 'auto'
                }}>
                  <pre style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem', whiteSpace: 'pre-wrap' }}>
                    {JSON.stringify(scanResult, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}
      </Card>
      </div>
    </div>
  );
};
