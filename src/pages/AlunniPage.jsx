import { useEffect, useState } from 'react';
import { Plus, Search, Filter, ChevronDown } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import Header from '../components/ui/Header';
import AlunnoForm from '../components/alunno/alunnoForm';
import { alunnoApi } from '../api/alunnoApi';

export default function AlunniPage() {
  const [alunni, setAlunni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [filterData, setFilterData] = useState({
    nomeCompleto: '',
    email: '',
    telefono: '',
    codiceFiscale: '',
    indirizzo: '',
    cap: '',
    citta: '',
    annoCorso: '',
    dataIscrizione: '',
  });

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

  const cleanEmptyFields = (data) => {
    const cleaned = { ...data };
    Object.keys(cleaned).forEach((key) => {
      if (cleaned[key] === '' || cleaned[key] === null || cleaned[key] === undefined) {
        delete cleaned[key];
      }
    });
    return cleaned;
  };

  const handleApplyFilters = async () => {
    setLoading(true);
    try {
      const cleanedFilters = cleanEmptyFields(filterData);
      const resp = await alunnoApi.getFilteredWithBody(cleanedFilters, page, size);
      if (resp.data) {
        setAlunni(Array.isArray(resp.data) ? resp.data : []);
      }
      setShowFilters(false);
    } catch (e) {
      console.error('Errore filtri:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setFilterData({
      nomeCompleto: '',
      email: '',
      telefono: '',
      codiceFiscale: '',
      indirizzo: '',
      cap: '',
      citta: '',
      annoCorso: '',
      dataIscrizione: '',
    });
    setPage(0);
  };

  const navigate = useNavigate();

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
            <button 
              className="er-btn er-btn--ghost"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={14} strokeWidth={1.8} />
              Filtri
              <ChevronDown size={12} strokeWidth={2} />
            </button>
            <span className="er-table-count">
              {loading ? '…' : `${alunni.length} studenti`}
            </span>
          </div>

          {showFilters && (
            <div className="er-filters-panel er-fade-in" style={{ padding: '16px', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface-2)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={filterData.nomeCompleto}
                  onChange={(e) => setFilterData({ ...filterData, nomeCompleto: e.target.value })}
                  className="er-input"
                  style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px' }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={filterData.email}
                  onChange={(e) => setFilterData({ ...filterData, email: e.target.value })}
                  className="er-input"
                  style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px' }}
                />
                <input
                  type="tel"
                  placeholder="Telefono"
                  value={filterData.telefono}
                  onChange={(e) => setFilterData({ ...filterData, telefono: e.target.value })}
                  className="er-input"
                  style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px' }}
                />
                <input
                  type="text"
                  placeholder="Codice Fiscale"
                  value={filterData.codiceFiscale}
                  onChange={(e) => setFilterData({ ...filterData, codiceFiscale: e.target.value })}
                  className="er-input"
                  style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px' }}
                />
                <input
                  type="text"
                  placeholder="Indirizzo"
                  value={filterData.indirizzo}
                  onChange={(e) => setFilterData({ ...filterData, indirizzo: e.target.value })}
                  className="er-input"
                  style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px' }}
                />
                <input
                  type="text"
                  placeholder="CAP"
                  value={filterData.cap}
                  onChange={(e) => setFilterData({ ...filterData, cap: e.target.value })}
                  className="er-input"
                  style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px' }}
                />
                <input
                  type="text"
                  placeholder="Città"
                  value={filterData.citta}
                  onChange={(e) => setFilterData({ ...filterData, citta: e.target.value })}
                  className="er-input"
                  style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px' }}
                />
                <select
                  value={filterData.annoCorso}
                  onChange={(e) => setFilterData({ ...filterData, annoCorso: e.target.value })}
                  className="er-input"
                  style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px' }}
                >
                  <option value="">Anno Corso</option>
                  <option value="PRIMO">PRIMO</option>
                  <option value="SECONDO">SECONDO</option>
                  <option value="TERZO">TERZO</option>
                </select>
                <input
                  type="date"
                  value={filterData.dataIscrizione}
                  onChange={(e) => setFilterData({ ...filterData, dataIscrizione: e.target.value })}
                  className="er-input"
                  style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button
                  className="er-btn er-btn--ghost"
                  onClick={() => {
                    handleResetFilters();
                    setShowFilters(false);
                  }}
                >
                  Cancella
                </button>
                <button
                  className="er-btn er-btn--primary"
                  onClick={handleApplyFilters}
                  disabled={loading}
                >
                  Applica filtri
                </button>
              </div>
            </div>
          )}

          <div className="er-table-wrap">
            <table className="er-table">
              <thead>
                <tr>
                  <th>Studente</th>
                  <th>Email</th>
                  <th>Anno</th>
                  <th>Città</th>
                  <th>Stato</th>
                  <th>Dettagli</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={6} className="er-table-empty">Caricamento...</td>
                  </tr>
                )}
                {!loading && alunni.length === 0 && (
                  <tr>
                    <td colSpan={6} className="er-table-empty">
                      {search ? 'Nessun risultato.' : 'Nessun alunno disponibile.'}
                    </td>
                  </tr>
                )}
                {!loading && alunni.map((a) => (
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
                    <td> 
                        <button className="er-btn er-btn--ghost er-btn--icon" 
                        onClick={(e) => { e.stopPropagation(); navigate(`/alunni/alunno?matricola=${a.matricola}`); }}>
                        </button> 
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
