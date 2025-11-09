import React from 'react';
import { AppCard } from './components/AppCard';
import { API_URL } from './config';

type AppItem = {
  title: string;
  href: string;
  description: string;
};

/**
 * Portal ana sayfası: Uygulama kartlarını ve API sağlık bilgisini gösterir.
 * @returns {JSX.Element} Portal ana görünümü
 */
export default function App(): JSX.Element {
  const [apiStatus, setApiStatus] = React.useState<'unknown' | 'ok' | 'fail'>('unknown');
  const [apps, setApps] = React.useState<AppItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // API health check
        const healthRes = await fetch(`${API_URL}/health`, { method: 'GET' });
        setApiStatus(healthRes.ok ? 'ok' : 'fail');

        // Fetch apps
        const appsRes = await fetch(`${API_URL}/apps`);
        if (!appsRes.ok) {
          throw new Error('Uygulamalar yüklenemedi.');
        }
        const appsData = await appsRes.json();
        setApps(appsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu.');
        setApiStatus('fail');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div data-ers="1.3" className="page">
      <header className="header">
        <h1 className="title">Jun‑Oro Portal</h1>
        <p className="subtitle">Uygulamalar ve servisler için giriş noktası</p>
        <div className={`api-status ${apiStatus}`}>
          API Durumu: {apiStatus === 'unknown' ? 'kontrol ediliyor…' : apiStatus}
        </div>
      </header>

      <div data-ers="1.3.1" className="app-grid">
        {loading && <p>Uygulamalar yükleniyor...</p>}
        {error && <p>Hata: {error}</p>}
        {!loading && !error && apps.map((app, i) => (
          <AppCard key={app.href} dataErs={`1.3.1.${i + 1}`} {...app} />
        ))}
      </div>
    </div>
  );
}