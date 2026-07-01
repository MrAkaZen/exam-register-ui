import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatsCard({ icon: Icon, label, value, hint, trend, trendUp = true, delay = 0, accentColor }) {
  return (
    <div className="er-card anim-fade-up" style={{ padding: '20px 22px', animationDelay: `${delay}s` }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text-muted)', marginBottom: 10 }}>
            {label}
          </div>
          <div className="stat-value" style={{ animationDelay: `${delay + .1}s` }}>{value}</div>

          {(trend || hint) && (
            <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              {trend && (
                <span className={trendUp ? 'trend-up' : 'trend-down'} style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                  {trendUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {trend}
                </span>
              )}
              {hint && <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{hint}</span>}
            </div>
          )}
        </div>

        {Icon && (
          <div style={{
            width: 42, height: 42, borderRadius: 12, flexShrink: 0,
            background: accentColor ? accentColor : 'var(--accent-glow)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: accentColor ? '#fff' : 'var(--accent)',
          }}>
            <Icon size={18} strokeWidth={1.8} />
          </div>
        )}
      </div>
    </div>
  );
}
