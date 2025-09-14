import api from '../lib/api';

// Turf Admin domain API helpers
export async function fetchTurfs() {
  const res = await api.get('/turfadmin/turfs');
  return res.data;
}

export async function createTurf(data) {
  const res = await api.post('/turfadmin/turfs', data);
  return res.data;
}

export async function updateTurf(id, data) {
  const res = await api.put(`/turfadmin/turfs/${id}`, data);
  return res.data;
}

export async function deleteTurf(id) {
  const res = await api.delete(`/turfadmin/turfs/${id}`);
  return res.data;
}

export async function fetchTurfAdminStats() {
  const res = await api.get('/turfadmin/stats');
  return res.data;
}

export async function fetchTurfAdminDashboard() {
  const res = await api.get('/turfadmin/dashboard');
  return res.data;
}
