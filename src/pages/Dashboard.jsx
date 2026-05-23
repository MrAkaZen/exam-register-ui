import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Activity, BarChart3, Users, ArrowRight, TrendingUp } from 'lucide-react';
import Header from '../components/ui/Header';
import StatsCard from '../components/ui/StatsCard';
import StudentCard from '../components/alunno/StudentCard';
import { alunnoApi } from '../api/alunnoApi';

export default function Dashboard() {
  const [alunni, setAlunni] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const resp = await alunnoApi.getAll();
        if (mounted) setAlunni(Array.isArray(resp.data) ? resp.data : []);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const navigate = useNavigate();

  const recent = alunni.slice(0, 5);

  return (
    <div className="er-app">
      <Header />

      <main className="er-main">
        <div className="er-page-header">
          <div>
            <p className="er-eyebrow">Panoramica</p>
            <h1 className="er-page-title">Dashboard</h1>
          </div>
          <div className="er-date-badge">
            <span className="er-date-label">Prossima revisione</span>
            <span className="er-date-value">Martedì, 11:00</span>
          </div>
        </div>

        <div className="er-stats-grid">
          <StatsCard
            icon={Users}
            label="Studenti totali"
            value={loading ? '—' : alunni.length}
            hint="Profili attivi nel sistema"
            trend={{ dir: 'up', label: '+3 questo mese' }}
          />
          <StatsCard
            icon={Activity}
            label="Nuovi inserimenti"
            value={loading ? '—' : recent.length}
            hint="Ultimi 5 profili registrati"
          />
          <StatsCard
            icon={BarChart3}
            label="Materie attive"
            value="—"
            hint="Da collegare al backend"
          />
          <StatsCard
            icon={TrendingUp}
            label="Media voti"
            value="—"
            hint="Calcolo in attesa"
          />
        </div>

        <div className="er-content-grid">
          <section className="er-card er-card--main">
            <div className="er-card-header">
              <div>
                <h2 className="er-card-title">Ultimi studenti</h2>
                <p className="er-card-sub">Iscrizioni più recenti</p>
              </div>
              <span className="er-live-badge">● Live</span>
            </div>

            <div className="er-student-list">
              {loading && <p className="er-empty">Caricamento...</p>}
              {!loading && recent.length === 0 && (
                <p className="er-empty">Nessun alunno disponibile.</p>
              )}
              {!loading && recent.map((a) => (
                <StudentCard key={a.matricola ?? a.email} alunno={a} onClick={() => navigate(`/alunni/alunno?matricola=${a.matricola}`)}/>
              ))}
            </div>
          </section>

          <aside className="er-sidebar-panel">
            <div className="er-card er-card--actions">
              <h2 className="er-card-title">Azioni rapide</h2>
              <div className="er-actions-list">
                {[
                  { label: 'Crea profilo studente', icon: Users, to: '/alunni' },
                  { label: 'Gestisci materie', icon: BarChart3, to: '/materie' },
                  { label: 'Report settimanale', icon: Activity, to: '/dashboard' },
                ].map(({ label, icon: Icon, to }) => (
                  <a key={label} href={to} className="er-action-item">
                    <div className="er-action-icon">
                      <Icon size={16} strokeWidth={1.6} />
                    </div>
                    <span className="er-action-label">{label}</span>
                    <ArrowRight size={14} strokeWidth={1.6} className="er-action-arrow" />
                  </a>
                ))}
              </div>
            </div>

            <div className="er-card er-card--activity">
              <h2 className="er-card-title">Attività recente</h2>
              <div className="er-activity-list">
                {[
                  { text: 'Nuovo alunno registrato', time: '2 min fa', dot: 'blue' },
                  { text: 'Voto aggiornato — Informatica', time: '1h fa', dot: 'green' },
                  { text: 'Report generato', time: 'ieri', dot: 'gray' },
                ].map((item, i) => (
                  <div key={i} className="er-activity-item">
                    <div className={`er-activity-dot er-activity-dot--${item.dot}`} />
                    <div className="er-activity-content">
                      <p className="er-activity-text">{item.text}</p>
                      <p className="er-activity-time">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
