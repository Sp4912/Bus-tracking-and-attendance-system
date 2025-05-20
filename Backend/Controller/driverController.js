const Driver = require('../models/Driver');

// POST /api/drivers/register - Admin can register a new driver
exports.registerDriver = async (req, res) => {
  try {
    const { driverId, name, contact, busAssignedNo, route } = req.body;

    // Check if driver already exists
    const existingDriver = await Driver.findOne({ driverId });
    if (existingDriver) {
      return res.status(400).json({ message: 'Driver ID already exists' });
    }

    // Create new driver
    const newDriver = new Driver({ driverId, name, contact, busAssignedNo, route });
    await newDriver.save();

    res.status(201).json({ message: 'Driver registered successfully', driver: newDriver });
  } catch (error) {
    console.error('Error registering driver:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/drivers/:driverId - Update Driver by business-key
exports.updateDriver = async (req, res) => {
  try {
    const { driverId } = req.params;
    const updatedDriver = await Driver.findOneAndUpdate(
      { driverId },
      req.body,
      { new: true }
    );
    if (!updatedDriver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.json({ message: 'Driver updated', driver: updatedDriver });
  } catch (error) {
    console.error('Error updating driver:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE /api/drivers/:driverId - Delete Driver
exports.deleteDriver = async (req, res) => {
  try {
    const { driverId } = req.params;
    const deletedDriver = await Driver.findOneAndDelete({ driverId });
    if (!deletedDriver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.json({ message: 'Driver deleted successfully' });
  } catch (error) {
    console.error('Error deleting driver:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/drivers - Get all drivers (Admin only)
exports.getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  } catch (error) {
    console.error('Error fetching drivers:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/drivers/:driverId - Get driver by business-key
exports.getDriverByDriverId = async (req, res) => {
  try {
    const { driverId } = req.params;
    const driver = await Driver.findOne({ driverId });
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.status(200).json(driver);
  } catch (error) {
    console.error('Error fetching driver by driverId:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
