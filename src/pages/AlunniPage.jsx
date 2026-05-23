import { useEffect, useState } from 'react';
import { PlusCircle, ClipboardList } from 'lucide-react';
import Header from '../components/ui/Header';
import Sidebar from '../components/ui/Sidebar';
import AlunnoForm from '../components/alunno/alunnoForm';
import { alunnoApi } from '../api/alunnoApi';

export default function AlunniPage() {
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

  const handleAdd = (newAlunno) => {
    setAlunni((s) => [newAlunno, ...s]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-8 xl:grid-cols-[280px_1fr]">
        <Sidebar />

        <main className="space-y-8">
          <div className="rounded-[32px] border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
            <div className="md:flex md:items-center md:justify-between gap-6">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-indigo-300/80">Alunni</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Gestione anagrafica studenti</h2>
                <p className="mt-3 max-w-2xl text-slate-400">Crea, aggiorna e visualizza i dettagli dei profili con il formato CRM.</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-950/80 px-4 py-3 text-sm text-slate-300 ring-1 ring-white/10">
                <PlusCircle className="h-5 w-5 text-indigo-300" /> Nuovo alunno
              </div>
            </div>
          </div>

          <section className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/30">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">Lista alunni</h3>
                  <p className="mt-2 text-sm text-slate-400">Tabella dei profili con informazioni rapide.</p>
                </div>
                <ClipboardList className="h-5 w-5 text-indigo-300" />
              </div>

              <div className="mt-6 overflow-hidden rounded-[28px] border border-white/5 bg-slate-950">
                <table className="min-w-full divide-y divide-slate-800 text-left text-sm text-slate-300">
                  <thead className="bg-slate-900 text-slate-400">
                    <tr>
                      <th className="px-5 py-4 font-medium">Nome</th>
                      <th className="px-5 py-4 font-medium">Email</th>
                      <th className="px-5 py-4 font-medium">Anno</th>
                      <th className="px-5 py-4 font-medium">Stato</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-950">
                    {loading && (
                      <tr>
                        <td colSpan="4" className="px-5 py-6 text-center text-slate-500">Caricamento...</td>
                      </tr>
                    )}
                    {!loading && alunni.length === 0 && (
                      <tr>
                        <td colSpan="4" className="px-5 py-6 text-center text-slate-500">Nessun alunno disponibile.</td>
                      </tr>
                    )}
                    {!loading && alunni.map((alunno) => (
                      <tr key={alunno.matricola ?? alunno.email} className="hover:bg-slate-900/70 transition">
                        <td className="px-5 py-4">
                          <div className="font-medium text-white">{alunno.nome} {alunno.cognome}</div>
                          <div className="text-xs text-slate-500">{alunno.luogoNascita || '—'}</div>
                        </td>
                        <td className="px-5 py-4">{alunno.email || '—'}</td>
                        <td className="px-5 py-4">{alunno.annoCorso || '—'}</td>
                        <td className="px-5 py-4">
                          <span className="inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">Attivo</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[28px] border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-950/85 p-6 shadow-2xl shadow-slate-950/30">
                <h3 className="text-xl font-semibold text-white">Aggiungi nuovo profilo</h3>
                <p className="mt-2 text-sm text-slate-400">Compila tutti i campi per creare un nuovo alunno nel sistema.</p>
                <div className="mt-5 rounded-[24px] border border-white/10 bg-slate-950 p-4 text-sm text-slate-300">
                  <p className="font-medium text-slate-100">Suggerimento</p>
                  <p className="mt-2">I campi email e password sono obbligatori per completare l'iscrizione.</p>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-slate-950/30">
                <h3 className="text-xl font-semibold text-white">Modulo alunno</h3>
                <div className="mt-5">
                  <AlunnoForm onSuccess={handleAdd} />
                </div>
              </div>
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}
