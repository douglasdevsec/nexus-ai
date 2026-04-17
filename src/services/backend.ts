const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export class BackendService {
  static async ping(signal?: AbortSignal) {
    try {
      const response = await fetch(`${API_URL}/health`, { signal });
      return await response.json();
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return null;
      console.error('Error connecting to backend:', error);
      return null;
    }
  }

  static async scanNetwork(target: string, signal?: AbortSignal) {
    const response = await fetch(`${API_URL}/scan/network`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target }),
      signal
    });
    return await response.json();
  }

  static async scanMalware(path: string, signal?: AbortSignal) {
    const response = await fetch(`${API_URL}/scan/malware`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path }),
      signal
    });
    return await response.json();
  }

  static async getRecentScans(signal?: AbortSignal) {
    try {
      const response = await fetch(`${API_URL}/scans`, { signal });
      return await response.json();
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') return [];
      console.error(e);
      return [];
    }
  }
}
