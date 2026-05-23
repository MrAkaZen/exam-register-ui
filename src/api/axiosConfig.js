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