import api from '../lib/api';

export async function fetchAdminStats() {
  const res = await api.get('/admin/stats');
  return res.data;
}

export async function fetchRecentActivities() {
  const res = await api.get('/admin/recent-activities');
  return res.data;
}

export async function fetchAdminAnalytics() {
  const res = await api.get('/admin/analytics');
  return res.data;
}

export async function fetchAdminProfile() {
  const res = await api.get('/admin/me');
  return res.json ? res.json() : res.data; // fallback if fetch replaced
}

export async function updateAdminProfile(payload) {
  const res = await api.put('/admin/update-profile', payload);
  return res.data;
}

export async function changeAdminPassword(payload) {
  const res = await api.post('/admin/change-password', payload);
  return res.data;
}
