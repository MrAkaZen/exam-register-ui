import { useEffect, useState } from 'react';
import { PlusCircle, Search, Filter, MoreHorizontal, Users } from 'lucide-react';
import Header from '../components/ui/Header';
import Sidebar from '../components/ui/Sidebar';
import AlunnoForm from '../components/alunno/alunnoForm';
import alunnoApi from '../api/alunnoApi';
import { Info } from "lucide-react";

const gradients = [
  'linear-gradient(135deg, #2563eb, #0ea5e9)',
  'linear-gradient(135deg, #7c3aed, #3b82f6)',
  'linear-gradient(135deg, #0891b2, #2563eb)',
  'linear-gradient(135deg, #6d28d9, #0ea5e9)',
  'linear-gradient(135deg, #1d4ed8, #7c3aed)',
];

export default function AlunniPage() {
  const [alunni, setAlunni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadAlunni = async () => {
      try {
        const res = await alunnoApi.getAll(0, 10);

        if (mounted) {
          setAlunni(res.data.content);
          console.log('Alunni caricati:', res.data.content);
        }
      } catch (err) {
        console.error("Errore nel recupero degli alunni:", err);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadAlunni();

    return () => {
      mounted = false;
    };
  }, []);

  const handleAdd = (a) => { setAlunni(s => [a, ...s]); setShowForm(false); };

  return (
    <div className="er-shell">
      <Sidebar />
      <div className="er-main">
        <Header title="Alunni" subtitle="Gestione anagrafica studenti" />

        <div className="er-content">

          {/* Page header bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22, gap: 14, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                <Users size={18} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-h)' }}>
                  {loading ? '…' : alunni.length} studenti registrati
                </h3>
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Tutti i profili accademici</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="er-btn er-btn-ghost" style={{ gap: 6, fontSize: 13 }}><Filter size={13} /> Filtra</button>
              <button className="er-btn er-btn-primary" style={{ gap: 6, fontSize: 13 }} onClick={() => setShowForm(v => !v)}>
                <PlusCircle size={13} /> Nuovo alunno
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: showForm ? '1fr 380px' : '1fr', gap: 18, alignItems: 'start' }}>

            {/* Table */}
            <div className="er-card anim-fade-in" style={{ padding: '20px 22px' }}>
              {/* Search */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, gap: 12, flexWrap: 'wrap' }}>
                <div className="er-search" style={{ maxWidth: 280 }}>
                  <Search size={13} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                  <input placeholder="Cerca per nome, email..." />
                </div>
                <button className="er-icon-btn"><MoreHorizontal size={15} /></button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="er-table">
                  <thead>
                    <tr>
                      <th>STUDENTE</th>
                      <th>EMAIL</th>
                      <th>CITTÀ</th>
                      <th>ANNO</th>
                      <th>STATO</th>
                      <th>DETTAGLI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading && (
                      <tr><td colSpan={5} style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-muted)' }}>Caricamento...</td></tr>
                    )}
                    {!loading && alunni.length === 0 && (
                      <tr><td colSpan={5} style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-muted)' }}>Nessun alunno disponibile.</td></tr>
                    )}
                    {!loading &&
                      alunni.map((a, i) => (
                        <tr key={a.matricola ?? i}>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                              <div
                                style={{
                                  width: 38,
                                  height: 38,
                                  borderRadius: "50%",
                                  background: gradients[i % gradients.length],
                                  color: "#fff",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontWeight: 700,
                                  fontSize: 14,
                                }}
                              >
                                {a.nome?.charAt(0)}
                                {a.cognome?.charAt(0)}
                              </div>

                              <div>
                                <div
                                  style={{
                                    fontWeight: 600,
                                    color: "var(--text-h)",
                                  }}
                                >
                                  {a.nome} {a.cognome}
                                </div>

                                <div
                                  style={{
                                    fontSize: 12,
                                    color: "var(--text-muted)",
                                  }}
                                >
                                  {a.matricola}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td>{a.email}</td>
                          <td>{a.citta || "-"}</td>
                          <td>{a.annoCorso}</td>
                          <td>
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                padding: "4px 10px",
                                borderRadius: 999,
                                background: "#45b16e",
                                color: "#ffffff",
                                fontSize: 12,
                                fontWeight: 600,
                              }}
                            >
                              Attivo
                            </span>
                          </td>
                          <td>
                            <button
                              onClick={() => navigate(`/alunni/${a.matricola}`)}
                              style={{
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                color: "var(--text-muted)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "5px 19px",
                                borderRadius: 8,
                                transition: "0.2s",
                              }}
                              title="Dettagli"
                              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                            >
                              <Info size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Form panel */}
            {showForm && (
              <div className="er-card anim-fade-up" style={{ padding: '22px 22px' }}>
                <div style={{ marginBottom: 18 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--text-h)', marginBottom: 4 }}>
                    Nuovo profilo
                  </h3>
                  <p style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>Compila i campi per aggiungere uno studente</p>
                </div>
                <div style={{ background: 'var(--bg-input)', borderRadius: 10, padding: '10px 14px', marginBottom: 18, fontSize: 12.5, color: 'var(--text-muted)', borderLeft: '3px solid var(--accent)' }}>
                  Email e password sono obbligatorie per completare l'iscrizione.
                </div>
                <AlunnoForm onSuccess={handleAdd} />
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
