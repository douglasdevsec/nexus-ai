import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Play, Square, Pause, RotateCcw } from 'lucide-react';

export const Scanners = () => {
  const [activeTab, setActiveTab] = useState('red');
  const [target, setTarget] = useState('');

  const tabs = [
    { id: 'red', label: 'Red (Nmap)' },
    { id: 'malware', label: 'Malware (Hash)' },
    { id: 'web', label: 'Vulnerabilidades Web' },
    { id: 'osint', label: 'OSINT' },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Módulos de Escaneo</h2>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
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
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button variant="primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Play size={16} /> Iniciar
          </Button>
          <Button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Pause size={16} /> Pausar
          </Button>
          <Button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RotateCcw size={16} /> Reanudar
          </Button>
          <Button variant="danger" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Square size={16} /> Detener
          </Button>
        </div>
      </Card>
    </div>
  );
};
