import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4500/api',
  withCredentials: true,
});

// Attach auth token from localStorage for every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Basic error interceptor (optional logging)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // You can unify toast handling here if desired
    return Promise.reject(err);
  }
);

export default api;
