import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Shield, FileText, Settings } from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>AegisAgent</h2>
        <span className="badge badge-info" style={{ marginLeft: '10px' }}>v0.1</span>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/scanners" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Shield size={20} />
          <span>Escáneres</span>
        </NavLink>
        <NavLink to="/reports" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <FileText size={20} />
          <span>Reportes</span>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Settings size={20} />
          <span>Configuración</span>
        </NavLink>
      </nav>
    </aside>
  );
};
