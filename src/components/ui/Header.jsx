import { Link } from 'react-router-dom';
import { Search, Bell, Settings2 } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-slate-950 border-b border-slate-800 text-slate-100 shadow-2xl shadow-slate-950/20">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-500 text-lg font-bold text-white shadow-lg shadow-indigo-500/25">ER</div>
          <div>
            <h1 className="text-xl font-semibold text-white">Exam Register</h1>
            <p className="text-sm text-slate-400">CRM-style dashboard per la gestione degli studenti.</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="relative flex items-center rounded-full bg-slate-900/80 px-3 py-2 text-slate-400 shadow-inner shadow-slate-950/20">
            <Search className="mr-2 h-4 w-4" />
            <input
              className="w-full bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-500"
              placeholder="Cerca alunni, materie..."
            />
          </div>
          <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-slate-300 transition hover:bg-slate-800">
            <Bell className="h-5 w-5" />
          </button>
          <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-slate-300 transition hover:bg-slate-800">
            <Settings2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
