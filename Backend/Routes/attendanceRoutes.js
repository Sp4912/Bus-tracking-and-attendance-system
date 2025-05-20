// routes/attendanceRoutes.js
const express = require('express');
const router  = express.Router();
const {
  markAttendance,
  getAllAttendance,
  getAttendanceById,
  getMyBusStudents,
  getMyAttendanceRecords
} = require('../controllers/attendanceController');
const { protect, attenderOnly, adminOnly } = require('../middleware/authMiddleware');

// 1) Attender marks attendance
router.post(
  '/',
  protect,
  attenderOnly,
  markAttendance
);

// 2) Attender: list students on *your* bus
router.get(
  '/students/my-bus',
  protect,
  attenderOnly,             // <— enforce attender role
  getMyBusStudents
);

// 3) Attender: list *your* attendance records
router.get(
  '/mine',
  protect,
  attenderOnly,             // <— enforce attender role
  getMyAttendanceRecords
);

// 4) Admin: view all records
router.get(
  '/',
  protect,
  adminOnly,
  getAllAttendance
);

// 5) Admin: view single record
router.get(
  '/:id',
  protect,
  adminOnly,
  getAttendanceById
);

module.exports = router;
