import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import { Activity, BarChart3, Users, ArrowRight, TrendingUp } from 'lucide-react';
import Header from '../components/ui/Header';
import { alunnoApi } from "../api/alunnoApi";

import { useNavigate } from 'react-router-dom';

export default function AlunnoDetail() {
    const [searchParams] = useSearchParams();
    const matricola = searchParams.get('matricola');
    const navigate = useNavigate();

    const [alunno, setAlunno] = useState(null);

    useEffect(() => {
        if (!matricola) return;

        const fetch = async () => {
            try {
                const res = await alunnoApi.getAlunnoById(matricola);
                setAlunno(res.data);
            } catch (e) {
                console.error(e);
            }
        };

        fetch();

    }, [matricola]);

    return (
        <div className="er-app">
            <Header />
            <main className="er-main">
                <div className="er-page-header">
                    <div>
                        <p className="er-eyebrow">Studenti</p>
                        <h1 className="er-page-title">{alunno ? `${alunno.nome} ${alunno.cognome}` : 'Profilo studente'}</h1>
                    </div>
                    <div className="er-date-badge">
                        <span className="er-date-label">Matricola</span>
                        <span className="er-date-value">{matricola ?? '—'}</span>
                    </div>
                </div>

                <div className="er-content-grid">
                    <section className="er-card er-card--main">
                        <div className="er-card-header">
                            <div>
                                <h2 className="er-card-title">Dettagli</h2>
                                <p className="er-card-sub">Informazioni anagrafiche e contatti</p>
                            </div>
                            <div className="er-card-actions">
                                <button className="er-btn er-btn--ghost" onClick={() => navigate('/alunni')}>Indietro</button>
                            </div>
                        </div>

                        <div className="er-card-body">
                            {!matricola && <p className="er-empty">Matricola non specificata nella query.</p>}
                            {!alunno && matricola && <p className="er-empty">Caricamento...</p>}

                            {alunno && (
                                <div className="er-grid er-grid--2cols">
                                    <div>
                                        <div className="er-student-panel">
                                            <div className="er-avatar-large">{`${(alunno.nome||'?').charAt(0)}${(alunno.cognome||'?').charAt(0)}`.toUpperCase()}</div>
                                            <h3 className="er-student-name-large">{alunno.nome} {alunno.cognome}</h3>
                                            <p className="er-muted">{alunno.email || 'Nessuna email'}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p><strong>Matricola:</strong> {alunno.matricola}</p>
                                        <p><strong>Telefono:</strong> {alunno.telefono ?? '—'}</p>
                                        <p><strong>Data di nascita:</strong> {alunno.dataNascita ? new Date(alunno.dataNascita).toLocaleDateString('it-IT') : '—'}</p>
                                        <p><strong>Luogo di nascita:</strong> {alunno.luogoNascita ?? '—'}</p>
                                        <p><strong>Anno corso:</strong> {alunno.annoCorso ?? '—'}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    <aside className="er-sidebar-panel">
                        <div className="er-card er-card--actions">
                            <h2 className="er-card-title">Azioni rapide</h2>
                            <div className="er-actions-list">
                                {[{ label: 'Modifica profilo', icon: Users, to: `/alunni` }, { label: 'Gestisci materie', icon: BarChart3, to: '/materie' }, { label: 'Report attività', icon: Activity, to: '/dashboard' }].map(({ label, icon: Icon, to }) => (
                                    <a key={label} href={to} className="er-action-item">
                                        <div className="er-action-icon"><Icon size={16} strokeWidth={1.6} /></div>
                                        <span className="er-action-label">{label}</span>
                                        <ArrowRight size={14} strokeWidth={1.6} className="er-action-arrow" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="er-card er-card--activity">
                            <h2 className="er-card-title">Attività recente</h2>
                            <div className="er-activity-list">
                                {[{ text: 'Profilo visualizzato', time: 'adesso', dot: 'blue' }, { text: 'Voto aggiornato', time: 'ieri', dot: 'green' }].map((item, i) => (
                                    <div key={i} className="er-activity-item">
                                        <div className={`er-activity-dot er-activity-dot--${item.dot}`} />
                                        <div className="er-activity-content">
                                            <p className="er-activity-text">{item.text}</p>
                                            <p className="er-activity-time">{item.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}