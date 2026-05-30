import { useEffect, useState } from 'react';
import { Plus, BookOpen, Users, Search, GraduationCap } from 'lucide-react';
import Header from '../components/ui/Header';
import MateriaForm from '../components/materia/MateriaForm';
import { materiaApi } from '../api/materiaApi';

const EMOJI_MAP = ['📐', '🔬', '💻', '📊', '🧮', '⚙️', '📡', '🧪', '🗃️', '📈'];
function emojiForMateria(nome = '') {
  let h = 0;
  for (let i = 0; i < nome.length; i++) h = (h * 31 + nome.charCodeAt(i)) | 0;
  return EMOJI_MAP[Math.abs(h) % EMOJI_MAP.length];
}

export default function MateriaPage() {
  const [materie,  setMaterie]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [search,   setSearch]   = useState('');

  useEffect(() => {
    let mounted = true;
    materiaApi.getAll()
      .then((r) => { if (mounted) setMaterie(Array.isArray(r.data) ? r.data : []); })
      .catch(console.error)
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const handleAdd = (nuovaMateria) => {
    setMaterie((prev) => [nuovaMateria, ...prev]);
    setShowForm(false);
  };

  const filtered = materie.filter((m) =>
    !search || m.nome?.toLowerCase().includes(search.toLowerCase()) ||
    m.codice?.toLowerCase().includes(search.toLowerCase()) ||
    m.docente?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="er-app">
      <Header />

      <main className="er-main">
        {/* Page header */}
        <div className="er-page-header">
          <div className="er-page-header-left">
            <p className="er-eyebrow">Catalogo</p>
            <h1 className="er-page-title">Materie</h1>
          </div>
          <div className="er-page-header-actions">
            <button className="er-btn er-btn--primary" onClick={() => setShowForm((v) => !v)}>
              <Plus size={16} strokeWidth={2} />
              {showForm ? 'Annulla' : 'Nuova materia'}
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { label: 'Materie totali',   value: loading ? '—' : materie.length,  icon: BookOpen },
            { label: 'CFU medi',          value: loading ? '—' : (materie.filter((m) => m.cfu).length ? (materie.reduce((a, m) => a + (m.cfu || 0), 0) / materie.filter((m) => m.cfu).length).toFixed(1) : '—'), icon: GraduationCap },
            { label: 'Docenti',           value: loading ? '—' : new Set(materie.filter((m) => m.docente).map((m) => m.docente)).size || '—', icon: Users },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="er-stat">
              <div className="er-stat-header">
                <span className="er-stat-label">{label}</span>
                <div className="er-stat-icon"><Icon size={16} strokeWidth={1.6} /></div>
              </div>
              <div className="er-stat-value">{value}</div>
            </div>
          ))}
        </div>

        {/* Form */}
        {showForm && (
          <div className="er-card er-card--highlight er-fade-in">
            <div className="er-card-header">
              <div>
                <h2 className="er-card-title">Nuova materia</h2>
                <p className="er-card-sub">Aggiungi una materia al catalogo del sistema</p>
              </div>
            </div>
            <div className="er-card-body" style={{ paddingTop: 0 }}>
              <MateriaForm onSuccess={handleAdd} />
            </div>
          </div>
        )}

        {/* Search toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="er-search" style={{ flex: '0 0 300px' }}>
            <Search size={14} strokeWidth={1.8} className="er-search-icon" />
            <input
              className="er-search-input"
              placeholder="Cerca per nome, codice, docente…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <span style={{ fontSize: 12, color: 'var(--ink-4)', fontFamily: 'var(--mono)', marginLeft: 'auto' }}>
            {loading ? '…' : `${filtered.length} materie`}
          </span>
        </div>

        {/* Cards grid */}
        {loading ? (
          <div className="er-card">
            <div className="er-empty-state">
              <p className="er-empty-sub">Caricamento materie…</p>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="er-card">
            <div className="er-empty-state">
              <div className="er-empty-icon"><BookOpen size={22} strokeWidth={1.5} /></div>
              <p className="er-empty-title">
                {search ? 'Nessun risultato' : 'Nessuna materia'}
              </p>
              <p className="er-empty-sub">
                {search
                  ? `Nessuna materia corrisponde a "${search}".`
                  : 'Aggiungi la prima materia al catalogo usando il pulsante in alto.'}
              </p>
              {!search && (
                <button className="er-btn er-btn--primary er-btn--sm" onClick={() => setShowForm(true)}>
                  <Plus size={13} strokeWidth={2} /> Nuova materia
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="er-materia-grid">
            {filtered.map((m) => (
              <div key={m.nome ?? m.codice} className="er-materia-card er-fade-in">
                <div className="er-materia-icon">{emojiForMateria(m.nome)}</div>
                <p className="er-materia-nome">{m.nome}</p>
                {m.codice && <p className="er-materia-codice">{m.codice}</p>}
                {m.docente && (
                  <p style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 6 }}>
                    👤 {m.docente}
                  </p>
                )}
                {m.descrizione && (
                  <p style={{ fontSize: 12, color: 'var(--ink-4)', marginTop: 6, lineHeight: 1.5 }}>
                    {m.descrizione}
                  </p>
                )}
                <div className="er-materia-meta">
                  <span className="er-materia-cfu">
                    {m.cfu ? `${m.cfu} CFU` : '— CFU'}
                  </span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {m.semestre && (
                      <span className="er-chip">Sem. {m.semestre}</span>
                    )}
                    <span className="er-status er-status--active">Attiva</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
