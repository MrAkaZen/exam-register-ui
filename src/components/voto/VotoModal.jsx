import { useState } from 'react';
import { X, Save } from 'lucide-react';
import { alunnoApi } from '../../api/alunnoApi';

export default function VotoModal({ alunno, materia, votoAttuale, onClose, onSuccess }) {
  const [voto, setVoto]       = useState(votoAttuale ?? '');
  const [data, setData]       = useState(() => new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const v = parseInt(voto, 10);
    if (isNaN(v) || v < 18 || v > 30) {
      setError('Il voto deve essere compreso tra 18 e 30.');
      return;
    }
    if (!data) { setError('Inserisci la data di sostenimento.'); return; }

    setLoading(true);
    setError(null);
    try {
      await alunnoApi.updateVoto(alunno.matricola, materia.codice ?? materia.nome, v, data);
      onSuccess?.({ materia, voto: v, data });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message ?? 'Errore durante l\'aggiornamento del voto.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="er-modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="er-modal" role="dialog" aria-modal="true" aria-labelledby="voto-modal-title">
        <div className="er-modal-header">
          <div>
            <p className="er-modal-title" id="voto-modal-title">Aggiorna voto</p>
            <p className="er-modal-sub">
              {alunno.nome} {alunno.cognome} — {materia.nome}
            </p>
          </div>
          <button className="er-modal-close" onClick={onClose} aria-label="Chiudi">
            <X size={15} strokeWidth={2} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="er-modal-body">
            <div className="er-form">
              {error && <div className="er-alert er-alert--error">{error}</div>}

              <div className="er-form-row er-form-row--2">
                <div className="er-field">
                  <label className="er-label" htmlFor="voto-input">Voto (18–30)</label>
                  <input
                    id="voto-input"
                    type="number"
                    min={18}
                    max={30}
                    className={`er-input${error && (voto < 18 || voto > 30) ? ' er-input--error' : ''}`}
                    placeholder="Es. 28"
                    value={voto}
                    onChange={(e) => setVoto(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="er-field">
                  <label className="er-label" htmlFor="data-input">Data sostenimento</label>
                  <input
                    id="data-input"
                    type="date"
                    className="er-input"
                    value={data}
                    max={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setData(e.target.value)}
                  />
                </div>
              </div>

              {votoAttuale != null && (
                <p className="er-hint">
                  Voto attuale: <strong style={{ fontFamily: 'var(--mono)' }}>{votoAttuale}</strong>
                </p>
              )}
            </div>
          </div>

          <div className="er-modal-footer">
            <button type="button" className="er-btn er-btn--ghost" onClick={onClose}>
              Annulla
            </button>
            <button type="submit" className="er-btn er-btn--primary" disabled={loading}>
              <Save size={14} strokeWidth={2} />
              {loading ? 'Salvataggio…' : 'Salva voto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
