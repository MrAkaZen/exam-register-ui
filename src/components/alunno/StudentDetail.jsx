import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, BookPlus, Pencil, Trash2, GraduationCap, Phone, MapPin, Calendar, CreditCard, Home, Mail } from 'lucide-react';
import Header from '../ui/Header';
import VotoModal from '../voto/VotoModal';
import IscrizioneModal from '../iscrizione/IscrizioneModal';
import { alunnoApi } from '../../api/alunnoApi';

function votoBadgeClass(v) {
  if (!v && v !== 0) return 'er-voto-badge--empty';
  if (v >= 27) return 'er-voto-badge--alto';
  if (v >= 24) return 'er-voto-badge--medio';
  return 'er-voto-badge--basso';
}

function mediaVoti(materie) {
  const voti = (materie ?? []).filter((m) => m.voto != null).map((m) => m.voto);
  if (!voti.length) return null;
  return (voti.reduce((a, b) => a + b, 0) / voti.length).toFixed(1);
}

export default function StudentDetail() {
  const { matricola } = useParams();
  const navigate = useNavigate();

  const [alunno,  setAlunno]  = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const [votoModal,   setVotoModal]   = useState(null);   // { materia }
  const [iscrizioneModal, setIscrizioneModal] = useState(false);

  useEffect(() => {
    let mounted = true;
    alunnoApi.getById(matricola)
      .then((r) => { if (mounted) setAlunno(r.data); })
      .catch(() => { if (mounted) setError('Studente non trovato.'); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [matricola]);

  function handleVotoSuccess({ materia, voto, data }) {
    setAlunno((prev) => ({
      ...prev,
      materie: (prev.materie ?? []).map((m) =>
        (m.codice ?? m.nome) === (materia.codice ?? materia.nome)
          ? { ...m, voto, dataSostenimento: data }
          : m
      ),
    }));
  }

  function handleIscrizioneSuccess(nomeMateria) {
    setAlunno((prev) => ({
      ...prev,
      materie: [...(prev.materie ?? []), { nome: nomeMateria, voto: null }],
    }));
  }

  const initials = alunno
    ? `${(alunno.nome || '?').charAt(0)}${(alunno.cognome || '?').charAt(0)}`.toUpperCase()
    : '?';

  const born = alunno?.dataNascita
    ? new Date(alunno.dataNascita).toLocaleDateString('it-IT')
    : null;

  const media = alunno ? mediaVoti(alunno.materie) : null;

  return (
    <div className="er-app">
      <Header />

      <main className="er-main">
        {/* Back */}
        <Link to="/alunni" className="er-back-btn">
          <ArrowLeft size={15} strokeWidth={2} />
          Torna agli studenti
        </Link>

        {/* Loading / Error */}
        {loading && (
          <div className="er-card">
            <div className="er-empty-state">
              <p className="er-empty-sub">Caricamento profilo…</p>
            </div>
          </div>
        )}

        {error && (
          <div className="er-alert er-alert--error er-slide-up">{error}</div>
        )}

        {!loading && alunno && (
          <>
            {/* Profile header */}
            <div className="er-profile-header er-slide-up">
              <div className="er-avatar er-avatar--xl">{initials}</div>
              <div className="er-profile-info">
                <p className="er-profile-name">{alunno.nome} {alunno.cognome}</p>
                <p className="er-profile-email">{alunno.email}</p>
                <div className="er-profile-badges">
                  <span className="er-chip er-chip--accent">
                    <GraduationCap size={11} style={{ display: 'inline', marginRight: 4 }} />
                    {alunno.annoCorso ? `Anno ${alunno.annoCorso}` : 'Anno —'}
                  </span>
                  <span className="er-chip" style={{ fontFamily: 'var(--mono)' }}>
                    {alunno.matricola}
                  </span>
                  {media && (
                    <span className="er-chip er-chip--green">Media: {media}</span>
                  )}
                  <span className="er-status er-status--active">Attivo</span>
                </div>
              </div>
              <div className="er-profile-actions">
                <button
                  className="er-btn er-btn--ghost"
                  onClick={() => setIscrizioneModal(true)}
                >
                  <BookPlus size={15} strokeWidth={1.8} />
                  Iscrivi a materia
                </button>
              </div>
            </div>

            {/* Detail grid */}
            <div className="er-detail-grid">
              {/* Left column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                {/* Info anagrafiche */}
                <div className="er-card er-slide-up">
                  <div className="er-card-header">
                    <div>
                      <h2 className="er-card-title">Dati anagrafici</h2>
                      <p className="er-card-sub">Informazioni personali dello studente</p>
                    </div>
                  </div>
                  <div className="er-card-body" style={{ paddingTop: 0 }}>
                    <div className="er-info-grid">
                      {[
                        { label: 'Nome',            icon: null,     value: alunno.nome },
                        { label: 'Cognome',         icon: null,     value: alunno.cognome },
                        { label: 'Email',           icon: Mail,     value: alunno.email },
                        { label: 'Telefono',        icon: Phone,    value: alunno.telefono },
                        { label: 'Data di nascita', icon: Calendar, value: born },
                        { label: 'Luogo di nascita',icon: MapPin,   value: alunno.luogoNascita },
                        { label: 'Codice fiscale',  icon: CreditCard, value: alunno.codiceFiscale, mono: true },
                        { label: 'Anno di corso',   icon: GraduationCap, value: alunno.annoCorso ? `${alunno.annoCorso}° anno` : null },
                      ].map(({ label, value, mono }) => (
                        <div key={label} className="er-info-item">
                          <p className="er-info-label">{label}</p>
                          <p className={`er-info-value${mono ? ' er-info-value--mono' : ''}${!value ? ' er-info-value--empty' : ''}`}>
                            {value ?? '—'}
                          </p>
                        </div>
                      ))}
                    </div>

                    {(alunno.indirizzo || alunno.citta || alunno.cap) && (
                      <div style={{ marginTop: 12, padding: '12px 0 0' }}>
                        <p className="er-info-label" style={{ marginBottom: 6, display: 'flex', alignItems: 'center', gap: 5 }}>
                          <Home size={11} /> Indirizzo
                        </p>
                        <p className="er-info-value">
                          {[alunno.indirizzo, alunno.citta, alunno.cap].filter(Boolean).join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Esami */}
                <div className="er-card er-slide-up">
                  <div className="er-card-header">
                    <div>
                      <h2 className="er-card-title">Esami</h2>
                      <p className="er-card-sub">
                        {alunno.materie?.length
                          ? `${alunno.materie.length} materie iscritte · media ${media ?? '—'}`
                          : 'Nessuna materia iscritta'}
                      </p>
                    </div>
                    <button
                      className="er-btn er-btn--ghost er-btn--sm"
                      onClick={() => setIscrizioneModal(true)}
                    >
                      <BookPlus size={13} strokeWidth={2} />
                      Aggiungi
                    </button>
                  </div>

                  {!alunno.materie?.length ? (
                    <div className="er-empty-state" style={{ paddingTop: 32, paddingBottom: 32 }}>
                      <div className="er-empty-icon">
                        <GraduationCap size={22} strokeWidth={1.5} />
                      </div>
                      <p className="er-empty-title">Nessun esame</p>
                      <p className="er-empty-sub">Iscrivi lo studente a una materia per iniziare a tracciare i voti.</p>
                      <button className="er-btn er-btn--primary er-btn--sm" onClick={() => setIscrizioneModal(true)}>
                        <BookPlus size={13} strokeWidth={2} /> Iscrivi a materia
                      </button>
                    </div>
                  ) : (
                    <div className="er-table-wrap">
                      <table className="er-esami-table">
                        <thead>
                          <tr>
                            <th>Materia</th>
                            <th>Voto</th>
                            <th>Data</th>
                            <th style={{ width: 56 }}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {alunno.materie.map((m) => (
                            <tr key={m.nome ?? m.codice} className="er-esami-row">
                              <td style={{ fontWeight: 500, color: 'var(--ink)' }}>{m.nome}</td>
                              <td>
                                <span className={`er-voto-badge ${votoBadgeClass(m.voto)}`}>
                                  {m.voto ?? '—'}
                                </span>
                              </td>
                              <td style={{ color: 'var(--ink-3)', fontFamily: 'var(--mono)', fontSize: 12 }}>
                                {m.dataSostenimento
                                  ? new Date(m.dataSostenimento).toLocaleDateString('it-IT')
                                  : '—'}
                              </td>
                              <td>
                                <button
                                  className="er-btn er-btn--ghost er-btn--sm"
                                  onClick={() => setVotoModal({ materia: m })}
                                  title="Aggiorna voto"
                                >
                                  <Pencil size={12} strokeWidth={2} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              {/* Right column — riepilogo rapido */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div className="er-card er-slide-up">
                  <div className="er-card-header">
                    <div><h2 className="er-card-title">Riepilogo</h2></div>
                  </div>
                  <div className="er-card-body" style={{ paddingTop: 0 }}>
                    {[
                      { label: 'Matricola',     value: alunno.matricola ?? '—', mono: true },
                      { label: 'Materie iscritte', value: alunno.materie?.length ?? 0 },
                      { label: 'Esami superati',   value: (alunno.materie ?? []).filter((m) => m.voto != null).length },
                      { label: 'Media voti',        value: media ?? '—', mono: true },
                    ].map(({ label, value, mono }) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                        <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>{label}</span>
                        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', fontFamily: mono ? 'var(--mono)' : 'inherit' }}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="er-card er-slide-up">
                  <div className="er-card-header" style={{ marginBottom: 12 }}>
                    <div><h2 className="er-card-title">Azioni</h2></div>
                  </div>
                  <div className="er-actions-list">
                    <div className="er-action-item" onClick={() => setIscrizioneModal(true)}>
                      <div className="er-action-icon"><BookPlus size={14} strokeWidth={1.8} /></div>
                      <span className="er-action-label">Iscrivi a materia</span>
                      <span className="er-action-arrow">→</span>
                    </div>
                    <div className="er-action-item" style={{ cursor: 'not-allowed', opacity: .5 }}>
                      <div className="er-action-icon"><Trash2 size={14} strokeWidth={1.8} /></div>
                      <span className="er-action-label">Elimina profilo</span>
                      <span className="er-action-arrow">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Modals */}
      {votoModal && (
        <VotoModal
          alunno={alunno}
          materia={votoModal.materia}
          votoAttuale={votoModal.materia.voto}
          onClose={() => setVotoModal(null)}
          onSuccess={handleVotoSuccess}
        />
      )}
      {iscrizioneModal && (
        <IscrizioneModal
          alunno={alunno}
          materieIscritte={alunno.materie ?? []}
          onClose={() => setIscrizioneModal(false)}
          onSuccess={handleIscrizioneSuccess}
        />
      )}
    </div>
  );
}
