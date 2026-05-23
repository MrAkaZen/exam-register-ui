import api from './axiosConfig';

export const materiaApi = {

  // GET tutte le materie
  getAll: () => api.get('/materie'),

  // GET materia per nome
  getByNome: (nome) => api.get(`/materie/${nome}`),

  // POST nuova materia
  save: (materiaDTO) => api.post('/materie', materiaDTO),
};