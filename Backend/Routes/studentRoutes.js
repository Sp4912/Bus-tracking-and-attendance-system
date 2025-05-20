// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const {
   registerStudent,
    getAllStudents,
    getStudentByStudentId,
    updateStudentByStudentId,
    deleteStudentByStudentId,
    getStudentById,
    updateStudent,
    deleteStudent,
    getStudentsForAttender      // ← new export
  } = require('../controllers/studentController');
  const { protect, adminOnly, attenderOnly } = require('../middleware/authMiddleware');
// GET /api/students/my-bus
// Attender only: returns only those students on this attender’s bus
router.get(
  '/my-bus',
  protect,                // must be logged in
  attenderOnly,           // new middleware that enforces role==='attender'
  getStudentsForAttender  // new controller function
);



// POST - Register student
router.post('/register', protect, adminOnly, registerStudent);

// GET all students
router.get('/', protect, adminOnly, getAllStudents);
// Business key routes using studentId
router.get('/sid/:studentId', protect, adminOnly, getStudentByStudentId);
router.put('/sid/:studentId', protect, adminOnly, updateStudentByStudentId);
router.delete('/sid/:studentId', protect, adminOnly, deleteStudentByStudentId);

// Fallback routes using MongoDB _id
router.get('/:id', protect, adminOnly, getStudentById);
router.put('/:id', protect, adminOnly, updateStudent);
router.delete('/:id', protect, adminOnly, deleteStudent);


module.exports = router;
