import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, Users, BookOpen, BarChart3 } from 'lucide-react';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/alunni', label: 'Alunni', icon: Users },
  { to: '/materie', label: 'Materie', icon: BookOpen },
  { to: '/', label: 'Home', icon: Home },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="hidden xl:block w-72 bg-slate-950 text-slate-200 rounded-[32px] p-5 shadow-2xl shadow-slate-950/40">
      <div className="mb-6 rounded-[28px] border border-white/10 bg-slate-900/80 p-5">
        <div className="text-xs uppercase tracking-[0.28em] text-slate-500">Menu</div>
        <p className="mt-3 text-sm text-slate-300">Navigazione rapida per il pannello CRM.</p>
      </div>

      <nav className="space-y-2">
        {links.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${pathname === to ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-300 hover:bg-slate-900/70 hover:text-white'}`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="mt-8 rounded-[28px] border border-white/10 bg-gradient-to-b from-indigo-600/10 to-transparent p-5">
        <div className="text-xs uppercase tracking-[0.3em] text-indigo-200">Insights</div>
        <p className="mt-3 text-sm text-slate-300">Aggiorna i dati degli studenti, organizza esami e visualizza le attività.</p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-slate-900/80 px-3 py-2 text-sm text-slate-200">
          <BarChart3 className="h-4 w-4 text-indigo-300" /> Report settimanale
        </div>
      </div>
    </aside>
  );
}
