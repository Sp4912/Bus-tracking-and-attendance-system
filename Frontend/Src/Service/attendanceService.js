import API from './api';

// fetch all students for this Attender’s bus
export function fetchMyBusStudents() {
  return API.get('/attendance/students/my-bus');
}

// post a new attendance record
export function postAttendanceRecord(payload) {
  return API.post('/attendance', payload);
}

// fetch all attendance records created by this Attender
export function fetchMyAttendanceRecords() {
  return API.get('/attendance/mine');
}

// fetch a single record (admin or own record)
export function fetchAttendanceById(id) {
  return API.get(`/attendance/${id}`);
}
