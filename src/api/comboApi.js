import api from './axiosConfig';

export const comboApi = {

  // GET combo Materia
  getComboMateria: () => api.get('/combo/materia'),
};