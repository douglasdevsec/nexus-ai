export interface IScanFinding {
  title: string;
  description: string;
  severity: string;
  cvss_score: number;
  remediation?: string;
}

export interface IScanAnalysis {
  findings: IScanFinding[];
}

export interface IAiReports {
  tecnico?: string;
  profesional?: string;
  natural?: string;
}

export interface IAiScanResult {
  status: string;
  intent: string;
  raw_findings_count?: number;
  analysis: IScanAnalysis;
  reports?: IAiReports;
}

export interface IScanSummary {
  id: number;
  target: string;
  type: string;
  status: string;
  timestamp: string;
}
