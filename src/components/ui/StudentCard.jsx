export default function StudentCard({ alunno, delay = 0 }) {
  const born = alunno.dataNascita
    ? new Date(alunno.dataNascita).toLocaleDateString('it-IT')
    : null;

  const initials = `${(alunno.nome || '?').charAt(0)}${(alunno.cognome || '?').charAt(0)}`;

  const gradients = [
    'linear-gradient(135deg, #2563eb, #0ea5e9)',
    'linear-gradient(135deg, #7c3aed, #3b82f6)',
    'linear-gradient(135deg, #0891b2, #2563eb)',
    'linear-gradient(135deg, #6d28d9, #0ea5e9)',
    'linear-gradient(135deg, #1d4ed8, #7c3aed)',
  ];
  const grad = gradients[(alunno.matricola || 0) % gradients.length];

  return (
    <div className="er-card anim-fade-up" style={{ padding: '14px 16px', animationDelay: `${delay}s`, display: 'flex', alignItems: 'center', gap: 14 }}>
      {/* Avatar */}
      <div style={{
        width: 40, height: 40, borderRadius: 10, flexShrink: 0,
        background: grad, display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13,
      }}>{initials}</div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 13.5, color: 'var(--text-h)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {alunno.nome} {alunno.cognome}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 1 }}>{alunno.email || 'Nessuna email'}</div>
      </div>

      {/* Meta */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
        <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--text-muted)', fontFamily: 'var(--font-display)' }}>
          #{alunno.matricola ?? '—'}
        </span>
        {alunno.annoCorso && (
          <span className="badge-accent" style={{ fontSize: 11, padding: '2px 7px', borderRadius: 99, fontWeight: 600 }}>
            Anno {alunno.annoCorso}
          </span>
        )}
      </div>
    </div>
  );
}
