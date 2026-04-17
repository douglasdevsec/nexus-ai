import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';

export const Settings = () => {
  const [engine, setEngine] = useState('ollama');
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [selectedModel, setSelectedModel] = useState('llama3');
  const [testStatus, setTestStatus] = useState<null | 'success' | 'error'>(null);

  const handleTestConnection = () => {
    // Simulating connection test
    setTestStatus('success');
    setTimeout(() => setTestStatus(null), 3000);
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Configuración de Agentes IA</h2>
      <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '600px' }}>
        <Card title="Motor Principal">
          <div style={{ marginBottom: '1rem' }}>
            <label className="input-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Seleccione el Motor de IA
            </label>
            <select 
              value={engine} 
              onChange={(e) => setEngine(e.target.value)}
              className="input-field"
              style={{ width: '100%' }}
            >
              <option value="ollama">Local (Ollama)</option>
              <option value="openai">OpenAI (API)</option>
              <option value="anthropic">Anthropic (API)</option>
            </select>
          </div>

          {engine === 'ollama' && (
            <div style={{ marginBottom: '1rem' }}>
              <label className="input-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
                Modelo Local Disponible
              </label>
              <select 
                value={selectedModel} 
                onChange={(e) => setSelectedModel(e.target.value)}
                className="input-field"
                style={{ width: '100%' }}
              >
                <option value="llama3">Llama 3 (8B)</option>
                <option value="qwen">Qwen 2 (7B)</option>
                <option value="root">Root / Fallback</option>
              </select>
              <small style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', display: 'block' }}>
                *Asegúrese de tener Ollama corriendo en localhost:11434
              </small>
            </div>
          )}

          {engine !== 'ollama' && (
            <div style={{ marginBottom: '1rem', position: 'relative' }}>
              <Input
                label="API Key"
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
              />
              <button 
                onClick={() => setShowApiKey(!showApiKey)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '2.1rem',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                {showApiKey ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
            <Button variant="primary" onClick={handleTestConnection}>Test de Conexión</Button>
            {testStatus === 'success' && (
              <span style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={18} /> Conexión Exitosa
              </span>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
