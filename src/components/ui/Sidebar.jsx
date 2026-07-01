import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, BookOpen, BarChart3,
  Settings, HelpCircle, Home, CreditCard, ArrowUpDown
} from 'lucide-react';

const nav = [
  { section: 'GENERALE', items: [
    { to: '/dashboard', label: 'Dashboard',   icon: LayoutDashboard },
    { to: '/alunni',   label: 'Alunni',       icon: Users },
    { to: '/materie',  label: 'Materie',      icon: BookOpen },
    { to: '/esami',    label: 'Esami',        icon: CreditCard },
    { to: '/report',   label: 'Report',       icon: BarChart3 },
  ]},
  { section: 'SUPPORTO', items: [
    { to: '/',         label: 'Home',         icon: Home },
    { to: '/settings', label: 'Impostazioni', icon: Settings },
    { to: '/help',     label: 'Guida',        icon: HelpCircle },
  ]},
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="er-sidebar">
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 6px 24px' }}>
        <div style={{
          width: 32, height: 32, borderRadius: 9,
          background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14,
          flexShrink: 0,
        }}>ER</div>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: '#fff', letterSpacing: '-0.2px' }}>
          Exam Register
        </span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1 }}>
        {nav.map(({ section, items }) => (
          <div key={section}>
            <div className="sidebar-label">{section}</div>
            {items.map(({ to, label, icon: Icon }) => {
              const active = pathname === to || (to !== '/' && pathname.startsWith(to));
              return (
                <Link key={to} to={to} className={`nav-link${active ? ' active' : ''}`}>
                  <Icon size={15} strokeWidth={active ? 2.2 : 1.8} />
                  {label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16 }}>
        {/* Pro mode toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-sidebar)', fontSize: 13 }}>
            <ArrowUpDown size={14} />
            <span>Pro Mode</span>
          </div>
          <div style={{
            width: 34, height: 18, borderRadius: 99, background: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 3px',
          }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#fff' }} />
          </div>
        </div>

        {/* User */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 8px 4px' }}>
          <div className="er-avatar" style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}>AM</div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ color: '#fff', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Admin</div>
            <div style={{ color: 'var(--text-sidebar)', fontSize: 11, opacity: .7 }}>admin@exam.it</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
