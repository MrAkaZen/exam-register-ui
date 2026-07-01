import { useEffect, useState } from 'react';
import { Users, Activity, BarChart3, BookOpen, TrendingUp, ArrowUpRight, Filter, SortAsc, MoreHorizontal, Eye } from 'lucide-react';
import Header from '../components/ui/Header';
import Sidebar from '../components/ui/Sidebar';
import StatsCard from '../components/ui/StatsCard';
import CashFlowChart from '../components/ui/CashFlowChart';
import alunnoApi from '../api/alunnoApi';

export default function Dashboard() {
  const [alunni, setAlunni] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    alunnoApi.getAll()
    return () => (mounted = false);
  }, []);

  return (
    <div className="er-shell">
      <Sidebar />
      <div className="er-main">
        <Header title="Dashboard" subtitle="Panoramica attività accademica" />

        <div className="er-content">

          {/* ── Total balance hero card ── */}
          <div className="er-card anim-fade-up" style={{
            padding: '24px 28px', marginBottom: 24,
            background: 'linear-gradient(135deg, var(--bg-sidebar) 0%, #1a2555 100%)',
            border: 'none', position: 'relative', overflow: 'hidden',
          }}>
            {/* Decorative blobs */}
            <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'var(--accent)', opacity: .08, filter: 'blur(40px)' }} />
            <div style={{ position: 'absolute', bottom: -30, right: 200, width: 150, height: 150, borderRadius: '50%', background: 'var(--accent-2)', opacity: .07, filter: 'blur(35px)' }} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
              <div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.55)', marginBottom: 6, fontWeight: 500 }}>SALDO TOTALE</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 800, color: '#fff', letterSpacing: '-1px', lineHeight: 1 }}>
                  € 0,00
                </div>
                <div style={{ marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(16,185,129,.18)', color: '#34d399', padding: '3px 10px', borderRadius: 99, fontSize: 12.5, fontWeight: 600 }}>
                  <TrendingUp size={11} /> 15,8%
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                {[
                  { label: '+ Aggiungi', primary: true },
                  { label: '↑ Invia',    primary: false },
                  { label: '↩ Richiedi', primary: false },
                ].map(b => (
                  <button key={b.label} className="er-btn" style={{
                    background: b.primary ? 'var(--accent)' : 'rgba(255,255,255,.10)',
                    color: '#fff',
                    backdropFilter: 'blur(8px)',
                    border: b.primary ? 'none' : '1px solid rgba(255,255,255,.15)',
                    boxShadow: b.primary ? '0 2px 10px rgba(37,99,235,.4)' : 'none',
                  }}>{b.label}</button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Stats row ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 24 }}>
            <StatsCard icon={Users}    label="Totale alunni"    value={loading ? '…' : total} trend="+12%" trendUp delay={.05} hint="vs. mese scorso" />
            <StatsCard icon={Activity} label="Nuovi (7 giorni)" value={loading ? '…' : Math.min(recent.length, 5)} trend="+5%" trendUp delay={.10} hint="ultimi 7 gg" />
            <StatsCard icon={BookOpen} label="Materie attive"   value="24" trend="+3%" trendUp delay={.15} hint="su 30 totali" />
            <StatsCard icon={BarChart3} label="Esami sostenuti" value="138" trend="+22%" trendUp delay={.20} hint="questo semestre" />
          </div>

          {/* ── Main grid ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 18, marginBottom: 18 }}>

            {/* Cash Flow chart */}
            <div className="er-card anim-fade-up delay-3" style={{ padding: '20px 22px' }}>
              <CashFlowChart />
            </div>

            {/* Recent students */}
            <div className="er-card anim-fade-up delay-4" style={{ padding: '20px 22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--text-h)' }}>
                  Ultimi alunni
                </span>
                <button style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                  Vedi tutti <ArrowUpRight size={12} />
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {loading && <div style={{ fontSize: 13, color: 'var(--text-muted)', padding: '20px 0', textAlign: 'center' }}>Caricamento...</div>}
                {!loading && recent.map((a, i) => (
                  <StudentCard key={a.matricola ?? a.email} alunno={a} delay={i * .05 + .2} />
                ))}
              </div>
            </div>
          </div>

          {/* ── Account summary cards ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 18 }}>
            {}
          </div>

          {/* ── Recent Activity table ── */}
          <div className="er-card anim-fade-up delay-5" style={{ padding: '20px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--text-h)' }}>
                Attività recente
              </span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="er-btn er-btn-ghost" style={{ padding: '6px 12px', fontSize: 12 }}>
                  <Filter size={12} /> Filtra
                </button>
                <button className="er-btn er-btn-ghost" style={{ padding: '6px 12px', fontSize: 12 }}>
                  <SortAsc size={12} /> Ordina
                </button>
                <button className="er-icon-btn"><MoreHorizontal size={14} /></button>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="er-table">
                <thead>
                  <tr>
                    <th>TIPO</th>
                    <th>NOME</th>
                    <th>DATA</th>
                    <th>IMPORTO</th>
                    <th>STATO</th>
                    <th>METODO</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
