import { useEffect, useState } from 'react';
import { Activity, BarChart3, CalendarDays, Users } from 'lucide-react';
import Header from '../components/ui/Header';
import Sidebar from '../components/ui/Sidebar';
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
    return () => (mounted = false);
  }, []);

  const total = alunni.length;
  const recent = alunni.slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-8 xl:grid-cols-[280px_1fr]">
        <Sidebar />

        <main className="space-y-8">
          <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900/95 to-slate-950/90 p-8 shadow-2xl shadow-slate-950/50 backdrop-blur-xl">
            <div className="md:flex md:items-center md:justify-between gap-6">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-indigo-300/80">Pannello</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Dashboard studenti</h2>
                <p className="mt-3 max-w-2xl text-slate-400">Riepilogo delle attività, registrazioni recenti e parametri accademici in un unico posto.</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-4 ring-1 ring-white/10">
                <p className="text-sm text-slate-400">Prossima revisione</p>
                <p className="mt-2 text-xl font-semibold text-white">Martedì, 11:00</p>
              </div>
            </div>
          </section>

          <section className="grid gap-4 xl:grid-cols-3">
            <StatsCard icon={Users} label="Totale alunni" value={loading ? '...' : total} hint="Studenti registrati" accent="bg-indigo-500/15 text-indigo-600" />
            <StatsCard icon={Activity} label="Nuovi inserimenti" value={loading ? '...' : recent.length} hint="Ultimi 5 profili" accent="bg-emerald-500/15 text-emerald-600" />
            <StatsCard icon={BarChart3} label="Materie attive" value="—" hint="Da collegare al backend" accent="bg-violet-500/15 text-violet-600" />
          </section>

          <section className="grid gap-4 xl:grid-cols-[1.45fr_0.95fr]">
            <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/30">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">Ultimi alunni</h3>
                  <p className="mt-2 text-sm text-slate-400">Elenco delle iscrizioni più recenti.</p>
                </div>
                <span className="inline-flex rounded-full bg-indigo-500/15 px-3 py-1 text-sm text-indigo-200">Live</span>
              </div>

              <div className="mt-6 space-y-4">
                {loading && <div className="text-sm text-slate-400">Caricamento...</div>}
                {!loading && recent.length === 0 && <div className="text-sm text-slate-400">Nessun alunno disponibile.</div>}
                {!loading && recent.map((a) => <StudentCard key={a.matricola ?? a.email} alunno={a} />)}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-slate-950/30">
              <h3 className="text-xl font-semibold text-white">Azioni rapide</h3>
              <div className="mt-4 grid gap-4">
                <div className="rounded-[24px] border border-white/10 bg-slate-950/70 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-slate-300">Crea un nuovo profilo alunno</p>
                    <CalendarDays className="h-5 w-5 text-indigo-300" />
                  </div>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-slate-950/70 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-slate-300">Controlla le materie più popolari</p>
                    <BarChart3 className="h-5 w-5 text-emerald-300" />
                  </div>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-slate-950/70 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-slate-300">Prepara il report della settimana</p>
                    <Activity className="h-5 w-5 text-violet-300" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
