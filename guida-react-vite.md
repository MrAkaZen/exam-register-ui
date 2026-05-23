# Guida: React + Vite integrato con Spring Boot (exam-register)

## Prerequisiti

| Tool | Versione minima | Verifica |
|---|---|---|
| Node.js | 18+ | `node -v` |
| npm | 9+ | `npm -v` |
| Spring Boot | 4.0.6 | app avviata su `localhost:8080` |

---

## 1. Creazione del progetto

```bash
npm create vite@latest exam-register-ui -- --template react
cd exam-register-ui
npm install
```

Struttura generata:
```
exam-register-ui/
├── public/
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## 2. Installazione dipendenze

```bash
# HTTP client
npm install axios

# Router
npm install react-router-dom

# Gestione form e validazione
npm install react-hook-form
npm install @hookform/resolvers yup

# UI component library (opzionale)
npm install @mui/material @emotion/react @emotion/styled

# Icone
npm install lucide-react
```

---

## 3. Configurazione Proxy (CORS)

Configura il proxy in `vite.config.js` per evitare problemi CORS durante lo sviluppo:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
```

> Con questa configurazione ogni chiamata a `/api/v1/...` viene reindirizzata a `http://localhost:8080/api/v1/...` senza errori CORS.

---

## 4. Struttura del progetto consigliata

```
src/
├── api/
│   ├── axiosConfig.js       # istanza axios centralizzata
│   ├── alunnoApi.js         # chiamate endpoint /alunni
│   └── materiaApi.js        # chiamate endpoint /materie
├── components/
│   ├── alunno/
│   │   ├── AlunnoForm.jsx
│   │   └── AlunnoList.jsx
│   └── materia/
│       ├── MateriaForm.jsx
│       └── MateriaList.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── AlunniPage.jsx
│   └── MateriaPage.jsx
├── hooks/
│   └── useAlunni.js         # custom hook
├── App.jsx
└── main.jsx
```

---

## 5. Configurazione Axios

**`src/api/axiosConfig.js`**

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor per gestire errori globali
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Errore sconosciuto';
    console.error(`[API Error] ${message}`);
    return Promise.reject(error);
  }
);

export default api;
```

---

## 6. API Service

**`src/api/alunnoApi.js`**

```javascript
import api from './axiosConfig';

export const alunnoApi = {

  // GET tutti gli alunni
  getAll: () => api.get('/alunni'),

  // GET alunno per matricola
  getById: (matricola) => api.get(`/alunni/${matricola}`),

  // POST nuovo alunno
  save: (alunnoDTO) => api.post('/alunni', alunnoDTO),

  // PUT aggiorna voto
  updateVoto: (matricola, codiceMateria, voto, dataSostenimento) =>
    api.put(`/alunni/updateVoto/${matricola}/${codiceMateria}`, null, {
      params: { voto, dataSostenimento },
    }),

  // POST iscrivi alunno a materia
  addMateria: (matricola, nomeMateria) =>
    api.post(`/alunni/${matricola}/materie/${nomeMateria}`),
};
```

**`src/api/materiaApi.js`**

```javascript
import api from './axiosConfig';

export const materiaApi = {

  // GET tutte le materie
  getAll: () => api.get('/materie'),

  // GET materia per nome
  getByNome: (nome) => api.get(`/materie/${nome}`),

  // POST nuova materia
  save: (materiaDTO) => api.post('/materie', materiaDTO),
};
```

---

## 7. Esempio componente — Form Alunno

**`src/components/alunno/AlunnoForm.jsx`**

```jsx
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { alunnoApi } from '../../api/alunnoApi';

const schema = yup.object({
  nome:     yup.string().min(2).required('Il nome è obbligatorio'),
  cognome:  yup.string().min(2).required('Il cognome è obbligatorio'),
  password: yup.string().min(8).required('La password è obbligatoria'),
  email:    yup.string().email('Email non valida').required('L\'email è obbligatoria'),
});

export default function AlunnoForm({ onSuccess }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await alunnoApi.save(data);
      console.log('Alunno creato:', response.data);
      onSuccess?.(response.data);
    } catch (error) {
      console.error('Errore:', error.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input placeholder="Nome" {...register('nome')} />
        {errors.nome && <span>{errors.nome.message}</span>}
      </div>
      <div>
        <input placeholder="Cognome" {...register('cognome')} />
        {errors.cognome && <span>{errors.cognome.message}</span>}
      </div>
      <div>
        <input placeholder="Email" type="email" {...register('email')} />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <input placeholder="Password" type="password" {...register('password')} />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <button type="submit">Aggiungi Alunno</button>
    </form>
  );
}
```

---

## 8. Esempio custom Hook

**`src/hooks/useAlunni.js`**

```javascript
import { useState, useEffect } from 'react';
import { alunnoApi } from '../api/alunnoApi';

export function useAlunni() {
  const [alunni, setAlunni]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    alunnoApi.getAll()
      .then((res) => setAlunni(res.data))
      .catch((err) => setError(err.response?.data?.message))
      .finally(() => setLoading(false));
  }, []);

  return { alunni, loading, error };
}
```

---

## 9. Configurazione Router

**`src/App.jsx`**

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage    from './pages/HomePage';
import AlunniPage  from './pages/AlunniPage';
import MateriaPage from './pages/MateriaPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"        element={<HomePage />} />
        <Route path="/alunni"  element={<AlunniPage />} />
        <Route path="/materie" element={<MateriaPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 10. Avvio del progetto

```bash
# Avvia React (porta 3000)
npm run dev

# Assicurati che Spring Boot sia avviato sulla porta 8080
```

Apri il browser su:
```
http://localhost:3000
```

---

## 11. Variabili d'ambiente

Crea un file `.env` nella root del progetto per configurare l'ambiente:

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_APP_NAME=Exam Register
```

Usale nel codice:

```javascript
const baseURL = import.meta.env.VITE_API_BASE_URL;
```

> Le variabili Vite devono iniziare obbligatoriamente con `VITE_` per essere esposte al client.

---

## 12. Build per produzione

```bash
npm run build
```

Genera la cartella `dist/` con i file statici ottimizzati.

Per servirli tramite Spring Boot, copia il contenuto di `dist/` in:
```
src/main/resources/static/
```

Spring Boot servirà automaticamente i file statici, e l'app sarà accessibile su:
```
http://localhost:8080/
```
