import Header from '../components/ui/Header';
import Sidebar from '../components/ui/Sidebar';
import { BookOpen, PlusCircle, Clock, Users } from 'lucide-react';

const mockMaterie = [
  { id: 1, nome: 'Analisi Matematica I',    crediti: 9, studenti: 87, ore: 72, colore: '#2563eb' },
  { id: 2, nome: 'Fisica I',               crediti: 6, studenti: 65, ore: 54, colore: '#7c3aed' },
  { id: 3, nome: 'Programmazione',          crediti: 9, studenti: 112, ore: 72, colore: '#0891b2' },
  { id: 4, nome: 'Algebra Lineare',         crediti: 6, studenti: 78, ore: 48, colore: '#6d28d9' },
  { id: 5, nome: 'Basi di Dati',            crediti: 9, studenti: 94, ore: 72, colore: '#1d4ed8' },
  { id: 6, nome: 'Sistemi Operativi',       crediti: 6, studenti: 71, ore: 54, colore: '#0369a1' },
];

export default function Materia() {
  return (
    <div className="er-shell">
      <Sidebar />
      <div className="er-main">
        <Header title="Materie" subtitle="Corsi accademici attivi" />

        <div className="er-content">
          {/* Header bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22, gap: 14 }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-h)' }}>
                {mockMaterie.length} materie attive
              </h3>
              <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Anno accademico 2024–2025</p>
            </div>
            <button className="er-btn er-btn-primary" style={{ gap: 6, fontSize: 13 }}>
              <PlusCircle size={13} /> Nuova materia
            </button>
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {mockMaterie.map((m, i) => (
              <div key={m.id} className="er-card anim-fade-up" style={{ padding: '20px 22px', animationDelay: `${i * .07}s`, cursor: 'pointer' }}>
                {/* Icon header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${m.colore}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: m.colore }}>
                    <BookOpen size={20} strokeWidth={1.8} />
                  </div>
                  <span style={{ background: 'var(--accent-glow)', color: 'var(--accent)', padding: '3px 9px', borderRadius: 99, fontSize: 12, fontWeight: 700 }}>
                    {m.crediti} CFU
                  </span>
                </div>

                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--text-h)', marginBottom: 14 }}>{m.nome}</h4>

                <div style={{ display: 'flex', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12.5, color: 'var(--text-muted)' }}>
                    <Users size={12} /> {m.studenti} iscritti
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12.5, color: 'var(--text-muted)' }}>
                    <Clock size={12} /> {m.ore}h
                  </div>
                </div>

                <div className="er-progress" style={{ marginTop: 16 }}>
                  <div className="er-progress-fill" style={{ width: `${(m.studenti / 120) * 100}%`, background: `linear-gradient(90deg, ${m.colore}, ${m.colore}aa)` }} />
                </div>
                <div style={{ marginTop: 5, fontSize: 11, color: 'var(--text-muted)' }}>
                  {Math.round((m.studenti / 120) * 100)}% capienza
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
