const API_URL = 'http://localhost:8000';

export class BackendService {
  static async ping() {
    try {
      const response = await fetch(`${API_URL}/health`);
      return await response.json();
    } catch (error) {
      console.error('Error connecting to backend:', error);
      return null;
    }
  }

  static async scanNetwork(target: string) {
    const response = await fetch(`${API_URL}/scan/network`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target })
    });
    return await response.json();
  }

  static async scanMalware(path: string) {
    const response = await fetch(`${API_URL}/scan/malware`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path })
    });
    return await response.json();
  }

  static async getRecentScans() {
    try {
      const response = await fetch(`${API_URL}/scans`);
      return await response.json();
    } catch (e) {
      console.error(e);
      return [];
    }
  }
}
