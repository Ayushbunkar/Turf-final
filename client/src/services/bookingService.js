import api from '../lib/api';

export async function fetchBookings(query='') {
  const res = await api.get(`/turfadmin/bookings${query ? `?${query}` : ''}`);
  return res.data;
}

export async function updateBookingStatus(id, payload) {
  const res = await api.patch(`/turfadmin/bookings/${id}`, payload);
  return res.data;
}

export async function exportBookings(query='') {
  const res = await api.get(`/turfadmin/bookings/export${query ? `?${query}` : ''}`);
  return res.data; // adjust if server returns file/blob
}
