import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, LayoutDashboard, Users, BookOpen } from 'lucide-react';

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/alunni', label: 'Alunni', icon: Users },
  { to: '/materie', label: 'Materie', icon: BookOpen },
];

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="er-header">
      <div className="er-header-inner">
        <div className="er-brand">
          <div className="er-brand-mark">ER</div>
          <div className="er-brand-text">
            <span className="er-brand-name">Exam Register</span>
            <span className="er-brand-sub">Gestione studenti</span>
          </div>
        </div>

        <nav className="er-nav">
          {nav.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`er-nav-link${pathname === to ? ' er-nav-link--active' : ''}`}
            >
              <Icon size={15} strokeWidth={1.8} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="er-header-actions">
          <div className="er-search">
            <Search size={14} strokeWidth={1.8} className="er-search-icon" />
            <input className="er-search-input" placeholder="Cerca…" />
          </div>
          <button className="er-icon-btn" aria-label="Notifiche">
            <Bell size={16} strokeWidth={1.8} />
            <span className="er-notif-dot" />
          </button>
        </div>
      </div>
    </header>
  );
}
