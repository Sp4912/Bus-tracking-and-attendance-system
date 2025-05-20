import API from './api';

// POST /api/admin/login
// export function loginAdmin({ email, password, role }) {
//   return API.post('/admin/login', { email, password, role });
// }
// services/adminService.js
export function loginAdmin(adminData) {
    return API.post('/admin/login', adminData);
  }
  