import axios from 'axios';

// Change this if your backend runs on a different port
const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach the JWT token (if we have one) to every outgoing request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('skillfolio_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
