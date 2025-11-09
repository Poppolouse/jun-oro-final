import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';

export function Header(): JSX.Element {
  const { user, logout } = useAuth();
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
          {/* Placeholder for avatar */}
          <span style={{ marginRight: '8px' }}>👤</span>
          {user || 'Kullanıcı'}
        </button>
        <ul className={`dropdown-menu ${showUserMenu ? 'open' : ''}`}>
          <li><Link to="/settings" className="dropdown-item" onClick={() => setShowUserMenu(false)}>Ayarlar</Link></li>
          <li><hr /></li>
          <li><a href="/login" className="dropdown-item" onClick={logout}>Çıkış Yap</a></li>
        </ul>
      </div>
    </header>
  );
}
