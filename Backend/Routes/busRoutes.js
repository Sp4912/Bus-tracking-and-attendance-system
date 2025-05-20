// routes/busRoutes.js
const express = require('express');
const router  = express.Router();
const {
  createBus,
  getAllBuses,
  // old getBusById, updateBus, deleteBus can remain if you still want them:
  // getBusById,
  // updateBus,
  // deleteBus,
  getBusDetailsByBusNo,
  getBusByBusNo,
  updateBusByBusNo,
  deleteBusByBusNo
} = require('../controllers/busController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Create
router.post('/', protect, adminOnly, createBus);

// List all
router.get('/', getAllBuses);

// Full details (bus + driver + attender)
router.get('/details/:busNo', getBusDetailsByBusNo);

// Get a single bus by its busNo
router.get('/busno/:busNo', getBusByBusNo);

// Update by busNo
router.put('/busno/:busNo', protect, adminOnly, updateBusByBusNo);

// Delete by busNo
router.delete('/busno/:busNo', protect, adminOnly, deleteBusByBusNo);

module.exports = router;
