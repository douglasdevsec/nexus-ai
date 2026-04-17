import React from 'react';
import { Server, Brain } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-title">
        <h2>Panel de Control</h2>
      </div>
      <div className="header-status">
        <div className="status-item">
          <Server size={18} />
          <span className="status-indicator active"></span>
          <span>Backend Activo</span>
        </div>
        <div className="status-item">
          <Brain size={18} />
          <span className="status-indicator active"></span>
          <span>Ollama Listo</span>
        </div>
      </div>
    </header>
  );
};
