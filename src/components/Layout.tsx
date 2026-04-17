import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Console, LogEntry } from './Console';
import { ChatBar } from './ChatBar';
import { BackendService } from '../services/backend';

export const Layout: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: '1', timestamp: new Date().toLocaleTimeString(), type: 'thought', message: 'Sistema AegisAgent inicializado.' }
  ]);
  const [messages, setMessages] = useState<any[]>([
    { id: '1', sender: 'agent', text: '¡Hola! Soy tu IA de seguridad. ¿Qué escaneo deseas ejecutar hoy?' }
  ]);
  const [isBackendActive, setIsBackendActive] = useState(false);

  useEffect(() => {
    const checkBackend = async () => {
      const status = await BackendService.ping();
      setIsBackendActive(!!status);
      if (status) {
        setLogs(prev => [...prev, { id: Date.now().toString(), timestamp: new Date().toLocaleTimeString(), type: 'result', message: 'Backend conectado exitosamente.' }]);
      } else {
        setLogs(prev => [...prev, { id: Date.now().toString(), timestamp: new Date().toLocaleTimeString(), type: 'error', message: 'No se pudo conectar al Backend local.' }]);
      }
    };
    checkBackend();
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content" style={{ display: 'flex', flexDirection: 'row', flex: 1, overflow: 'hidden' }}>
        
        {/* Centro: Header + Tablas (Outlet) + Console (Bottom) */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <Header isBackendActive={isBackendActive} />
          
          <div style={{ flex: 2, overflowY: 'auto', padding: '2rem' }}>
            <Outlet />
          </div>

          <div style={{ flex: 1, minHeight: '200px', borderTop: '2px solid var(--border-color)' }}>
            <Console logs={logs} onClear={() => setLogs([])} />
          </div>
        </div>

        {/* Derecha: ChatBar */}
        <div style={{ width: '320px', flexShrink: 0 }}>
          <ChatBar messages={messages} onSendMessage={(text) => {
            setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text }]);
            // Mock IA response
            setTimeout(() => {
              setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'agent', text: 'Procesando tu solicitud...' }]);
              setLogs(prev => [...prev, { id: Date.now().toString(), timestamp: new Date().toLocaleTimeString(), type: 'command', message: 'Analizando intención...' }]);
            }, 600);
          }} />
        </div>

      </div>
    </div>
  );
};

