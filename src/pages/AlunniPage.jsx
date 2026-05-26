import { useEffect, useState } from 'react';
import { Plus, Search, Filter, ChevronDown } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import Header from '../components/ui/Header';
import AlunnoForm from '../components/alunno/alunnoForm';
import StatsCard from '../components/ui/StatsCard';
import { alunnoApi } from '../api/alunnoApi';
import {
  Users,
  UserPlus,
  CalendarDays,
  TrendingUp,
  TrendingDown,
  Activity,
  UserX,
  Wifi
} from "lucide-react";

export default function AlunniPage() {

  // =========================
  // STATE
  // =========================
  const [alunni, setAlunni] = useState([]);
  const [stats, setStats] = useState(null);

  const [loadingAlunni, setLoadingAlunni] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);

  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [filtersApplied, setFiltersApplied] = useState(false);

  const [filterData, setFilterData] = useState({
    nomeCompleto: "",
    email: "",
    telefono: "",
    codiceFiscale: "",
    indirizzo: "",
    cap: "",
    citta: "",
    annoCorso: "",
    dataIscrizione: "",
  });

  const statsConfig = (stats) => [
    {
      label: "Nuovi oggi",
      value: stats.newProfilesToday,
      icon: UserPlus,
    },
    {
      label: "Ultimi 7 giorni",
      value: stats.newProfilesLast7Days,
      icon: CalendarDays,
    },
    {
      label: "Mese corrente",
      value: stats.currentMonthProfiles,
      icon: TrendingUp,
    },
    {
      label: "Mese precedente",
      value: stats.previousMonthProfiles,
      icon: TrendingDown,
    },
    {
      label: "Crescita",
      value: `${stats.profileGrowth ?? 0}`,
      icon: Activity,
    },
    {
      label: "Attivi 30gg",
      value: stats.activeUsers30Days,
      icon: Users,
    },
    {
      label: "Inattivi 90gg",
      value: stats.inactiveUsers90Days,
      icon: UserX,
    },
    {
      label: "Online",
      value: stats.onlineUsers,
      icon: Wifi,
    },
  ];
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    async function loadAlunni() {
      try {
        setLoadingAlunni(true);

        const resp = await alunnoApi.getAll();

        if (mounted) {
          setAlunni(Array.isArray(resp.data) ? resp.data : []);
        }

      } catch (e) {
        console.error(e);
        if (mounted) setError("Errore caricamento alunni");
      } finally {
        if (mounted) setLoadingAlunni(false);
      }
    }

    loadAlunni();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadStats() {
      try {
        setLoadingStats(true);

        const resp = await alunnoApi.getAlunniStats();

        if (mounted) {
          setStats(resp.data);
        }

      } catch (e) {
        console.error(e);
        if (mounted) setError("Errore caricamento statistiche");
      } finally {
        if (mounted) setLoadingStats(false);
      }
    }

    loadStats();

    return () => {
      mounted = false;
    };
  }, []);

  if (loadingAlunni || loadingStats) {
    return (
      <div className="p-6 text-gray-600">
        Caricamento dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        {error}
      </div>
    );
  }

  const cleanEmptyFields = (data) => {
    const cleaned = { ...data };
    Object.keys(cleaned).forEach((key) => {
      if (!cleaned[key]) delete cleaned[key];
    });
    return cleaned;
  };

  const handleApplyFilters = async () => {
    try {
      setLoadingAlunni(true);

      const cleaned = cleanEmptyFields(filterData);
      const resp = await alunnoApi.getFilteredWithBody(cleaned, page, size);

      setAlunni(Array.isArray(resp.data) ? resp.data : []);
      setFiltersApplied(true);
      setShowFilters(false);

    } catch (e) {
      console.error(e);
      setError("Errore filtri");
    } finally {
      setLoadingAlunni(false);
    }
  };

  const handleResetFilters = async () => {
    try {
      setLoadingAlunni(true);

      const resp = await alunnoApi.getAll(0, 30);

      setAlunni(Array.isArray(resp.data) ? resp.data : []);
      setFiltersApplied(false);
      setFilterData({
        nomeCompleto: "",
        email: "",
        telefono: "",
        codiceFiscale: "",
        indirizzo: "",
        cap: "",
        citta: "",
        annoCorso: "",
        dataIscrizione: "",
      });

    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAlunni(false);
    }
  };

  const handleStudentClick = async (matricola) => {
    try {
      const response = await axios.get(
        `/alunno/alunnobyId/${matricola}`
      );
      console.log("Alunno:", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (newAlunno) => {
    try {
      const resp = await alunnoApi.createAlunno(newAlunno);

      const created = resp.data;

      setAlunni((prev) => [created, ...prev]);
      setShowForm(false);

    } catch (error) {
      console.error("Errore creazione studente:", error);
      setError("Errore durante la creazione dello studente");
    }
  };

  const formatValue = (value) => {
    if (value === null || value === undefined || isNaN(value)) {
      return { text: "—", color: "gray" };
    }

    const num = Number(value);

    if (num > 0) {
      return { text: `+${num}`, color: "green" };
    }

    if (num < 0) {
      return { text: `${num}`, color: "red" };
    }

    return { text: "0", color: "gray" };
  };

  const formatTrend = (value) => {
    const num = Number(value);

    if (isNaN(num) || num === 0) {
      return {
        dir: "flat",
        label: "0 questo mese",
      };
    }

    if (num > 0) {
      return {
        dir: "up",
        label: `+${num} questo mese`,
      };
    }

    return {
      dir: "down",
      label: `${num} questo mese`,
    };
  };

  return (
    <div className="er-app">
      <Header />
      <main className="er-main">
        <div className="er-page-header">
          <div>
            <p className="er-eyebrow">Anagrafica</p>
            <h1 className="er-page-title">Studenti</h1>
          </div>
          <button
            className="er-btn er-btn--primary"
            onClick={() => setShowForm((v) => !v)}
          >
            <Plus size={16} strokeWidth={2} />
            {showForm ? 'Annulla' : 'Nuovo studente'}
          </button>
        </div>

        <div className="er-stats-grid">
          {stats &&
            Object.keys(stats).length > 0 &&
            statsConfig(stats).map((s, idx) => {
              const formatted = formatValue(s.value);
              const trend = formatTrend(s.value);

              return (
                <StatsCard
                  key={idx}
                  icon={s.icon}
                  label={s.label}
                  value={
                    <span style={{ color: formatted.color }}>
                      {formatted.text}
                    </span>
                  }
                  hint=""
                  trend={trend}
                />
              );
            })}
        </div>

        {showForm && (
          <div className="er-card er-card--form er-fade-in">
            <div className="er-card-header">
              <div>
                <h2 className="er-card-title">Nuovo profilo studente</h2>
                <p className="er-card-sub">Compila i campi per aggiungere uno studente al sistema</p>
              </div>
            </div>
            <AlunnoForm onSuccess={handleAdd} />
          </div>
        )}

        <div className="er-card">
          <div className="er-table-toolbar">
            <div className="er-search er-search--table">
              <Search size={14} strokeWidth={1.8} className="er-search-icon" />
              <input
                className="er-search-input"
                placeholder="Cerca per nome o email…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              className="er-btn er-btn--ghost"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={14} strokeWidth={1.8} />
              Filtri
              <ChevronDown size={12} strokeWidth={2} />
            </button>
            {filtersApplied && (
              <button
                className="er-btn er-btn--ghost"
                onClick={handleResetFilters}
                style={{ color: 'var(--blue)' }}
              >
                ✕ Cancella filtri
              </button>
            )}
            <span className="er-table-count">
              {loadingAlunni ? '…' : `${alunni.length} studenti`}
            </span>
          </div>

          {showFilters && (
            <div className="er-filters-panel er-fade-in" style={{ padding: '16px', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface-2)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={filterData.nomeCompleto}
                  onChange={(e) => setFilterData({ ...filterData, nomeCompleto: e.target.value })}
                  className="er-input"
                  style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px' }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={filterData.email}
                  onChange={(e) => setFilterData({ ...filterData, email: e.target.value })}
                  className="er-input"
                  style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px' }}
                />
                <input
                  type="tel"
                  placeholder="Telefono"
                  value={filterData.telefono}
                  onChange={(e) => setFilterData({ ...filterData, telefono: e.target.value })}
                  className="er-input"
                  style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px' }}
                />
                <input
                  type="text"
                  placeholder="Codice Fiscale"
                  value={filterData.codiceFiscale}
                  onChange={(e) => setFilterData({ ...filterData, codiceFiscale: e.target.value })}
                  className="er-input"
                  style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px' }}
                />
                <input
                  type="text"
                  placeholder="Indirizzo"
                  value={filterData.indirizzo}
                  onChange={(e) => setFilterData({ ...filterData, indirizzo: e.target.value })}
                  className="er-input"
                  style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px' }}
                />
                <input
                  type="text"
                  placeholder="CAP"
                  value={filterData.cap}
                  onChange={(e) => setFilterData({ ...filterData, cap: e.target.value })}
                  className="er-input"
                  style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px' }}
                />
                <input
                  type="text"
                  placeholder="Città"
                  value={filterData.citta}
                  onChange={(e) => setFilterData({ ...filterData, citta: e.target.value })}
                  className="er-input"
                  style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px' }}
                />
                <select
                  value={filterData.annoCorso}
                  onChange={(e) => setFilterData({ ...filterData, annoCorso: e.target.value })}
                  className="er-input"
                  style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px' }}
                >
                  <option value="">Anno Corso</option>
                  <option value="PRIMO">PRIMO</option>
                  <option value="SECONDO">SECONDO</option>
                  <option value="TERZO">TERZO</option>
                </select>
                <input
                  type="date"
                  value={filterData.dataIscrizione}
                  onChange={(e) => setFilterData({ ...filterData, dataIscrizione: e.target.value })}
                  className="er-input"
                  style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button
                  className="er-btn er-btn--ghost"
                  onClick={handleResetFilters}
                >
                  ✕ Ripristina
                </button>
                <button
                  className="er-btn er-btn--primary"
                  onClick={handleApplyFilters}
                  disabled={loading}
                >
                  Applica filtri
                </button>
              </div>
            </div>
          )}

          <div className="er-table-wrap">
            <table className="er-table">
              <thead>
                <tr>
                  <th>Studente</th>
                  <th>Email</th>
                  <th>Anno</th>
                  <th>Città</th>
                  <th>Stato</th>
                  <th>Dettagli</th>
                </tr>
              </thead>
              <tbody>
                {loadingAlunni && (
                  <tr>
                    <td colSpan={6} className="er-table-empty">Caricamento...</td>
                  </tr>
                )}
                {!loadingAlunni && alunni.length === 0 && (
                  <tr>
                    <td colSpan={6} className="er-table-empty">
                      {search ? 'Nessun risultato.' : 'Nessun alunno disponibile.'}
                    </td>
                  </tr>
                )}
                {!loadingAlunni && alunni.map((a) => (
                  <tr key={a.matricola ?? a.email} className="er-table-row">
                    <td>
                      <div className="er-table-student">
                        <div className="er-avatar er-avatar--sm">
                          {(a.nome || '?').charAt(0)}{(a.cognome || '?').charAt(0)}
                        </div>
                        <div>
                          <p className="er-table-name">{a.nome} {a.cognome}</p>
                          <p className="er-table-mat">{a.matricola ?? '—'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="er-table-muted">{a.email || '—'}</td>
                    <td className="er-table-muted">{a.annoCorso || '—'}</td>
                    <td className="er-table-muted">{a.citta || '—'}</td>
                    <td>
                      <span className="er-status er-status--active">Attivo</span>
                    </td>
                    <td>
                      <button className="er-btn er-btn--ghost er-btn--icon"
                        onClick={(e) => { e.stopPropagation(); navigate(`/alunni/alunno?matricola=${a.matricola}`); }}>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
