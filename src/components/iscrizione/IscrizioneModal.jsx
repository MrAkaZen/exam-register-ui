import { useEffect, useState } from 'react';
import { X, BookPlus } from 'lucide-react';
import { alunnoApi } from '../../api/alunnoApi';
import { materiaApi } from '../../api/materiaApi';

export default function IscrizioneModal({ alunno, materieIscritte = [], onClose, onSuccess }) {
  const [materie, setMaterie]   = useState([]);
  const [selected, setSelected] = useState('');
  const [loading, setLoading]   = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    materiaApi.getAll()
      .then((r) => {
        const iscritteNomi = materieIscritte.map((m) => m.nome ?? m);
        setMaterie((Array.isArray(r.data) ? r.data : []).filter(
          (m) => !iscritteNomi.includes(m.nome)
        ));
      })
      .catch(() => setError('Impossibile caricare le materie.'))
      .finally(() => setFetching(false));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selected) { setError('Seleziona una materia.'); return; }
    setLoading(true);
    setError(null);
    try {
      await alunnoApi.addMateria(alunno.matricola, selected);
      onSuccess?.(selected);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message ?? 'Errore durante l\'iscrizione.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="er-modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="er-modal" role="dialog" aria-modal="true" aria-labelledby="iscr-modal-title">
        <div className="er-modal-header">
          <div>
            <p className="er-modal-title" id="iscr-modal-title">Iscrivi a materia</p>
            <p className="er-modal-sub">{alunno.nome} {alunno.cognome}</p>
          </div>
          <button className="er-modal-close" onClick={onClose} aria-label="Chiudi">
            <X size={15} strokeWidth={2} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="er-modal-body">
            <div className="er-form">
              {error && <div className="er-alert er-alert--error">{error}</div>}

              <div className="er-field">
                <label className="er-label" htmlFor="materia-select">Materia</label>
                {fetching ? (
                  <p className="er-hint">Caricamento materie…</p>
                ) : materie.length === 0 ? (
                  <div className="er-alert er-alert--info">
                    Lo studente è già iscritto a tutte le materie disponibili.
                  </div>
                ) : (
                  <select
                    id="materia-select"
                    className="er-select"
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                    autoFocus
                  >
                    <option value="">— Seleziona una materia —</option>
                    {materie.map((m) => (
                      <option key={m.nome} value={m.nome}>{m.nome}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>

          <div className="er-modal-footer">
            <button type="button" className="er-btn er-btn--ghost" onClick={onClose}>
              Annulla
            </button>
            <button
              type="submit"
              className="er-btn er-btn--primary"
              disabled={loading || fetching || materie.length === 0}
            >
              <BookPlus size={14} strokeWidth={2} />
              {loading ? 'Iscrizione…' : 'Iscrivi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}