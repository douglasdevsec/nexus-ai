import React from 'react';
import { Server, Brain } from 'lucide-react';

interface HeaderProps {
  isBackendActive?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isBackendActive = false }) => {
  return (
    <header className="header">
      <div className="header-title">
        <h2>Panel de Control</h2>
      </div>
      <div className="header-status">
        <div className="status-item">
          <Server size={18} />
          <span className={`status-indicator ${isBackendActive ? 'active' : ''}`}></span>
          <span>Backend {isBackendActive ? 'Activo' : 'Offline'}</span>
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
