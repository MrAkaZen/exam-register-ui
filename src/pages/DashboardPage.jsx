import { Activity, BarChart3, CalendarDays, Users } from 'lucide-react';
import Header from '../components/ui/Header';
import Sidebar from '../components/ui/Sidebar';
import StatsCard from '../components/ui/StatsCard';
import { useAlunni } from '../hooks/useAlunni';
import QuickAction from '../components/quickAction/quickAction';

export default function Dashboard() {
  const { alunni, loading } = useAlunni();

  const total = alunni.length;
  const recent = alunni.slice(0, 5);

  return (
    <div className="er-shell">
      <Sidebar />
      <div className="er-main">
        <Header title="Dashboard" />

        <div className="er-content">

          {/* HERO */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-indigo-300/80">
                Pannello
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-white">
                Dashboard studenti
              </h2>

              <p className="mt-3 max-w-2xl text-slate-400">
                Riepilogo delle attività, registrazioni recenti e parametri
                accademici in un unico posto.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-950/80 p-4 ring-1 ring-white/10">
              <p className="text-sm text-slate-400">Prossima revisione</p>
              <p className="mt-2 text-xl font-semibold text-white">
                Martedì, 11:00
              </p>
            </div>
          </div>

          {/* STATS */}
          <StatsCard
            icon={Users}
            label="Totale alunni"
            value={loading ? "..." : total}
            hint="Studenti registrati"
            accent="bg-indigo-500/15 text-indigo-600"
          />

          <StatsCard
            icon={Activity}
            label="Nuovi inserimenti"
            value={loading ? "..." : recent.length}
            hint="Ultimi 5 profili"
            accent="bg-emerald-500/15 text-emerald-600"
          />

          <StatsCard
            icon={BarChart3}
            label="Materie attive"
            value="—"
            hint="Da collegare al backend"
            accent="bg-violet-500/15 text-violet-600"
          />


          {/* CONTENT */}
          <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/30">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Ultimi alunni
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Elenco delle iscrizioni più recenti.
                </p>
              </div>

              <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-sm text-indigo-200">
                Live
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {loading && (
                <div className="text-sm text-slate-400">
                  Caricamento...
                </div>
              )}

              {!loading && recent.length === 0 && (
                <div className="text-sm text-slate-400">
                  Nessun alunno disponibile.
                </div>
              )}

              {!loading &&
                recent.map((a) => (
                  <StudentCard
                    key={a.matricola ?? a.email}
                    alunno={a}
                  />
                ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-slate-950/30">
            <h3 className="text-xl font-semibold text-white">
              Azioni rapide
            </h3>

            <div className="mt-4 space-y-4">
              <QuickAction
                icon={CalendarDays}
                text="Crea un nuovo profilo alunno"
                color="text-indigo-300"
              />

              <QuickAction
                icon={BarChart3}
                text="Controlla le materie più popolari"
                color="text-emerald-300"
              />

              <QuickAction
                icon={Activity}
                text="Prepara il report della settimana"
                color="text-violet-300"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}