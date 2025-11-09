import React from 'react';
import { AppCard } from '../components/AppCard';
import { API_URL } from '../config';

type AppItem = {
  title: string;
  href: string;
  description: string;
};

export function HomePage(): JSX.Element {
  const [apps, setApps] = React.useState<AppItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchApps = async () => {
      try {
        const appsRes = await fetch(`${API_URL}/apps`);
        if (!appsRes.ok) {
          throw new Error('Uygulamalar yüklenemedi.');
        }
        const appsData = await appsRes.json();
        setApps(appsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  return (
    <>
      <input type="text" className="search-bar" placeholder="Uygulamalarda ara... (Çok Yakında)" />
      <div data-ers="1.3.1" className="app-grid">
        {loading && <p>Uygulamalar yükleniyor...</p>}
        {error && <p>Hata: {error}</p>}
        {!loading && !error && apps.map((app, i) => (
          <AppCard key={app.href} dataErs={`1.3.1.${i + 1}`} {...app} />
        ))}
      </div>
    </>
  );
}
