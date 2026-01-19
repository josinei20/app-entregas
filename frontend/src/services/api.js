import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000  // 10 segundos é suficiente
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Token expirado ou inválido
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Não fazer redirect automático para deixar a UI tratar
      return Promise.reject({ ...error, isAuthError: true });
    }

    // Erro de rede
    if (!error.response) {
      console.error('Erro de conexão com o servidor');
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
