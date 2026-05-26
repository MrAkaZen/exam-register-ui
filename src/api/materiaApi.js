import api from './axiosConfig';

export const materiaApi = {

  // GET tutte le materie
  getAll: () => api.get('/materie'),

  // GET materia per nome
  getByNome: (nome) => api.get(`/materie/${nome}`),

  // POST nuova materia
  save: (materiaDTO) => api.post('/materie', materiaDTO),

  // POST materie filtrate con body
  getFilteredWithBody: (materiaFiltered, page = 0, size = 10) =>
  api.post('/materie/filtered', materiaFiltered, { params: { page, size } }),
};