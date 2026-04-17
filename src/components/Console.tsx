import React, { useRef, useEffect } from 'react';
import { Terminal, Download, Trash2 } from 'lucide-react';

export type LogType = 'command' | 'result' | 'error' | 'thought';

export interface LogEntry {
  id: string;
  timestamp: string;
  type: LogType;
  message: string;
}

interface ConsoleProps {
  logs: LogEntry[];
  onClear: () => void;
}

export const Console: React.FC<ConsoleProps> = ({ logs, onClear }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getColor = (type: LogType) => {
    switch (type) {
      case 'command': return 'var(--info)';
      case 'result': return 'var(--success)';
      case 'error': return 'var(--danger)';
      case 'thought': return 'var(--warning)';
      default: return 'var(--text-primary)';
    }
  };

  const getPrefix = (type: LogType) => {
    switch (type) {
      case 'command': return '$';
      case 'result': return '>';
      case 'error': return '[ERROR]';
      case 'thought': return '[AGENTE]';
      default: return '';
    }
  };

  const handleExport = () => {
    const text = logs.map(l => `[${l.timestamp}] ${getPrefix(l.type)} ${l.message}`).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'aegis_console_export.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#000', borderTop: '1px solid var(--border-color)', fontFamily: 'var(--font-mono)' }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 1rem', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
          <Terminal size={16} /> Consola en tiempo real
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={handleExport} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} title="Exportar">
            <Download size={16} />
          </button>
          <button onClick={onClear} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} title="Limpiar">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Logs Area */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '1rem', fontSize: '0.85rem', lineHeight: '1.5' }}>
        {logs.length === 0 && <div style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>Esperando operaciones...</div>}
        {logs.map((log) => (
          <div key={log.id} style={{ marginBottom: '0.25rem', wordBreak: 'break-word' }}>
            <span style={{ color: 'var(--text-secondary)', marginRight: '0.5rem' }}>[{log.timestamp}]</span>
            <span style={{ color: getColor(log.type), marginRight: '0.5rem', fontWeight: 600 }}>{getPrefix(log.type)}</span>
            <span style={{ color: log.type === 'error' ? 'var(--danger)' : 'var(--text-primary)' }}>{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
