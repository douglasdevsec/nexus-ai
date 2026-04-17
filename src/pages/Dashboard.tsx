import { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Table } from '../components/Table';
import { Badge } from '../components/Badge';
import { BackendService } from '../services/backend';

export const Dashboard = () => {
  const [recentFindings, setRecentFindings] = useState<any[]>([]);

  useEffect(() => {
    const fetchScans = async () => {
      const scans = await BackendService.getRecentScans();
      const mapped = scans.map((s: any) => ({
        id: s.id,
        target: s.target,
        vulns: s.type, 
        severity: <Badge severity={s.status === 'completed' ? 'info' : 'high'} />,
        date: s.timestamp
      }));
      setRecentFindings(mapped);
    };
    fetchScans();
  }, []);

  const summaryCards = [
    { title: 'Total Escaneos', value: recentFindings.length.toString() },
    { title: 'Vulnerabilidades Críticas', value: '0', color: 'var(--danger)' },
    { title: 'Último Escaneo', value: recentFindings.length > 0 ? recentFindings[0].date : 'Nunca' },
  ];

  const columns = [
    { key: 'target', header: 'Objetivo' },
    { key: 'vulns', header: 'Tipo de Escaneo' },
    { key: 'severity', header: 'Estado' },
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
