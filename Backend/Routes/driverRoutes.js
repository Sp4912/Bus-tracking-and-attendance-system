// routes/driverRoutes.js
const express = require('express');
const router = express.Router();
const {
  registerDriver,
  updateDriver,
  deleteDriver,
  getAllDrivers,
  getDriverByDriverId   // ← correct name here
} = require('../controllers/driverController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Register a new driver (Admin only)
router.post('/register', protect, adminOnly, registerDriver);

// Update an existing driver by business-key driverId
router.put('/:driverId', protect, adminOnly, updateDriver);

// Delete a driver by business-key driverId
router.delete('/:driverId', protect, adminOnly, deleteDriver);

// Get all drivers
router.get('/', protect, adminOnly, getAllDrivers);

// Get single driver by business-key driverId
router.get('/:driverId', protect, adminOnly, getDriverByDriverId);

module.exports = router;
