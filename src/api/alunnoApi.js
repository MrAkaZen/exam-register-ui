import api from './axiosConfig';

const alunniApi = {
  // Lista paginata
  getAll: (page = 0, size = 10) =>
    api.get("/alunni", {
      params: { page, size },
    }),

  // Dettaglio alunno
  getByMatricola: (matricola) =>
    api.get(`/alunni/${matricola}`),

  // Creazione alunno
  create: (data) =>
    api.post("/alunni", data),

  // Creazione batch
  createBatch: (data) =>
    api.post("/alunni/batch", data),

  // Eliminazione
  delete: (matricola) =>
    api.delete(`/alunni/${matricola}`),

  // Ricerca avanzata
  search: (filter = {}, page = 0, size = 10) =>
    api.get("/alunni/ricerca/avanzata", {
      params: {
        page,
        size,
        ...filter,
      },
    }),

  // Alunni recenti
  getRecent: (page = 0, size = 10) =>
    api.get("/alunni/recenti", {
      params: { page, size },
    }),

  // Dashboard statistiche
  getDashboardStats: () =>
    api.get("/alunni/statistiche/dashboard"),

  // Aggiungi materia ad un alunno
  addMateria: (matricola, codice) =>
    api.post(`/alunni/${matricola}/materie/${codice}`),

  // Rimuovi materia da un alunno
  removeMateria: (matricola, codice) =>
    api.delete(`/alunni/${matricola}/materie/${codice}`),

  // Aggiorna voto esame
  updateVoto: (
    matricola,
    codice,
    voto,
    dataSostenimento
  ) =>
    api.put(`/alunni/${matricola}/materie/${codice}/voto`, null, {
      params: {
        voto,
        dataSostenimento,
      },
    }),
};

export default alunniApi;