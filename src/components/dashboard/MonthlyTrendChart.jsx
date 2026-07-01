export default function MonthlyTrendChart({ data }) {
  if (!data || data.length === 0) {
    return <div className="text-sm text-slate-400">Nessun dato disponibile per il trend mensile.</div>;
  }

  const width = 720;
  const height = 220;
  const paddingX = 24;
  const paddingY = 28;
  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;
  const barGap = 14;
  const barWidth = (chartWidth - barGap * (data.length - 1)) / data.length;
  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" role="img" aria-label="Andamento mensile dei nuovi profili">
      <defs>
        <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
      </defs>

      {[0.25, 0.5, 0.75, 1].map((t) => (
        <line
          key={t}
          x1={paddingX}
          x2={width - paddingX}
          y1={paddingY + chartHeight * (1 - t)}
          y2={paddingY + chartHeight * (1 - t)}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
      ))}

      {data.map((d, i) => {
        const barHeight = max > 0 ? (d.count / max) * chartHeight : 0;
        const x = paddingX + i * (barWidth + barGap);
        const y = paddingY + (chartHeight - barHeight);

        return (
          <g key={`${d.month}-${i}`}>
            <rect x={x} y={y} width={barWidth} height={Math.max(barHeight, 2)} rx="6" fill="url(#trendGradient)" />
            <text x={x + barWidth / 2} y={y - 8} textAnchor="middle" fontSize="11" fontWeight="600" fill="#e2e8f0">
              {d.count}
            </text>
            <text x={x + barWidth / 2} y={paddingY + chartHeight + 18} textAnchor="middle" fontSize="11" fill="#94a3b8">
              {d.month}
            </text>
          </g>
        );
      })}
    </svg>
  );
}