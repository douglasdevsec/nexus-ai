import React from 'react';
import { Card } from '../components/Card';
import { Table } from '../components/Table';
import { Badge } from '../components/Badge';

export const Dashboard = () => {
  const summaryCards = [
    { title: 'Total Escaneos', value: '12' },
    { title: 'Vulnerabilidades Críticas', value: '3', color: 'var(--danger)' },
    { title: 'Último Escaneo', value: 'Hace 2 horas' },
  ];

  const recentFindings = [
    { id: 1, target: '192.168.1.5', vulns: 2, severity: <Badge severity="high" />, date: '2026-04-16' },
    { id: 2, target: 'internal.corp', vulns: 0, severity: <Badge severity="info" />, date: '2026-04-15' },
    { id: 3, target: '10.0.0.12', vulns: 5, severity: <Badge severity="critical" />, date: '2026-04-14' },
  ];

  const columns = [
    { key: 'target', header: 'Objetivo' },
    { key: 'vulns', header: 'Vulnerabilidades' },
    { key: 'severity', header: 'Severidad Max' },
    { key: 'date', header: 'Fecha' },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Dashboard Overview</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {summaryCards.map((card, idx) => (
          <Card key={idx}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{card.title}</div>
            <div style={{ fontSize: '2rem', fontWeight: 600, color: card.color || 'var(--text-primary)' }}>{card.value}</div>
          </Card>
        ))}
      </div>

      <Card title="Actividad Reciente">
        <Table columns={columns} data={recentFindings} />
      </Card>
    </div>
  );
};
