import { useState } from 'react';

const weeks = ['28 Ott', '4 Nov', '11 Nov', '18 Nov', '25 Nov', '2 Dic', '9 Dic'];

const data = [
  { label: '28 Ott', pos: 42, neg: -18 },
  { label: '4 Nov', pos: 58, neg: -22 },
  { label: '11 Nov', pos: 35, neg: -14 },
  { label: '18 Nov', pos: 72, neg: -28 },
  { label: '25 Nov', pos: 65, neg: -20 },
  { label: '2 Dic', pos: 80, neg: -12 },
  { label: '9 Dic', pos: 55, neg: -32 },
];

const maxVal = 85;

export default function CashFlowChart({ view = 'Settimanale' }) {
  const [active, setActive] = useState(null);
  const [tab, setTab] = useState('Settimanale');

  return (
    <div style={{ padding: '6px 0 0' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--text-h)' }}>
            Flusso attività
          </span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {['Settimanale', 'Mensile'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '5px 12px', borderRadius: 8, fontSize: 12, fontWeight: 500,
              background: tab === t ? 'var(--accent)' : 'var(--bg-input)',
              color: tab === t ? '#fff' : 'var(--text)',
              border: tab === t ? 'none' : '1px solid var(--border)',
              cursor: 'pointer', transition: 'all .15s',
            }}>{t}</button>
          ))}
        </div>
      </div>

      {/* Y-axis labels + chart */}
      <div style={{ display: 'flex', gap: 0 }}>
        {/* Y labels */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: 20, marginRight: 10, fontSize: 10.5, color: 'var(--text-muted)', textAlign: 'right', width: 32 }}>
          <span>80</span>
          <span>40</span>
          <span style={{ lineHeight: 1 }}>0</span>
          <span>-40</span>
        </div>

        {/* Bars area */}
        <div style={{ flex: 1, position: 'relative' }}>
          {/* Horizontal grid lines */}
          {[0, 1, 2, 3].map(i => (
            <div key={i} style={{
              position: 'absolute', left: 0, right: 0,
              top: `${(i / 3) * 100}%`,
              borderTop: '1px dashed var(--border)',
              zIndex: 0,
            }} />
          ))}

          {/* Bars */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: 140, position: 'relative', zIndex: 1 }}>
            {data.map((d, i) => {
              const posH = (d.pos / maxVal) * 62;
              const negH = (Math.abs(d.neg) / maxVal) * 62;
              const isActive = active === i;
              return (
                <div key={i}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, cursor: 'pointer', position: 'relative' }}
                >
                  {/* Tooltip */}
                  {isActive && (
                    <div style={{
                      position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)',
                      background: 'var(--text-h)', color: 'var(--bg-card)', borderRadius: 7, padding: '5px 10px',
                      fontSize: 11.5, fontWeight: 600, whiteSpace: 'nowrap', marginBottom: 6, zIndex: 10,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    }}>
                      +{d.pos} / {d.neg}
                    </div>
                  )}
                  <div className="chart-bar-pos" style={{ width: 16, height: posH, opacity: isActive ? 1 : .8 }} />
                  <div style={{ height: 1, width: 16, background: 'var(--border)' }} />
                  <div className="chart-bar-neg" style={{ width: 16, height: negH, opacity: isActive ? 1 : .55 }} />
                </div>
              );
            })}
          </div>

          {/* X labels */}
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 8, fontSize: 10.5, color: 'var(--text-muted)' }}>
            {data.map((d, i) => <span key={i}>{d.label}</span>)}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 20, marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
        <div style={{ flex: 1, padding: '12px 14px', borderRadius: 10, background: 'var(--bg-input)' }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Iscrizioni</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--text-h)' }}>+245</div>
          <span className="trend-up" style={{ marginTop: 4, display: 'inline-flex' }}>45.0% ↗</span>
        </div>
        <div style={{ flex: 1, padding: '12px 14px', borderRadius: 10, background: 'var(--bg-input)' }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Uscite</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--text-h)' }}>-87</div>
          <span className="trend-down" style={{ marginTop: 4, display: 'inline-flex' }}>12.6% ↙</span>
        </div>
      </div>
    </div>
  );
}
