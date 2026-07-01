import { Activity, Filter, Info, MoreHorizontal, PlusCircle, Radio, Search, TrendingDown, TrendingUp, UserPlus, Users, UserX } from 'lucide-react';
import Header from '../components/ui/Header';
import Sidebar from '../components/ui/Sidebar';
import MonthlyTrendChart from '../components/dashboard/MonthlyTrendChart';
import { useAlunni } from '../hooks/useAlunni';
import { useDashboardStats } from '../hooks/useAlunniDashboardStas';

const gradients = [
  'linear-gradient(135deg, #2563eb, #0ea5e9)',
  'linear-gradient(135deg, #7c3aed, #3b82f6)',
  'linear-gradient(135deg, #0891b2, #2563eb)',
  'linear-gradient(135deg, #6d28d9, #0ea5e9)',
  'linear-gradient(135deg, #1d4ed8, #7c3aed)',
];

function OnlineDot() {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
    </span>
  );
}

export default function Dashboard() {
  const { alunni, loading: loadingAlunni } = useAlunni();
  const { stats, loading: loadingStats } = useDashboardStats();

  const recent = alunni.slice(0, 6);

  const isGrowthPositive = stats.growthPercentage >= 0;
  const GrowthIcon = isGrowthPositive ? TrendingUp : TrendingDown;
  const growthValue = loadingStats ? '…' : stats.currentMonthProfiles;
  const growthHint = loadingStats
    ? 'Caricamento...'
    : (
      <span className="inline-flex items-center gap-1">
        <GrowthIcon className={`h-3.5 w-3.5 ${isGrowthPositive ? 'text-emerald-400' : 'text-rose-400'}`} />
        <span className={isGrowthPositive ? 'text-emerald-400' : 'text-rose-400'}>
          {isGrowthPositive ? '+' : ''}{stats.growthPercentage}%
        </span>
        <span className="text-slate-400">vs mese precedente ({stats.previousMonthProfiles})</span>
      </span>
    );

  const summaryCards = [
    { icon: Users, label: 'Nuovi profili oggi', value: loadingStats ? '…' : stats.newProfilesToday, hint: 'Registrazioni di oggi' },
    { icon: UserPlus, label: 'Nuovi profili (7 giorni)', value: loadingStats ? '…' : stats.newProfilesLast7Days, hint: 'Ultima settimana' },
    { icon: GrowthIcon, label: 'Profili mese corrente', value: growthValue, hint: growthHint },
  ];

  return (
    <div className="er-shell">
      <Sidebar />
      <div className="er-main">
        <Header title="Dashboard" subtitle="Panoramica studenti e attività" />

        <div className="er-content">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22, gap: 14, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                <Users size={18} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-h)' }}>
                  {loadingStats ? '…' : stats.currentMonthProfiles} profili attivi
                </h3>
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Panoramica studenti e metriche</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="er-btn er-btn-ghost" style={{ gap: 6, fontSize: 13 }}><Filter size={13} /> Filtra</button>
              <button className="er-btn er-btn-primary" style={{ gap: 6, fontSize: 13 }}><PlusCircle size={13} /> Nuovo profilo</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 18, alignItems: 'start' }}>
            <div className="er-card anim-fade-in" style={{ padding: '20px 22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, gap: 12, flexWrap: 'wrap' }}>
                <div className="er-search" style={{ maxWidth: 280 }}>
                  <Search size={13} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                  <input placeholder="Cerca profilo o metrica" />
                </div>
                <button className="er-icon-btn"><MoreHorizontal size={15} /></button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 18 }}>
                {summaryCards.map(({ icon: Icon, label, value, hint }) => (
                  <div key={label} className="er-card" style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</div>
                        <div style={{ marginTop: 8, fontSize: 22, fontWeight: 700, color: 'var(--text-h)' }}>{value}</div>
                      </div>
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--accent-glow)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={18} />
                      </div>
                    </div>
                    {hint && <div style={{ marginTop: 8, fontSize: 12.5, color: 'var(--text-muted)' }}>{hint}</div>}
                  </div>
                ))}
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="er-table">
                  <thead>
                    <tr>
                      <th>STUDENTE</th>
                      <th>EMAIL</th>
                      <th>CITTÀ</th>
                      <th>ANNO</th>
                      <th>STATO</th>
                      <th>DETTAGLI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingAlunni && (
                      <tr><td colSpan={6} style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-muted)' }}>Caricamento...</td></tr>
                    )}
                    {!loadingAlunni && recent.length === 0 && (
                      <tr><td colSpan={6} style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-muted)' }}>Nessun alunno disponibile.</td></tr>
                    )}
                    {!loadingAlunni && recent.map((a, i) => (
                      <tr key={a.matricola ?? i}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div
                              style={{
                                width: 38,
                                height: 38,
                                borderRadius: '50%',
                                background: gradients[i % gradients.length],
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 700,
                                fontSize: 14,
                              }}
                            >
                              {a.nome?.charAt(0)}{a.cognome?.charAt(0)}
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, color: 'var(--text-h)' }}>{a.nome} {a.cognome}</div>
                              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{a.matricola}</div>
                            </div>
                          </div>
                        </td>
                        <td>{a.email || '—'}</td>
                        <td>{a.citta || '—'}</td>
                        <td>{a.annoCorso || '—'}</td>
                        <td>
                          <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: 999, background: '#45b16e', color: '#ffffff', fontSize: 12, fontWeight: 600 }}>
                            Attivo
                          </span>
                        </td>
                        <td>
                          <button
                            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px 19px', borderRadius: 8, transition: '0.2s' }}
                            title="Dettagli"
                            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                          >
                            <Info size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="er-card anim-fade-up" style={{ padding: '22px 22px' }}>
              <div style={{ marginBottom: 18 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--text-h)', marginBottom: 4 }}>Andamento mensile</h3>
                <p style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>Trend dei profili registrati</p>
              </div>
              <div style={{ background: 'var(--bg-input)', borderRadius: 10, padding: '10px 14px', marginBottom: 18, borderLeft: '3px solid var(--accent)' }}>
                {loadingStats ? (
                  <div className="text-sm text-slate-400">Caricamento...</div>
                ) : (
                  <MonthlyTrendChart data={stats.monthlyTrend} />
                )}
              </div>
              <div style={{ display: 'grid', gap: 10 }}>
                <div style={{ borderRadius: 12, padding: '12px 14px', background: 'var(--bg-input)', color: 'var(--text)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                    <span>Utenti online ora</span>
                    <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{loadingStats ? '…' : stats.onlineUsers}</span>
                  </div>
                </div>
                <div style={{ borderRadius: 12, padding: '12px 14px', background: 'var(--bg-input)', color: 'var(--text)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                    <span>Utenti attivi (30gg)</span>
                    <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{loadingStats ? '…' : stats.activeUsers30Days}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}