import api from '../lib/api';

/**
 * Auth related API calls
 */
export async function loginRequest(email, password) {
  const res = await api.post('/auth/login', { email, password });
  return res.data; // { token, user }
}

export async function registerRequest(data) {
  const res = await api.post('/auth/register', data);
  return res.data;
}

export async function meRequest() {
  const res = await api.get('/auth/me');
  return res.data.user || res.data;
}
