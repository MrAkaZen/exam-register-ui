# CLAUDE.md — Memoria del progetto `exam-register-ui`

Questo file serve a mantenere il contesto del progetto tra sessioni diverse. Aggiornalo (in particolare la sezione **Changelog** in fondo) ogni volta che vengono fatte modifiche rilevanti.

## 1. Cos'è il progetto

`exam-register-ui` è il **frontend React** di un'applicazione CRM-style per la gestione di studenti ("alunni") e materie scolastiche, in stile registro elettronico. Si appoggia a un backend **Spring Boot** (Java) esposto su `localhost:8080`.

- Lingua UI: italiano
- Tema visivo: **dark fisso** (nessun toggle light/dark) — sfondo `bg-slate-950`, testo `text-slate-100`, accenti indigo/violet/emerald, card arrotondate (`rounded-[24px]`/`[28px]`/`[32px]`), glassmorphism leggero (`backdrop-blur-xl`)
- Tipo di app: dashboard interna / gestionale, non un sito pubblico

## 2. Stack tecnico

| Livello | Tecnologia |
|---|---|
| Build tool | Vite 8 |
| Framework | React 19 (function components + hooks, no TypeScript) |
| Routing | react-router-dom 7 (`BrowserRouter`) |
| Styling | Tailwind CSS 4 (via `@tailwindcss/postcss`) + CSS custom properties in `src/index.css` |
| HTTP client | axios, istanza centralizzata in `src/api/axiosConfig.js` |
| Form | react-hook-form + yup (via `@hookform/resolvers`) |
| Icone | lucide-react |
| UI kit extra | @mui/material + @emotion (presente in `package.json` ma **non ancora usato** nel codice attuale — verificare se serve davvero prima di aggiungere altre dipendenze) |
| Lint | ESLint 10 flat config (`eslint.config.js`) |

## 3. Backend / API

- Base URL: `/api/v1` in dev, proxato da Vite verso `http://localhost:8080` (vedi `vite.config.js`, sezione `server.proxy['/api']`)
- Variabili d'ambiente in `.env`:
  - `VITE_API_BASE_URL=http://localhost:8080/api/v1`
  - `VITE_APP_NAME=Exam Register`
- Endpoint noti (via `src/api/alunnoApi.js` e `src/api/materiaApi.js`):
  - `GET /alunni` — lista alunni
  - `GET /alunni/{matricola}` — dettaglio alunno
  - `POST /alunni` — crea alunno
  - `PUT /alunni/updateVoto/{matricola}/{codiceMateria}?voto=&dataSostenimento=` — aggiorna voto
  - `POST /alunni/{matricola}/materie/{nomeMateria}` — iscrive alunno a materia
  - `GET /materie` — lista materie
  - `GET /materie/{nome}` — dettaglio materia
  - `POST /materie` — crea materia
- Gli errori HTTP vengono normalizzati nell'interceptor di `axiosConfig.js` (log su console, non ancora surfaced come toast/notifica UI — possibile miglioramento futuro).

## 4. Struttura cartelle

```
src/
├── api/                  # client axios + funzioni per endpoint (alunnoApi, materiaApi)
├── hooks/                # custom hook (useAlunni)
├── components/
│   ├── ui/                # componenti UI generici (Header, Sidebar, StatsCard)
│   ├── alunno/             # componenti legati agli alunni (AlunnoForm, StudentCard)
│   └── materia/            # (cartella creata da setup.js, al momento vuota)
├── pages/                # una pagina per route (HomePage, Dashboard, AlunniPage, MateriaPage)
├── App.jsx               # definizione delle route
├── main.jsx              # entry point
└── index.css             # variabili CSS + Tailwind directives
```

## 5. Routing (`src/App.jsx`)

| Path | Componente |
|---|---|
| `/` | `HomePage` (renderizza `Dashboard`) |
| `/dashboard` | `Dashboard` |
| `/alunni` | `AlunniPage` |
| `/materie` | `MateriaPage` |

La `Sidebar` (`src/components/ui/Sidebar.jsx`) contiene i link di navigazione principali e va tenuta sincronizzata con `App.jsx` se si aggiungono nuove route.

## 6. Convenzioni adottate

- **Layout pagina standard**: `min-h-screen bg-slate-950 text-slate-100` → `Header` → `div.max-w-7xl.mx-auto.px-4.py-10.grid.gap-8.xl:grid-cols-[280px_1fr]` con `Sidebar` + `main`. Tutte le pagine (`Dashboard`, `AlunniPage`, `MateriaPage`) seguono questo schema per coerenza visiva.
- **Palette dark ricorrente** (da riusare in ogni nuovo componente, evitando `dark:` variants che non scattano mai perché l'app non ha toggle di tema):
  - contenitori "esterni"/sezione: `bg-slate-900/80` – `bg-slate-900/90`
  - contenitori "annidati" dentro un contenitore già scuro: `bg-slate-950/60` – `bg-slate-950/80`
  - testo primario: `text-white` / `text-slate-100`
  - testo secondario: `text-slate-400`
  - bordi: `border-white/10` (esterni) o `border-white/5` (annidati)
  - accenti icone/badge: `bg-{colore}-500/15 text-{colore}-300` (es. `bg-indigo-500/15 text-indigo-300`)
- **Fetch dati**: usare l'hook `useAlunni()` (in `src/hooks/useAlunni.js`) per ottenere `{ alunni, setAlunni, loading, error }` invece di duplicare `useEffect` + `useState` in ogni pagina. `setAlunni` è esposto per permettere update ottimistici (es. dopo una POST di creazione).
- **Nomi file dei componenti**: PascalCase (es. `AlunnoForm.jsx`, non `alunnoForm.jsx`), per coerenza con il nome del componente esportato e per evitare problemi su filesystem case-sensitive (Linux/CI) diversi da Windows.
- **Guardie sui dati API**: quando si assegna `res.data` a uno state che verrà mappato/filtrato, avvolgere sempre con `Array.isArray(res.data) ? res.data : []` per evitare crash se il backend risponde con un oggetto di errore invece di un array.

## 7. Cose da tenere d'occhio / possibili miglioramenti futuri

- `@mui/material` + `@emotion/*` sono nel `package.json` ma non risultano usati nel codice: valutare se rimuoverli (riduce bundle) o se è prevista una migrazione di alcuni componenti a MUI.
- Gli errori delle chiamate API vengono solo loggati in console (`axiosConfig.js`), non mostrati all'utente: considerare un sistema di notifiche/toast.
- `src/components/materia/` esiste come cartella (creata da `setup.js`) ma è vuota: se si vuole un `MateriaForm.jsx` analogo ad `AlunnoForm.jsx`, andrebbe creato lì.
- Nessun test automatico presente nel progetto (no Jest/Vitest/RTL) — da valutare se aggiungerli.
- Verificare eventuali altri componenti/pagine che usano ancora classi `dark:` "orfane" (cioè senza un vero toggle di tema): vanno convertite alla palette dark fissa descritta al §6.

---

## Changelog

### 2026-07-01 — Sessione 1: riallineamento generale del progetto

- **`src/hooks/useAlunni.js`**: l'hook esisteva ma non veniva usato da nessuna pagina (le pagine duplicavano la stessa logica di fetch). Ora espone anche `setAlunni` per update ottimistici e aggiunge la guardia `Array.isArray(res.data)` mancante nella versione originale.
- **`src/pages/MateriaPage.jsx`**: era un placeholder statico con tema chiaro (`bg-slate-50 dark:bg-slate-900`), incoerente col resto dell'app, e non collegato a `materiaApi` nonostante quest'ultimo esistesse già. Riscritta per recuperare davvero le materie da `GET /materie` e usare lo stesso layout/tema delle altre pagine.
- **`src/components/ui/Header.jsx`**: usava `max-w-6xl` mentre tutte le pagine usano `max-w-7xl` per il contenitore principale, causando un disallineamento orizzontale tra header e contenuto. Uniformato a `max-w-7xl`.
- **`src/components/alunno/alunnoForm.jsx` → `AlunnoForm.jsx`**: rinominato per rispettare la convenzione PascalCase dei componenti React ed evitare problemi di import case-sensitive fuori da Windows. Aggiornato l'import in `AlunniPage.jsx`.
- **`setup.js`**: conteneva un percorso assoluto hardcoded specifico di una macchina Windows (`e:\develop\React\Apps\exam-register-ui`), quindi lo script funzionava solo su quel PC. Ora usa `path.join(__dirname, dir)` con path relativi, portabile su qualunque macchina/OS.

### 2026-07-01 — Sessione 2: coerenza grafica Dashboard

- **`src/pages/Dashboard.jsx`**: aggiornato per usare l'hook `useAlunni()` invece di duplicare `useEffect`/`useState` (fetch alunni). Aggiornati i colori `accent` passati a `StatsCard` (da `text-indigo-600`/`emerald-600`/`violet-600`, pensati per sfondo chiaro e poco leggibili su dark, a `text-indigo-300`/`emerald-300`/`violet-300`).
- **`src/components/ui/StatsCard.jsx`**: era una card a sfondo chiaro (`bg-white/90`, testo `text-slate-950`) inserita in una pagina interamente dark, con effetto "riquadro bianco" fuori contesto. Riscritta in dark theme (`bg-slate-900/80`, testo `text-white`/`text-slate-400`) coerente con le altre card della dashboard e di `AlunniPage`.
- **`src/components/alunno/StudentCard.jsx`**: usava classi `dark:` (es. `bg-white dark:bg-slate-900`) che non scattano mai in modo affidabile perché l'app non ha un vero toggle di tema (è sempre dark). Il risultato era una card chiara se il sistema operativo dell'utente non era in dark mode, in contrasto col resto dell'interfaccia. Riscritta con la palette dark fissa del progetto (contenitore `bg-slate-950/60`, tag interni `bg-slate-900/70`, testo `text-white`/`text-slate-400`), usata sia in `Dashboard.jsx` (elenco "Ultimi alunni") sia potenzialmente altrove.
- **`CLAUDE.md`**: introdotta la sezione "Changelog" datata per tracciare le modifiche di ogni sessione da qui in avanti, e aggiunta al §6 la palette dark di riferimento da riusare nei nuovi componenti.

### 2026-07-01 — Sessione 3: fix layout rotto/sovrapposto nella Dashboard

- **`src/index.css`**: causa del bug "layout rotto/sovrapposto ma i colori ci sono" segnalato dall'utente. Il selettore `#root` conteneva ancora le regole del template demo di Vite (`width: 1126px`, `display: flex; flex-direction: column`, `text-align: center`, `border-inline`), pensate per la landing page originale con hero centrato. Queste regole entravano in conflitto con il `grid xl:grid-cols-[280px_1fr]` usato da `Dashboard.jsx`/`AlunniPage.jsx`/`MateriaPage.jsx`, schiacciando/centrando contenuti pensati per un layout a griglia full-width. Rimosse insieme a `h1, h2 { font-size / margin }` (altro residuo dell'hero demo, in conflitto con le utility Tailwind sui titoli di sezione) e al blocco `@media (prefers-color-scheme: dark)` che ridefiniva variabili di tema ormai inutili (l'app è sempre dark, non dipende dalle preferenze del sistema operativo). Aggiornate le variabili `--bg`/`--text`/`--border`/`--code-bg`/`--shadow` ai valori dark fissi e `color-scheme` da `light dark` a `dark`, per coerenza anche sui controlli nativi del browser (es. il calendar picker dell'`<input type="date">` in `AlunnoForm`).
- **Nota per il futuro**: se si riscontrano ancora disallineamenti "misteriosi" (colori giusti ma posizione/dimensioni sbagliate), controllare per primi eventuali stili globali in `index.css`/`App.css` prima dei componenti — `App.css` in particolare esiste ancora nel repo ma **non è importato da nessuna parte** (`App.jsx` non lo referenzia): è codice morto, va rimosso o tenuto a mente per non confondersi cercando bug lì dentro.

### 2026-07-01 — Sessione 4: correzione diagnosi, allineamento a AlunniPage.jsx

- **Diagnosi della sessione 3 corretta**: la modifica a `src/index.css` (rimozione del blocco `#root`) era una **diagnosi sbagliata**. `AlunniPage.jsx` usa lo stesso `index.css`/lo stesso wrapper `#root` e renderizza correttamente, quindi il problema non poteva essere lì. **`src/index.css` è stato ripristinato alla versione originale.**
- **`src/pages/Dashboard.jsx`**, **`src/components/ui/StatsCard.jsx`**, **`src/components/alunno/StudentCard.jsx`**: riallineati struttura-per-struttura ai pattern già collaudati in `AlunniPage.jsx`, invece di inventare nuove varianti:
  - breakpoint delle sezioni interne portato da `xl:` a `lg:` (`grid-cols-3`, `grid-cols-[1.35fr_0.65fr]`), come in `AlunniPage.jsx`, così il comportamento responsive è coerente tra le pagine;
  - box "annidati" (`StatsCard`, card delle "Azioni rapide", `StudentCard`) portati allo stesso stile pieno `bg-slate-950` con `border border-white/10` usato per i box interni di `AlunniPage.jsx` (es. "Suggerimento"), rimuovendo `backdrop-blur-xl` dai livelli interni: quell'effetto in `AlunniPage.jsx` è riservato solo al box header in cima alla pagina, non alle card annidate;
  - il box "Azioni rapide" è stato spostato in un `<aside>` con lo stesso wrapper a gradiente (`bg-gradient-to-b from-slate-900/80 to-slate-950/85`) usato dal blocco "Aggiungi nuovo profilo" in `AlunniPage.jsx`, invece di un semplice `div`.
- **Lezione**: quando un componente ha un fratello che funziona correttamente con lo stesso layout esterno, conviene diffare i due file struttura-per-struttura prima di sospettare il CSS globale.

### 2026-07-01 — Sessione 5: metriche reali in Dashboard (nuovi profili, utenti attivi/inattivi/online, trend mensile)

- **`src/api/statsApi.js`** (nuovo): client per `GET /dashboard/stats`. ⚠️ Endpoint indicativo: va allineato al path reale esposto dal backend Spring Boot, che al momento non è documentato altrove nel repo. Il JSON atteso è:
  ```json
  {
    "newProfilesToday": 0,
    "newProfilesLast7Days": 0,
    "currentMonthProfiles": 0,
    "previousMonthProfiles": 0,
    "profileGrowth": 0,
    "growthPercentage": 0.1,
    "activeUsers30Days": 0,
    "inactiveUsers90Days": 0,
    "onlineUsers": 0,
    "monthlyTrend": [{ "month": "string", "count": 0 }]
  }
  ```
- **`src/hooks/useDashboardStats.js`** (nuovo): stesso pattern di `useAlunni` (fetch in `useEffect`, guardia `mounted`, stato `{ stats, loading, error }`), con un oggetto `EMPTY_STATS` di default per evitare `undefined` mentre la chiamata è in corso o se il backend risponde parzialmente.
- **`src/components/dashboard/MonthlyTrendChart.jsx`** (nuovo): grafico a barre in SVG puro per `monthlyTrend`, senza aggiungere librerie di charting come dipendenza (nessuna in `package.json` al momento). Segue la palette indigo/slate del resto dell'app.
- **`src/pages/Dashboard.jsx`**: la vecchia riga di 3 `StatsCard` placeholder ("Totale alunni" / "Nuovi inserimenti" / "Materie attive —") è stata sostituita con 6 card basate sui dati reali di `useDashboardStats`: nuovi profili oggi, nuovi profili (7gg), profili mese corrente (con badge di crescita ↑/↓ e percentuale), utenti attivi (30gg), utenti inattivi (90gg), utenti online ora (con indicatore "live" pulsante). Aggiunta una nuova sezione "Andamento mensile" con `MonthlyTrendChart`. Le sezioni "Ultimi alunni" e "Azioni rapide" restano invariate nello stile.
- **Da fare quando il backend sarà pronto**: verificare il path reale dell'endpoint statistiche e allinearlo in `statsApi.js` (attualmente `/dashboard/stats`, sotto il prefisso base `/api/v1` già configurato in `axiosConfig.js`).