export default function Professori() {

    return (
        <div className="er-shell">
            <Sidebar />
            <div className="er-main">
                <Header title="Professori" subtitle="Gestione anagrafica docenti" />
                <div className="er-content">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22, gap: 14, flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                            <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--text-title)' }}>Elenco professori</h2>
                        </div>
                    </div>
                    <p>Questa pagina è in costruzione.</p>
                </div>
            </div>
        </div>
    );
}