// const express = require('express');
// const router = express.Router();
// const { registerAttender, loginAttender,updateAttender,
//     deleteAttender,getAllAttenders,getAttenderById } = require('../controllers/attenderController');
// const { protect, adminOnly } = require('../middleware/authMiddleware');

// // 🛡️ Register Attender (Admin only)
// router.post('/register', protect, adminOnly, registerAttender);

// // 🟢 Attender Login (public)
// router.post('/login', loginAttender);
// router.put('/:id', protect, adminOnly, updateAttender);
// router.delete('/:id', protect, adminOnly, deleteAttender);
// router.get('/', protect, adminOnly, getAllAttenders);
// router.get('/:attenderId', protect, adminOnly, getAttenderById);

// module.exports = router;
// routes/attenderRoutes.js
const express = require('express');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
  registerAttender,
  loginAttender,
  updateAttenderByAttenderId,
   deleteAttenderByAttenderId,
  getAllAttenders,
  getAttenderById
} = require('../controllers/attenderController');

const router = express.Router();

// Register & Login
router.post('/register',  registerAttender);
router.post('/login', loginAttender);

// Use attenderId param for the next routes:
router.put('/:attenderId', protect, adminOnly, updateAttenderByAttenderId);
 router.delete('/:attenderId', protect, adminOnly, deleteAttenderByAttenderId);
router.get('/', protect, adminOnly, getAllAttenders);
router.get('/:attenderId', protect, adminOnly, getAttenderById);

module.exports = router;
