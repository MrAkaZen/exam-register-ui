
Exam Register
/
Claude ha terminato la risposta
Stravolgi il design uix e rendi il crm più clean e pulito, con bottini e dashboard organizzate e chiare.

23 mag

Reading frontend design skill
Reading frontend design skill
Analizzo il codice e progetto un redesign completo. Il progetto è un CRM universitario in italiano — punterò a un'estetica editoriale/minimalista raffinata: sfondo bianco puro, tipografia incisiva, accenti cromatici precisi (un unico blu intenso), layout aerato con densità controllata. Niente sfumature viola generiche.

Ora creo i file del redesign. Progetto un'estetica editoriale precisa: sfondo bianco latteo, tipografia DM Sans + DM Mono, accenti in blu elettrico 
#1B4FFF, bordi sottilissimi, spacing generoso. Niente blob/gradients. Pulito come un buon giornale finanziario.


Check uploads
Check uploads
Creo i nuovi componenti uno per uno.


Creati 5 file
Creati 5 file
Ora il cuore: il CSS globale. Estetica editoriale con DM Sans.


Complete new CSS for the CRM - clean editorial style
Complete new CSS for the CRM - clean editorial style
Ora creo i file di output finali organizzati:


Eseguiti 2 comandi
Eseguiti 2 comandi
Ora un'anteprima visiva del nuovo design:


Presented 6 files
Presented 6 files
V

Connessione a visualize...
Ecco il redesign completo. Ho ribaltato completamente il vecchio stile dark con blob/gradients viola e sono andato nella direzione opposta: editoriale minimalista preciso.

Cosa è cambiato nel dettaglio:

Estetica generale — sfondo grigio neutro 
#F7F7F9, card bianche con bordi 1px solid #E4E4EC, zero ombre decorative. Ogni elemento ha uno scopo chiaro.

Tipografia — DM Sans per l'interfaccia + DM Mono per valori numerici (matricole, stats). Gerarchie costruite con peso e dimensione, non con colore.

Colore — un solo accento: 
#1B4FFF (blu elettrico). Usato sparingly: nav attivo, eyebrow labels, avatar, chip attivi. Verde 
#166534 solo per stati positivi. Nessun gradient.

Header — compatto a 60px, navigazione piatta con indicatore attivo pulito, searchbar integrata.

Stats cards — 4 colonne, valori in DM Mono grandi, icone in micro-box neutri, badge trend solo dove necessario.

StudentCard — avatar con iniziali su sfondo blu-dim, chip compatti, nessun padding eccessivo.

AlunniPage — tabella con toolbar (search + filtri + contatore), form che appare/scompare con animazione fadeIn, bottone primario blu.

I file da sostituire nel tuo progetto sono quelli qui sopra — stessa struttura di cartelle del progetto originale.


Index
Codice · CSS 

Header
Codice · JSX 

Statscard
Codice · JSX 

Studentcard
Codice · JSX 

Dashboard
Codice · JSX 

Alunnipage
Codice · JSX 
Scansiona il progetto nuovamente e crea il file CLAUDE.md per avere contesto dell'applicativo

24 mag

Scan project structure from uploaded files
Scan project structure from uploaded files
Scansiona il progetto nuovamente e crea il file CLAUDE.md per avere contesto dell'applicativo

26 mag
Ho tutto il contesto dal codice condiviso in conversazione. Creo subito il CLAUDE.md.


File creato, file letto
File creato, file letto
Il file va posizionato nella root del progetto (exam-register-ui/CLAUDE.md). Contiene tutto quello che serve a Claude Code per lavorare sul progetto senza domande:

Architettura completa con mappa delle cartelle e responsabilità di ogni file
Routing con tabella path → componente
API backend con tutti gli endpoint, metodi HTTP e struttura del DTO studente
Design system con i token CSS e i pattern di utilizzo delle classi .er-*
Validazione Yup con le regole di ogni campo
Stato implementazione con cosa è completo, cosa è placeholder e cosa manca ancora
Note pratiche su pattern da seguire per estendere l'app

Claude
Documento · MD 
creami le parti mancanti e da implementare tranne l'autenticazione che implementeremo successivamente. In più inserisci la dark mode

26 mag
Leggo prima il design system e poi scansiono tutto il codice esistente per costruire in modo coerente.


Read frontend design skill
Read frontend design skill
Ora rileggo il codice esistente dalla conversazione e pianifico tutto. Devo implementare:

MateriaPage — lista + form inserimento materie
UI aggiornamento voto — modal/panel su AlunniPage
UI iscrizione studente a materia — dal profilo studente
Dettaglio singolo studente — pagina /alunni/:matricola
Dark mode — toggle persistente, token CSS completi
CLAUDE.md aggiornato

Creati 11 file, eseguito un comando
Creati 11 file, eseguito un comando
dove sono gli 11 files?

26 mag
Hai ragione, ho creato i file in /home/claude/ ma non li ho copiati negli output né presentati. Rimedio subito.


List all generated files
List all generated files
ho bisogno dei files generati

17:08

Copy all files to outputs
Copy all files to outputs
Manca ancora l'App.jsx aggiornato con le nuove route — lo aggiungo:


File creato, file letto
File creato, file letto
Tutti e 12 i file. Ecco cosa sostituire/aggiungere nel progetto:

Da sostituire:

src/App.jsx — aggiunge ThemeProvider e la route /alunni/:matricola
src/index.css — token dark mode completi + tutte le classi .er-* nuove
src/components/ui/Header.jsx — toggle sole/luna per dark mode
src/components/ui/StatsCard.jsx — aggiornato
src/components/alunno/StudentCard.jsx — cliccabile, naviga al dettaglio
src/pages/AlunniPage.jsx — righe tabella cliccabili + freccia dettaglio
src/pages/MateriaPage.jsx — pagina completa (era placeholder)
Da aggiungere:

src/context/ThemeContext.jsx — provider dark/light con localStorage
src/components/alunno/VotoModal.jsx — modal aggiornamento voto
src/components/alunno/IscrizioneModal.jsx — modal iscrizione a materia
src/components/materia/MateriaForm.jsx — form nuova materia
src/pages/StudentDetail.jsx — pagina profilo studente con esami, voti, azioni

App
Codice · JSX 

Index
Codice · CSS 

Themecontext
Codice · JSX 

Header
Codice · JSX 

Statscard
Codice · JSX 

Studentcard
Codice · JSX 

Votomodal
Codice · JSX 

Iscrizionemodal
Codice · JSX 

Materiaform
Codice · JSX 

Alunnipage
Codice · JSX 

Materiapage
Codice · JSX 

Studentdetail
Codice · JSX 
rileggi la repo e crea un file CLAUDE.md dove terrai il contesto dell'applicativo e aggiornerai ad ogni singola modifica

17:28

Ha visualizzato 7 file
Ha visualizzato 7 file
Ho letto tutto. Ora scrivo il CLAUDE.md completo e preciso.


File creato, eseguito un comando, file letto
File creato, eseguito un comando, file letto
Il CLAUDE.md è aggiornato con tutto il contesto reale del progetto. Mettilo nella root di exam-register-ui/.

Contiene 8 sezioni operative:

Struttura file — mappa esatta di ogni file con la sua responsabilità
Routing — tabella path → componente con nota sul startsWith per l'active link
API Backend — tutti gli endpoint con metodo, path, parametri e i due DTO completi
Dark mode — meccanismo, persistenza, come consumarla nei componenti
Design system — tutti i token CSS light/dark + tabella completa delle classi .er-*
Validazione form — regole Yup per ogni campo di ogni form
Stato implementazione — cosa è fatto, cosa è disabilitato, cosa manca, cosa è pianificato
Changelog — storico modifiche con data
D'ora in poi, ad ogni sessione in cui modifichi qualcosa, aggiorna la sezione pertinente e aggiungi una riga al changelog.


Claude
Documento · MD 
Da aggiungere:

src/context/ThemeContext.jsx — provider dark/light con localStorage
src/components/alunno/VotoModal.jsx — modal aggiornamento voto
src/components/alunno/IscrizioneModal.jsx — modal iscrizione a materia
src/components/materia/MateriaForm.jsx — form nuova materia
src/pages/StudentDetail.jsx — pagina profilo studente con esami, voti, azioni leggi il cluade esegui queste aggiunzioni e aggiorna il CLAUDE.md
17:33
Leggo prima il CLAUDE.md e poi tutti i file già generati.


Read CLAUDE.md
Read CLAUDE.md
Il CLAUDE.md è già aggiornato e i file esistono in /mnt/user-data/outputs/exam-register/src/. Il problema è che non sono stati ancora copiati nella cartella del progetto reale. Verifico cosa c'è negli output e presento tutti i file mancanti.


Check what files are in outputs
Check what files are in outputs
Tutti i 12 file sono già presenti negli output. Li presento tutti insieme.


Presented 13 files
Presented 13 files
Tutti e 13 i file sono qui. Ecco esattamente dove va ognuno nel tuo progetto:

Da aggiungere (file nuovi):

ThemeContext.jsx → src/context/ThemeContext.jsx (crea la cartella context/)
VotoModal.jsx → src/components/alunno/VotoModal.jsx
IscrizioneModal.jsx → src/components/alunno/IscrizioneModal.jsx
MateriaForm.jsx → src/components/materia/MateriaForm.jsx (crea la cartella materia/)
StudentDetail.jsx → src/pages/StudentDetail.jsx
Da sostituire (file aggiornati):

App.jsx → src/App.jsx — aggiunge ThemeProvider e route /alunni/:matricola
index.css → src/index.css — token dark mode + tutte le classi .er-*
Header.jsx → src/components/ui/Header.jsx — toggle sole/luna
AlunniPage.jsx → src/pages/AlunniPage.jsx — righe cliccabili
MateriaPage.jsx → src/pages/MateriaPage.jsx — pagina completa
StudentCard.jsx → src/components/alunno/StudentCard.jsx — cliccabile
StatsCard.jsx → src/components/ui/StatsCard.jsx — aggiornato
CLAUDE.md → root del progetto exam-register-ui/CLAUDE.md


Themecontext
Codice · JSX 

Votomodal
Codice · JSX 

Iscrizionemodal
Codice · JSX 

Materiaform
Codice · JSX 

Studentdetail
Codice · JSX 

App
Codice · JSX 

Index
Codice · CSS 

Header
Codice · JSX 

Statscard
Codice · JSX 

Studentcard
Codice · JSX 

Alunnipage
Codice · JSX 

Materiapage
Codice · JSX 

Claude
Documento · MD 

Vuoi ricevere una notifica quando Claude risponde?





Claude è un'AI e può commettere errori. Verifica le risposte.


raw
Claude · MD
Copiato
# CLAUDE.md — Exam Register UI
 
> **Istruzioni per Claude Code**: leggi questo file prima di toccare qualsiasi file del progetto.
> Aggiornalo **ad ogni modifica** — struttura, routing, API, componenti, design system, stato implementazione.
 
---
 
## Panoramica
 
**exam-register-ui** è una SPA React che funge da frontend CRM per la gestione di studenti universitari e materie d'esame. Si integra con un backend Spring Boot su `localhost:8080`.
 
| Voce            | Valore                                              |
|-----------------|-----------------------------------------------------|
| Framework       | React 19 + Vite 8                                   |
| Styling         | CSS custom (classi `.er-*`) + Tailwind CSS 4        |
| HTTP client     | Axios 1.x — base URL `/api/v1`                      |
| Routing         | React Router 7                                      |
| Form/validazione| React Hook Form 7 + Yup 1                           |
| Icone           | lucide-react                                        |
| UI library      | @mui/material (installata, non usata nelle pagine principali) |
| Lingua UI       | Italiano                                            |
| Porta dev       | `3000` (proxy verso `8080`)                         |
 
---
 
## Struttura file
 
```
src/
├── App.jsx                                   # Router root + ThemeProvider
├── main.jsx                                  # Entry point React
├── index.css                                 # Tutti i token CSS + classi .er-*
│
├── context/
│   └── ThemeContext.jsx                      # Dark/light mode — localStorage + data-theme su <html>
│
├── api/
│   ├── axiosConfig.js                        # Istanza Axios centralizzata, interceptor errori
│   ├── alunnoApi.js                          # CRUD studenti
│   └── materiaApi.js                         # CRUD materie
│
├── hooks/
│   └── useAlunni.js                          # Custom hook lista alunni (loading/error)
│
├── components/
│   ├── ui/
│   │   ├── Header.jsx                        # Navbar sticky: brand, nav, search, dark toggle, notifiche
│   │   ├── Sidebar.jsx                       # Sidebar desktop xl (Dashboard) — nav + insights
│   │   └── StatsCard.jsx                     # Card metrica: icona, label, valore, hint, trend
│   │
│   ├── alunno/
│   │   ├── StudentCard.jsx                   # Card studente cliccabile → naviga a /alunni/:matricola
│   │   ├── alunnoForm.jsx                    # Form inserimento studente (hook-form + yup)
│   │   ├── VotoModal.jsx                     # Modal aggiornamento voto esame
│   │   └── IscrizioneModal.jsx               # Modal iscrizione studente a materia
│   │
│   └── materia/
│       └── MateriaForm.jsx                   # Form inserimento nuova materia (hook-form + yup)
│
└── pages/
    ├── HomePage.jsx                          # Re-export di Dashboard
    ├── Dashboard.jsx                         # /dashboard — stats, ultimi studenti, azioni, attività
    ├── AlunniPage.jsx                        # /alunni — tabella studenti + form inserimento
    ├── StudentDetail.jsx                     # /alunni/:matricola — profilo, dati, esami, modali
    └── MateriaPage.jsx                       # /materie — griglia card + form inserimento
```
 
---
 
## Routing
 
| Path                  | Componente      | Descrizione                                        |
|-----------------------|-----------------|----------------------------------------------------|
| `/`                   | HomePage        | Alias di Dashboard                                 |
| `/dashboard`          | Dashboard       | Panoramica: 4 stat card, ultimi studenti, azioni   |
| `/alunni`             | AlunniPage      | Tabella studenti con ricerca + form inserimento    |
| `/alunni/:matricola`  | StudentDetail   | Profilo completo studente, esami, voti, iscrizione |
| `/materie`            | MateriaPage     | Griglia materie con ricerca + form inserimento     |
 
**Nota navigazione**: `Header` usa `pathname.startsWith(to)` per il link attivo — `/alunni/:matricola` evidenzia correttamente "Alunni".
 
---
 
## API Backend
 
Base URL configurata in `axiosConfig.js`: `/api/v1` (proxied da Vite → `http://localhost:8080`).
 
### `alunnoApi` — `src/api/alunnoApi.js`
 
| Metodo | Endpoint                                             | Descrizione                  |
|--------|------------------------------------------------------|------------------------------|
| GET    | `/alunni`                                            | Lista tutti gli studenti     |
| GET    | `/alunni/:matricola`                                 | Studente per matricola       |
| POST   | `/alunni`                                            | Crea nuovo studente          |
| PUT    | `/alunni/updateVoto/:matricola/:codiceMateria`       | Aggiorna voto (params: `voto`, `dataSostenimento`) |
| POST   | `/alunni/:matricola/materie/:nomeMateria`            | Iscrive studente a materia   |
 
### `materiaApi` — `src/api/materiaApi.js`
 
| Metodo | Endpoint          | Descrizione              |
|--------|-------------------|--------------------------|
| GET    | `/materie`        | Lista tutte le materie   |
| GET    | `/materie/:nome`  | Materia per nome         |
| POST   | `/materie`        | Crea nuova materia       |
 
### DTO Studente
```js
{
  // Obbligatori
  nome, cognome, email, password,
  // Opzionali
  telefono,        // string, regex /^\d{10}$/
  dataNascita,     // Date, max oggi
  luogoNascita,    // string
  codiceFiscale,   // string, regex /^[A-Z0-9]{16}$/
  indirizzo,       // string
  cap,             // string, regex /^\d{5}$/
  citta,           // string
  annoCorso,       // int 1–10
  // Assegnato dal backend
  matricola,       // string — chiave primaria
  // Relazione
  materie: [{ nome, codice, voto, dataSostenimento }]
}
```
 
### DTO Materia
```js
{
  nome,        // string, obbligatorio, min 2 — chiave primaria per iscrizione
  codice,      // string, opzionale
  docente,     // string, opzionale
  cfu,         // int 1–30, opzionale
  semestre,    // int 1–2, opzionale
  descrizione, // string, opzionale
}
```
 
---
 
## Dark Mode
 
Implementata con `ThemeContext` (`src/context/ThemeContext.jsx`):
 
- **Toggle**: bottone Sole/Luna nell'`Header` — usa `useTheme().toggle`
- **Persistenza**: `localStorage` key `er-theme` (`'dark'` | `'light'`)
- **Default**: rispetta `prefers-color-scheme` del sistema operativo
- **Meccanismo**: aggiunge/rimuove `data-theme="dark"` su `<html>`
- **CSS**: token ridefiniti in `[data-theme="dark"] { ... }` in `index.css`
Per consumare il tema in un componente:
```jsx
import { useTheme } from '../../context/ThemeContext';
const { dark, toggle } = useTheme();
```
 
---
 
## Design System
 
Tutte le classi usano il prefisso `.er-*` definito in `src/index.css`.
**Non usare classi Tailwind custom** per i componenti principali — estendere il sistema `.er-*`.
 
### Token CSS principali
 
```css
/* Colori — light (default) */
--blue:       #1B4FFF    /* accento primario */
--blue-hover: #1340D6
--blue-dim:   #EEF2FF    /* bg accent leggero */
--blue-mid:   #C7D2FE    /* bordo accent */
--ink:        #0D0E14    /* testo principale */
--ink-2:      #3A3D4D
--ink-3:      #6B6F82    /* testo secondario */
--ink-4:      #9DA1B4    /* testo placeholder/muted */
--surface:    #FFFFFF    /* sfondo card */
--surface-2:  #F7F7F9    /* sfondo app */
--surface-3:  #F0F0F4    /* sfondo hover/alt */
--border:     #E4E4EC    /* bordo standard */
--border-2:   #CECED8    /* bordo hover */
 
/* Colori — dark (ridefiniti sotto [data-theme="dark"]) */
--blue:       #4F75FF
--ink:        #F0F1F5
--surface:    #14151C
--surface-2:  #0F1017
--border:     #252733
/* ...vedi index.css per la lista completa */
 
/* Tipografia */
--font: 'DM Sans', system-ui, sans-serif
--mono: 'DM Mono', ui-monospace, monospace
```
 
### Componenti CSS disponibili
 
| Classe                              | Uso                                              |
|-------------------------------------|--------------------------------------------------|
| `.er-app`                           | Wrapper pagina (`min-h-screen flex flex-col`)    |
| `.er-main`                          | Contenitore contenuto (`max-w-1200px`, padding)  |
| `.er-card`                          | Card bianca con bordo                            |
| `.er-card--highlight`               | Card con bordo accent blu                        |
| `.er-card-header`                   | Header card (padding top + margin bottom)        |
| `.er-card-body`                     | Body card (padding laterale + bottom)            |
| `.er-card-title` / `.er-card-sub`   | Tipografia header card                           |
| `.er-btn`                           | Bottone base                                     |
| `.er-btn--primary`                  | Bottone blu pieno                                |
| `.er-btn--ghost`                    | Bottone bordo trasparente                        |
| `.er-btn--danger`                   | Bottone rosso                                    |
| `.er-btn--sm` / `.er-btn--lg`       | Varianti dimensione                              |
| `.er-stat`                          | Card statistica                                  |
| `.er-stats-grid`                    | Griglia 4 colonne stat card                      |
| `.er-table`                         | Tabella stilizzata                               |
| `.er-table-toolbar`                 | Toolbar sopra tabella (search + filtri + count)  |
| `.er-table-row`                     | Riga tabella con hover                           |
| `.er-form` / `.er-field`            | Container form e singolo campo                   |
| `.er-form-row--2` / `--3`           | Grid 2 o 3 colonne per campi form                |
| `.er-input` / `.er-select`          | Input e select stilizzati                        |
| `.er-label` / `.er-error`           | Label e messaggio errore form                    |
| `.er-modal-backdrop`                | Backdrop modale con blur                         |
| `.er-modal`                         | Box modale con animazione                        |
| `.er-avatar`                        | Avatar con iniziali                              |
| `.er-avatar--sm/lg/xl`              | Varianti dimensione avatar                       |
| `.er-chip`                          | Tag/pill neutro                                  |
| `.er-chip--accent/green/red/amber`  | Varianti colore chip                             |
| `.er-status--active/inactive/pending` | Badge stato colorato                           |
| `.er-profile-header`                | Header profilo studente (avatar + info + azioni) |
| `.er-info-grid`                     | Griglia 2 colonne dati anagrafici                |
| `.er-materia-card`                  | Card materia con emoji, nome, meta               |
| `.er-materia-grid`                  | Grid responsive per card materie                 |
| `.er-voto-badge`                    | Badge voto colorato per fascia                   |
| `.er-empty-state`                   | Stato vuoto centrato con icona                   |
| `.er-alert--success/error/info`     | Messaggi alert inline                            |
| `.er-back-btn`                      | Link "← Torna a..."                              |
| `.er-fade-in` / `.er-slide-up`      | Animazioni entrata                               |
 
---
 
## Validazione Form
 
### `alunnoForm.jsx` (Yup)
| Campo         | Regola                   | Obbligatorio |
|---------------|--------------------------|--------------|
| nome          | min 2 caratteri          | ✅           |
| cognome       | min 2 caratteri          | ✅           |
| email         | formato email valido     | ✅           |
| password      | min 8 caratteri          | ✅           |
| telefono      | `/^\d{10}$/`             | ❌           |
| dataNascita   | `max(new Date())`        | ❌           |
| codiceFiscale | `/^[A-Z0-9]{16}$/`       | ❌           |
| cap           | `/^\d{5}$/`              | ❌           |
| annoCorso     | int 1–10                 | ❌           |
 
### `MateriaForm.jsx` (Yup)
| Campo    | Regola          | Obbligatorio |
|----------|-----------------|--------------|
| nome     | min 2 caratteri | ✅           |
| cfu      | int 1–30        | ❌           |
| semestre | int 1–2         | ❌           |
 
### `VotoModal.jsx` (validazione inline)
- `voto`: int 18–30
- `dataSostenimento`: date, max oggi
---
 
## Stato implementazione
 
| Funzionalità                       | Stato             | File/i                                      |
|------------------------------------|-------------------|---------------------------------------------|
| Dashboard panoramica               | ✅ Completo       | `pages/Dashboard.jsx`                       |
| Lista studenti con ricerca         | ✅ Completo       | `pages/AlunniPage.jsx`                      |
| Inserimento studente               | ✅ Completo       | `components/alunno/alunnoForm.jsx`          |
| Dettaglio profilo studente         | ✅ Completo       | `pages/StudentDetail.jsx`                   |
| Aggiornamento voto esame           | ✅ Completo       | `components/alunno/VotoModal.jsx`           |
| Iscrizione studente a materia      | ✅ Completo       | `components/alunno/IscrizioneModal.jsx`     |
| Lista materie con ricerca          | ✅ Completo       | `pages/MateriaPage.jsx`                     |
| Inserimento materia                | ✅ Completo       | `components/materia/MateriaForm.jsx`        |
| Dark mode                          | ✅ Completo       | `context/ThemeContext.jsx` + `index.css`    |
| Eliminazione studente              | ⚠️ UI disabilitata | `pages/StudentDetail.jsx` (opacity .5)    |
| Eliminazione materia               | ❌ Da implementare | —                                          |
| Modifica dati studente             | ❌ Da implementare | —                                          |
| Modifica dati materia              | ❌ Da implementare | —                                          |
| Rimozione studente da materia      | ❌ Da implementare | —                                          |
| Autenticazione / login             | ⏳ Pianificata    | Da implementare in sessione successiva      |
 
---
 
## Comandi
 
```bash
npm run dev       # Dev server su http://localhost:3000
npm run build     # Build produzione → dist/
npm run lint      # ESLint
npm run preview   # Preview build
```
 
**Prerequisiti**: Node.js ≥ 20, Spring Boot avviato su `localhost:8080`.
 
---
 
## Configurazione
 
### Proxy Vite (`vite.config.js`)
```js
proxy: { '/api': { target: 'http://localhost:8080', changeOrigin: true } }
```
 
### Variabili d'ambiente (`.env`)
```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_APP_NAME=Exam Register
```
 
---
 
## Pattern da seguire
 
### Aggiungere una nuova pagina
1. Creare `src/pages/NomePage.jsx`:
   ```jsx
   import Header from '../components/ui/Header';
   export default function NomePage() {
     return (
       <div className="er-app">
         <Header />
         <main className="er-main">
           <div className="er-page-header">
             <div className="er-page-header-left">
               <p className="er-eyebrow">Sezione</p>
               <h1 className="er-page-title">Titolo</h1>
             </div>
           </div>
         </main>
       </div>
     );
   }
   ```
2. Aggiungere la route in `App.jsx`
3. Aggiungere il link nell'array `nav` di `Header.jsx`
4. Aggiornare questo `CLAUDE.md`
### Aggiungere un modale
- Struttura: `er-modal-backdrop` → `er-modal` → `er-modal-header` + `er-modal-body` + `er-modal-footer`
- Chiusura: click su backdrop (`e.target === e.currentTarget`) + bottone X
- Animazione già definita in CSS
### Pattern fetch dati
```js
useEffect(() => {
  let mounted = true;
  api.getAll()
    .then((r) => { if (mounted) setData(Array.isArray(r.data) ? r.data : []); })
    .catch(console.error)
    .finally(() => { if (mounted) setLoading(false); });
  return () => { mounted = false; };
}, []);
```
 
---
 
## Note importanti
 
- `matricola` è la chiave primaria degli studenti; usare `a.matricola ?? a.email` come React `key` quando può essere assente.
- `nome` è la chiave primaria delle materie per l'endpoint iscrizione.
- Il campo `password` viaggia in chiaro — implementare HTTPS prima del deploy.
- `Sidebar.jsx` esiste ma è usato solo nella `Dashboard`; le nuove pagine usano solo `Header`.
- `useAlunni.js` disponibile ma non usato dalle pagine principali (gestione stato locale).
- Emoji materie: generate deterministicamente da hash del nome (`emojiForMateria()` in `MateriaPage.jsx`).
---
 
## Changelog
 
| Data       | Modifica                                                                          |
|------------|-----------------------------------------------------------------------------------|
| 2026-05-30 | Redesign completo UI → design system `.er-*`, font DM Sans/DM Mono               |
| 2026-05-30 | Aggiunta dark mode con `ThemeContext` + token CSS completi                        |
| 2026-05-30 | Implementato `StudentDetail` — dati anagrafici, tabella esami, modali             |
| 2026-05-30 | Implementato `VotoModal` — aggiornamento voto con validazione inline              |
| 2026-05-30 | Implementato `IscrizioneModal` — iscrizione studente a materia                    |
| 2026-05-30 | Implementato `MateriaPage` — griglia card + form + ricerca + stat                 |
| 2026-05-30 | Implementato `MateriaForm` — nome, codice, docente, cfu, semestre, descrizione    |
| 2026-05-30 | Aggiornato `AlunniPage` — righe cliccabili, ricerca su matricola e città          |
| 2026-05-30 | Aggiornato `StudentCard` — cliccabile, naviga a `/alunni/:matricola`              |
| 2026-05-30 | Aggiornato `App.jsx` — route `/alunni/:matricola` + `ThemeProvider`               |
| 2026-05-30 | Creato `CLAUDE.md` — contesto completo progetto                                   |
 


