import { Search, Bell, Settings2, Calendar } from 'lucide-react';

export default function Header({ title = 'Dashboard', subtitle }) {
  const today = new Date().toLocaleDateString('it-IT', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <header className="er-topbar">
      {/* Left: page title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--text-h)', letterSpacing: '-0.2px' }}>
            {title}
          </h2>
          {subtitle && <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 1 }}>{subtitle}</p>}
        </div>
      </div>

      {/* Right: actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Date range pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 7,
          background: 'var(--bg-input)', border: '1px solid var(--border)',
          borderRadius: 9, padding: '6px 12px', fontSize: 12.5, color: 'var(--text)', cursor: 'pointer',
        }}>
          <Calendar size={13} />
          <span>{today}</span>
        </div>

        {/* Search */}
        <div className="er-search" style={{ minWidth: 190 }}>
          <Search size={13} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          <input placeholder="Cerca..." />
        </div>

        {/* Notifications */}
        <button className="er-icon-btn" style={{ position: 'relative' }}>
          <Bell size={15} />
          <span style={{
            position: 'absolute', top: 7, right: 7,
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--accent)', border: '1.5px solid var(--bg-card)',
          }} />
        </button>

        {/* Settings */}
        <button className="er-icon-btn"><Settings2 size={15} /></button>

        {/* Avatar */}
        <div className="er-avatar">AM</div>
      </div>
    </header>
  );
}
