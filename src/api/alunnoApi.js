import api from './axiosConfig';

export const alunnoApi = {

  // GET tutti gli alunni
  getAll: () => api.get('/alunni'),

  // GET alunno per matricola
  getById: (matricola) => api.get(`/alunni/${matricola}`),

  // POST nuovo alunno
  save: (alunnoDTO) => api.post('/alunni/add', alunnoDTO),

  // PUT aggiorna voto
  updateVoto: (matricola, codiceMateria, voto, dataSostenimento) =>
    api.put(`/alunni/updateVoto/${matricola}/${codiceMateria}`, null, {
      params: { voto, dataSostenimento },
    }),

  // POST iscrivi alunno a materia
  addMateria: (matricola, nomeMateria) =>
    api.post(`/alunni/${matricola}/materie/${nomeMateria}`),
};