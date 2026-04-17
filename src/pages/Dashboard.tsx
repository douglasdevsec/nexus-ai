import { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Table } from '../components/Table';
import { Badge } from '../components/Badge';
import { BackendService } from '../services/backend';
import { IScanSummary } from '../types/backend';

interface IDashboardFinding {
  id: number;
  target: string;
  vulns: string;
  severity: JSX.Element;
  date: string;
}

export const Dashboard = () => {
  const [recentFindings, setRecentFindings] = useState<IDashboardFinding[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const fetchScans = async () => {
      setIsLoading(true);
      try {
        const scans: IScanSummary[] = await BackendService.getRecentScans();
        if (isMounted) {
          const mapped: IDashboardFinding[] = scans.map((s) => ({
            id: s.id,
            target: s.target,
            vulns: s.type, 
            severity: <Badge severity={s.status === 'completed' ? 'info' : 'high'} />,
            date: s.timestamp
          }));
          setRecentFindings(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard summary", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    
    fetchScans();
    
    return () => {
      isMounted = false;
    };
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
        {isLoading ? (
          <div style={{ color: 'var(--text-secondary)' }}>Cargando escaneos recientes...</div>
        ) : (
          <Table columns={columns} data={recentFindings} />
        )}
      </Card>
    </div>
  );
};
