import { useEffect, useState } from 'react';
import { Plus, Search, Filter, ChevronDown } from 'lucide-react';
import Header from '../components/ui/Header';
import AlunnoForm from '../components/alunno/alunnoForm';
import { alunnoApi } from '../api/alunnoApi';

export default function AlunniPage() {
  const [alunni, setAlunni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');

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

  const handleStudentClick = async (matricola) => {
  try {
    const response = await axios.get(
      `/alunno/alunnobyId/${matricola}`
    );
    const alunno = response.data;
    console.log('Alunno recuperato:', alunno);
  } catch (error) {
    console.error("Errore recupero alunno:", error);
  }
};

  const handleAdd = (newAlunno) => {
    setAlunni((s) => [newAlunno, ...s]);
    setShowForm(false);
  };

  const filtered = alunni.filter((a) => {
    const q = search.toLowerCase();
    return (
      !q ||
      `${a.nome} ${a.cognome}`.toLowerCase().includes(q) ||
      (a.email || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="er-app">
      <Header />

      <main className="er-main">
        <div className="er-page-header">
          <div>
            <p className="er-eyebrow">Anagrafica</p>
            <h1 className="er-page-title">Studenti</h1>
          </div>
          <button
            className="er-btn er-btn--primary"
            onClick={() => setShowForm((v) => !v)}
          >
            <Plus size={16} strokeWidth={2} />
            {showForm ? 'Annulla' : 'Nuovo studente'}
          </button>
        </div>

        {showForm && (
          <div className="er-card er-card--form er-fade-in">
            <div className="er-card-header">
              <div>
                <h2 className="er-card-title">Nuovo profilo studente</h2>
                <p className="er-card-sub">Compila i campi per aggiungere uno studente al sistema</p>
              </div>
            </div>
            <AlunnoForm onSuccess={handleAdd} />
          </div>
        )}

        <div className="er-card">
          <div className="er-table-toolbar">
            <div className="er-search er-search--table">
              <Search size={14} strokeWidth={1.8} className="er-search-icon" />
              <input
                className="er-search-input"
                placeholder="Cerca per nome o email…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="er-btn er-btn--ghost">
              <Filter size={14} strokeWidth={1.8} />
              Filtri
              <ChevronDown size={12} strokeWidth={2} />
            </button>
            <span className="er-table-count">
              {loading ? '…' : `${filtered.length} studenti`}
            </span>
          </div>

          <div className="er-table-wrap">
            <table className="er-table">
              <thead>
                <tr>
                  <th>Studente</th>
                  <th>Email</th>
                  <th>Anno</th>
                  <th>Città</th>
                  <th>Stato</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={5} className="er-table-empty">Caricamento...</td>
                  </tr>
                )}
                {!loading && filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="er-table-empty">
                      {search ? 'Nessun risultato.' : 'Nessun alunno disponibile.'}
                    </td>
                  </tr>
                )}
                {!loading && filtered.map((a) => (
                  <tr key={a.matricola ?? a.email} className="er-table-row">
                    <td>
                      <div className="er-table-student">
                        <div className="er-avatar er-avatar--sm">
                          {(a.nome || '?').charAt(0)}{(a.cognome || '?').charAt(0)}
                        </div>
                        <div>
                          <p className="er-table-name">{a.nome} {a.cognome}</p>
                          <p className="er-table-mat">{a.matricola ?? '—'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="er-table-muted">{a.email || '—'}</td>
                    <td className="er-table-muted">{a.annoCorso || '—'}</td>
                    <td className="er-table-muted">{a.citta || '—'}</td>
                    <td>
                      <span className="er-status er-status--active">Attivo</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
