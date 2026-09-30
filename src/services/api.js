/**
 * ShifoMed ERP - Frontend API Client
 * Connects to the Express backend (/api) with full error handling.
 */
const API_BASE = '/api';
async function fetchJson(url, options) {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });
  const data = await response.json();
  if (!response.ok || data.success === false) {
    throw new Error(data.error || "Server so'rovida xatolik yuz berdi");
  }
  return data.data;
}
export const authApi = {
  login: (data) => fetchJson('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  register: (data) => fetchJson('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  me: () => fetchJson('/auth/me'),
  logout: () => fetchJson('/auth/logout', { method: 'POST' }),
  portal: () => fetchJson('/portal'),
};

export const medicalApi = {
  // Stats & Logs
  getStats: () => fetchJson('/stats'),
  getLogs: () => fetchJson('/logs'),
  resetSampleData: () => fetchJson('/seed', { method: 'POST' }),
  // Patients (CRUD)
  getPatients: () => fetchJson('/patients'),
  getPatientById: (id) => fetchJson(`/patients/${id}`),
  createPatient: (data) => fetchJson('/patients', { method: 'POST', body: JSON.stringify(data) }),
  updatePatient: (id, data) => fetchJson(`/patients/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletePatient: (id) => fetchJson(`/patients/${id}`, { method: 'DELETE' }),
  // Doctors (CRUD)
  getDoctors: () => fetchJson('/doctors'),
  createDoctor: (data) => fetchJson('/doctors', { method: 'POST', body: JSON.stringify(data) }),
  updateDoctor: (id, data) => fetchJson(`/doctors/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteDoctor: (id) => fetchJson(`/doctors/${id}`, { method: 'DELETE' }),
  // Appointments (CRUD)
  getAppointments: () => fetchJson('/appointments'),
  createAppointment: (data) => fetchJson('/appointments', { method: 'POST', body: JSON.stringify(data) }),
  updateAppointment: (id, data) => fetchJson(`/appointments/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteAppointment: (id) => fetchJson(`/appointments/${id}`, { method: 'DELETE' }),
  // Medical Records (CRUD)
  getMedicalRecords: () => fetchJson('/records'),
  createMedicalRecord: (data) => fetchJson('/records', { method: 'POST', body: JSON.stringify(data) }),
  updateMedicalRecord: (id, data) => fetchJson(`/records/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteMedicalRecord: (id) => fetchJson(`/records/${id}`, { method: 'DELETE' }),
  // Prescriptions (CRUD)
  getPrescriptions: () => fetchJson('/prescriptions'),
  createPrescription: (data) => fetchJson('/prescriptions', { method: 'POST', body: JSON.stringify(data) }),
  updatePrescription: (id, data) => fetchJson(`/prescriptions/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletePrescription: (id) => fetchJson(`/prescriptions/${id}`, { method: 'DELETE' }),
  // Lab Tests (CRUD)
  getLabTests: () => fetchJson('/lab-tests'),
  createLabTest: (data) => fetchJson('/lab-tests', { method: 'POST', body: JSON.stringify(data) }),
  updateLabTest: (id, data) => fetchJson(`/lab-tests/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteLabTest: (id) => fetchJson(`/lab-tests/${id}`, { method: 'DELETE' }),
  // Invoices (CRUD)
  getInvoices: () => fetchJson('/invoices'),
  createInvoice: (data) => fetchJson('/invoices', { method: 'POST', body: JSON.stringify(data) }),
  updateInvoice: (id, data) => fetchJson(`/invoices/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteInvoice: (id) => fetchJson(`/invoices/${id}`, { method: 'DELETE' }),
  // Wards (CRUD + Admit/Discharge)
  getWards: () => fetchJson('/wards'),
  createWard: (data) => fetchJson('/wards', { method: 'POST', body: JSON.stringify(data) }),
  updateWard: (id, data) => fetchJson(`/wards/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  admitToWard: (wardId, patient) =>
    fetchJson(`/wards/${wardId}/admit`, { method: 'POST', body: JSON.stringify(patient) }),
  dischargeFromWard: (wardId, patientId) =>
    fetchJson(`/wards/${wardId}/discharge`, { method: 'POST', body: JSON.stringify({ patientId }) }),
  deleteWard: (id) => fetchJson(`/wards/${id}`, { method: 'DELETE' }),
  // Inventory (CRUD)
  getInventory: () => fetchJson('/inventory'),
  createInventoryItem: (data) => fetchJson('/inventory', { method: 'POST', body: JSON.stringify(data) }),
  updateInventoryItem: (id, data) => fetchJson(`/inventory/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteInventoryItem: (id) => fetchJson(`/inventory/${id}`, { method: 'DELETE' }),
  // Services (CRUD)
  getServices: () => fetchJson('/services'),
  createService: (data) => fetchJson('/services', { method: 'POST', body: JSON.stringify(data) }),
  updateService: (id, data) => fetchJson(`/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteService: (id) => fetchJson(`/services/${id}`, { method: 'DELETE' }),
};
