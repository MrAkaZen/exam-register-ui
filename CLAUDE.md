# CLAUDE.md — Exam Register UI

Questo file fornisce contesto sull'applicativo a Claude Code e ad altri agenti AI.

---

## Panoramica

**exam-register-ui** è una Single Page Application React che funge da frontend CRM per la gestione di studenti universitari e materie d'esame. Si integra con un backend Spring Boot esposto su `localhost:8080`.

- **Stack**: React 19, Vite 8, Tailwind CSS 4, Axios, React Router 7, React Hook Form + Yup
- **Lingua UI**: Italiano
- **Porta dev**: `3000` (proxy verso `8080`)

---

## Architettura

```
src/
├── api/
│   ├── axiosConfig.js          # Istanza Axios centralizzata, base URL /api/v1, interceptor errori
│   ├── alunnoApi.js            # CRUD studenti: getAll, getById, save, updateVoto, addMateria
│   └── materiaApi.js           # CRUD materie: getAll, getByNome, save
├── components/
│   ├── alunno/
│   │   ├── StudentCard.jsx     # Card profilo studente (avatar iniziali, chip info, matricola)
│   │   └── alunnoForm.jsx      # Form registrazione studente (react-hook-form + yup)
│   └── ui/
│       ├── Header.jsx          # Navbar sticky: brand, nav links, searchbar, notifiche
│       ├── Sidebar.jsx         # Sidebar desktop xl: nav links + insights panel
│       └── StatsCard.jsx       # Card metrica: icona, label, valore numerico, hint, trend
├── hooks/
│   └── useAlunni.js            # Custom hook: fetch lista alunni con loading/error state
├── pages/
│   ├── Dashboard.jsx           # / e /dashboard — stats, ultimi alunni, azioni rapide
│   ├── AlunniPage.jsx          # /alunni — tabella studenti + form inserimento
│   ├── MateriaPage.jsx         # /materie — placeholder (da implementare)
│   └── HomePage.jsx            # Re-export di Dashboard
├── App.jsx                     # BrowserRouter + Routes
├── main.jsx                    # Entry point React
└── index.css                   # CSS globale: design tokens + classi .er-* + Tailwind
```

---

## Routing

| Path         | Componente     | Descrizione                        |
|--------------|----------------|------------------------------------|
| `/`          | HomePage       | Alias di Dashboard                 |
| `/dashboard` | Dashboard      | Panoramica metriche e studenti     |
| `/alunni`    | AlunniPage     | Lista e inserimento studenti       |
| `/materie`   | MateriaPage    | Gestione materie (placeholder)     |

---

## API Backend

Base URL: `/api/v1` (proxied da Vite verso `http://localhost:8080`)

### Alunni — `alunnoApi`
| Metodo | Endpoint                                              | Descrizione               |
|--------|-------------------------------------------------------|---------------------------|
| GET    | `/alunni`                                             | Lista tutti gli studenti  |
| GET    | `/alunni/:matricola`                                  | Studente per matricola    |
| POST   | `/alunni`                                             | Crea nuovo studente       |
| PUT    | `/alunni/updateVoto/:matricola/:codiceMateria`        | Aggiorna voto             |
| POST   | `/alunni/:matricola/materie/:nomeMateria`             | Iscrive studente a materia|

### Materie — `materiaApi`
| Metodo | Endpoint          | Descrizione          |
|--------|-------------------|----------------------|
| GET    | `/materie`        | Lista tutte le materie |
| GET    | `/materie/:nome`  | Materia per nome     |
| POST   | `/materie`        | Crea nuova materia   |

### DTO Studente
```js
{
  nome, cognome, email, password,   // obbligatori
  telefono,                          // 10 cifre
  dataNascita,                       // Date, passato
  luogoNascita, codiceFiscale,       // CF: 16 caratteri [A-Z0-9]
  indirizzo, cap, citta,             // CAP: 5 cifre
  annoCorso,                         // int 1–10
  matricola                          // assegnata dal backend
}
```

---

## Design System

Il CSS usa classi prefissate `.er-*` definite in `src/index.css`. **Non usare classi Tailwind custom** per i componenti principali — estendere invece il sistema `.er-*`.

### Token principali
```css
--blue:      #1B4FFF   /* accento primario */
--ink:       #0D0E14   /* testo principale */
--ink-3:     #6B6F82   /* testo secondario */
--surface:   #FFFFFF   /* card background */
--surface-2: #F7F7F9   /* app background */
--border:    #E4E4EC   /* bordi standard */
--font:      'DM Sans', system-ui
--mono:      'DM Mono', ui-monospace
```

### Pattern componenti
- **Card**: `<div className="er-card">` — bg bianco, bordo sottile, border-radius 14px
- **Bottone primario**: `<button className="er-btn er-btn--primary">` — bg `--blue`, testo bianco
- **Bottone ghost**: `<button className="er-btn er-btn--ghost">` — bordo, bg trasparente
- **Status badge**: `<span className="er-status er-status--active">` — verde per attivo
- **Avatar**: `<div className="er-avatar">` — iniziali su bg `--blue-dim`
- **Chip**: `<span className="er-chip">` / `er-chip--accent` per variante blu

---

## Validazione Form (Yup)

Schema `alunnoForm.jsx`:
- `nome`, `cognome`: min 2 caratteri, required
- `email`: formato email valido, required
- `password`: min 8 caratteri, required
- `telefono`: regex `/^\d{10}$/`, opzionale
- `codiceFiscale`: regex `/^[A-Z0-9]{16}$/`, opzionale
- `cap`: regex `/^\d{5}$/`, opzionale
- `dataNascita`: `max(new Date())`, opzionale
- `annoCorso`: intero 1–10, opzionale

---

## Comandi

```bash
npm run dev       # Avvia dev server su http://localhost:3000
npm run build     # Build produzione → dist/
npm run lint      # ESLint
npm run preview   # Preview build produzione
```

### Prerequisiti
- Node.js ≥ 20, npm ≥ 9
- Spring Boot avviato su `localhost:8080`

---

## Configurazione

### Vite proxy (`vite.config.js`)
Tutte le chiamate `/api/*` vengono proxate a `http://localhost:8080` — nessun problema CORS in sviluppo.

### Variabili d'ambiente (`.env`)
```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_APP_NAME=Exam Register
```
Le variabili devono iniziare con `VITE_` per essere esposte al client.

---

## Stato implementazione

| Funzionalità               | Stato         |
|----------------------------|---------------|
| Lista studenti             | ✅ Completo   |
| Inserimento studente       | ✅ Completo   |
| Dashboard metriche         | ✅ Completo   |
| Ricerca studenti           | ✅ Completo   |
| Gestione materie           | ⚠️ Placeholder |
| Aggiornamento voto         | ⚠️ API pronta, UI mancante |
| Iscrizione studente a materia | ⚠️ API pronta, UI mancante |
| Dettaglio singolo studente | ❌ Da implementare |
| Autenticazione             | ❌ Da implementare |
| Dark mode                  | ❌ Rimossa nel redesign |

---

## Note per lo sviluppo

- Il componente `Sidebar.jsx` è visibile solo su schermi `xl` (≥1280px). Su mobile la navigazione è nell'`Header`.
- `alunnoApi.js` usa `matricola` come chiave primaria; in assenza usa `email` come fallback per le `key` React.
- Il campo `password` viene inviato in chiaro al backend — implementare hashing lato server o HTTPS prima del deploy.
- `MateriaPage.jsx` è un placeholder: va implementato seguendo il pattern di `AlunniPage.jsx`.
- Per aggiungere una nuova pagina: creare il componente in `src/pages/`, aggiungere la route in `App.jsx`, aggiungere il link in `Header.jsx` e `Sidebar.jsx`.
