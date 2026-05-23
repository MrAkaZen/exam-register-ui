import React from 'react';

export default function StudentCard({ alunno, onClick }) {
  const born = alunno?.dataNascita
    ? new Date(alunno.dataNascita).toLocaleDateString('it-IT')
    : null;
  const enrolled = alunno?.dataIscrizione
    ? new Date(alunno.dataIscrizione).toLocaleDateString('it-IT')
    : null;

  const initials = `${(alunno?.nome || '?').charAt(0)}${(alunno?.cognome || '?').charAt(0)}`.toUpperCase();

  return (
    <div
      className="er-student-card student-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => { if (e.key === 'Enter') onClick && onClick(); }}
    >
      <div className="er-student-top">
        <div className="er-avatar">{initials}</div>
        <div className="er-student-info">
          <p className="er-student-name">{alunno?.nome} {alunno?.cognome}</p>
          <p className="er-student-email">{alunno?.email || 'Nessuna email'}</p>
        </div>
        <span className="er-matricola">{alunno?.matricola ?? '—'}</span>
      </div>

      <div className="er-student-meta">
        {alunno?.telefono && (
          <span className="er-chip">📞 {alunno.telefono}</span>
        )}
        {born && <span className="er-chip">🎂 {born}</span>}
        {enrolled && <span className="er-chip">🗓️ {enrolled}</span>}
        {alunno?.luogoNascita && (
          <span className="er-chip">📍 {alunno.luogoNascita}</span>
        )}
        {alunno?.annoCorso && (
          <span className="er-chip er-chip--accent">Anno {alunno.annoCorso}</span>
        )}
      </div>
    </div>
  );
}
