export default function StatsCard({ icon: Icon, label, value, hint, trend }) {
  return (
    <div className="er-stat">
      <div className="er-stat-header">
        <span className="er-stat-label">{label}</span>
        {Icon && (
          <div className="er-stat-icon">
            <Icon size={16} strokeWidth={1.6} />
          </div>
        )}
      </div>
      <div className="er-stat-value">{value}</div>
      {hint && <div className="er-stat-hint">{hint}</div>}
      {trend && (
        <div className={`er-stat-trend er-stat-trend--${trend.dir}`}>
          {trend.dir === 'up' ? '↑' : '↓'} {trend.label}
        </div>
      )}
    </div>
  );
}
