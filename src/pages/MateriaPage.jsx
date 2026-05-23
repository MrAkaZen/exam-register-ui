import Header from '../components/ui/Header';
import Sidebar from '../components/ui/Sidebar';

export default function MateriaPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8 flex gap-6">
        <Sidebar />
        <main className="flex-1 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Materie</h2>
          <p className="text-slate-600 dark:text-slate-300">Qui verranno visualizzate le materie e le relative informazioni.</p>
        </main>
      </div>
    </div>
  );
}
