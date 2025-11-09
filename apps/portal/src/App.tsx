import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppCard } from './components/AppCard';
import { Footer } from './components/Footer';
import { SettingsPage } from './pages/SettingsPage';
import { API_URL } from './config';

type AppItem = {
  title: string;
  href: string;
  description: string;
};

/**
 * The main home page component that displays the app grid.
 */
function HomePage() {
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

/**
 * The main App component, handles layout and routing.
 */
export default function App(): JSX.Element {
  const [apiStatus, setApiStatus] = React.useState<'unknown' | 'ok' | 'fail'>('unknown');
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const userMenuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const checkApiHealth = async () => {
      try {
        const healthRes = await fetch(`${API_URL}/health`, { method: 'GET' });
        setApiStatus(healthRes.ok ? 'ok' : 'fail');
      } catch (err) {
        setApiStatus('fail');
      }
    };
    checkApiHealth();
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuRef]);

  return (
    <div data-ers="1.3" className="page">
      <header className="header">
        <div className="header-left">
          <h1 className="title">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Jun‑Oro Portal
            </Link>
          </h1>
          <p className="subtitle">Uygulamalar ve servisler için giriş noktası</p>
          <div className={`api-status ${apiStatus}`}>
            API Durumu: {apiStatus === 'unknown' ? 'kontrol ediliyor…' : apiStatus}
          </div>
        </div>
        <div className="user-menu" ref={userMenuRef}>
          <button className="user-button" onClick={() => setShowUserMenu(!showUserMenu)}>
            Kullanıcı
          </button>
          <ul className={`dropdown-menu ${showUserMenu ? 'open' : ''}`}>
            <li><a href="#" className="dropdown-item">Profil</a></li>
            <li><Link to="/settings" className="dropdown-item">Ayarlar</Link></li>
            <li><hr /></li>
            <li><a href="#" className="dropdown-item">Çıkış Yap</a></li>
          </ul>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}