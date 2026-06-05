import api from './axiosConfig';

export const alunnoApi = {

  // GET tutti gli alunni
  getAll: (page = 0, size = 5) => api.get('/alunni/all', { params: { page, size } }),

  // GET alunni più recenti con paginazione
  getMustRecently: (page = 0, size = 5) => api.get('/alunni/mustRecently', { params: { page, size } }),

  // GET alunno per matricola
  getAlunnoByMatricola: (matricola) => api.get('/alunni/alunno', { params: { matricola } }),

  // POST nuovo alunno
  createAlunno: (alunnoDTO) => api.post('/alunni/add', alunnoDTO),

  // PUT aggiorna voto
  updateVotoAlunno: (matricola, codiceMateria, voto, dataSostenimento) => api.put(`/alunni/updateVoto/${matricola}/${codiceMateria}`, null, {params: { voto, dataSostenimento },}),

  // POST iscrivi alunno a materia
  setMateria: (matricola, nomeMateria) => api.post(`/alunni/${matricola}/materie/${nomeMateria}`),

  // POST alunni filtrati con body
  getFilteredWithBody: (alunnoFiltered, page = 0, size = 10) => api.post('/alunni/filtered', alunnoFiltered, { params: { page, size } }),

  // GET metriche ultimi 30 giorni
  getAlunniStats: () => api.get('/alunni/stats'),
};