export default function StudentCard({ alunno }) {
  const born = alunno.dataNascita ? new Date(alunno.dataNascita).toLocaleDateString('it-IT') : null;

  return (
    <div className="rounded-[24px] border border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-lg shadow-slate-900/5 transition hover:-translate-y-0.5 hover:shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white flex items-center justify-center text-lg font-semibold">
            {(alunno.nome || '?').charAt(0)}{(alunno.cognome || '?').charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-slate-900 dark:text-white">{alunno.nome} {alunno.cognome}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">{alunno.email || 'Nessuna email'}</div>
          </div>
        </div>
        <div className="text-sm font-medium text-slate-500 dark:text-slate-400">{alunno.matricola ?? '—'}</div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {alunno.telefono && (
          <div className="rounded-2xl bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">📞 {alunno.telefono}</div>
        )}
        {born && (
          <div className="rounded-2xl bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">🎂 {born}</div>
        )}
        {alunno.luogoNascita && (
          <div className="rounded-2xl bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">📍 {alunno.luogoNascita}</div>
        )}
        {alunno.annoCorso && (
          <div className="rounded-2xl bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">🏫 Anno {alunno.annoCorso}</div>
        )}
      </div>

      <div className="mt-4 grid gap-3 text-sm text-slate-500 dark:text-slate-400">
        {alunno.codiceFiscale && <div>Codice fiscale: {alunno.codiceFiscale}</div>}
        {(alunno.indirizzo || alunno.citta || alunno.cap) && (
          <div>{[alunno.indirizzo, alunno.citta, alunno.cap].filter(Boolean).join(', ')}</div>
        )}
      </div>
    </div>
  );
}
