import api from './axiosConfig';

export const alunnoApi = {

  // GET tutti gli alunni
  getAll: () => api.get('/alunni'),

  // GET alunno per matricola
  getAlunnoById: (matricola) => api.get(`/alunni/alunno`, { params: { matricola } }),

  // POST nuovo alunno
  save: (alunnoDTO) => api.post('/alunni/add', alunnoDTO),

  // PUT aggiorna voto
  updateVoto: (matricola, codiceMateria, voto, dataSostenimento) =>
    api.put(`/alunni/updateVoto/${matricola}/${codiceMateria}`, null, {
      params: { voto, dataSostenimento },
    }),

  // POST iscrivi alunno a materia
  addMateria: (matricola, nomeMateria) => api.post(`/alunni/${matricola}/materie/${nomeMateria}`),

  // POST alunni filtrati con body
  getFilteredWithBody: (alunnoFiltered, page = 0, size = 10) =>
    api.post('/alunni/filtered', alunnoFiltered, { params: { page, size } }),
};