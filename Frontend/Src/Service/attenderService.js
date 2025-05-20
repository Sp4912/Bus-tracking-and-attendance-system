import API from './api';

// POST /api/attenders/register
export function registerAttender(data) {
  return API.post('/attenders/register', data);
}

// POST /api/attenders/login
// src/services/attenderService.js


// POST /api/attenders/login
export function loginAttender({ email, password }) {
  // include role so backend authorizes correctly
  return API.post('/attenders/login', { email, password, role: 'Attender' });
}

// GET /api/attenders
export function getAllAttenders() {
  return API.get('/attenders');
}

// GET /api/attenders/:attenderId
export function getAttenderById(attenderId) {
  return API.get(`/attenders/${attenderId}`);
}

// PUT /api/attenders/:id
export function updateAttender(id, data) {
  return API.put(`/attenders/${id}`, data);
}

// DELETE /api/attenders/:id
export function deleteAttender(id) {
  return API.delete(`/attenders/${id}`);
}
