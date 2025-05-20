// controllers/busController.js
const Bus = require('../models/Bus');
const Driver = require('../models/Driver');
const Attender = require('../models/Attender');

// Create a new Bus
exports.createBus = async (req, res) => {
  try {
    const { busNo, route } = req.body;
    const existing = await Bus.findOne({ busNo });
    if (existing) {
      return res.status(400).json({ message: 'Bus number already exists' });
    }
    const bus = await Bus.create({ busNo, route });
    res.status(201).json(bus);
  } catch (error) {
    console.error('Error creating bus:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all Buses
exports.getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.status(200).json(buses);
  } catch (error) {
    console.error('Error fetching buses:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Bus by ID
exports.getBusByBusNo = async (req, res) => {
  try {
    const { busNo } = req.params;
    const bus = await Bus.findOne({ busNo });
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    return res.json(bus);
  } catch (error) {
    console.error('Error fetching bus by busNo:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// NEW: update by busNo
exports.updateBusByBusNo = async (req, res) => {
  try {
    const { busNo } = req.params;
    const updated = await Bus.findOneAndUpdate(
      { busNo },
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    return res.json(updated);
  } catch (error) {
    console.error('Error updating bus by busNo:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// NEW: delete by busNo
exports.deleteBusByBusNo = async (req, res) => {
  try {
    const { busNo } = req.params;
    const deleted = await Bus.findOneAndDelete({ busNo });
    if (!deleted) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    return res.json({ message: 'Bus deleted successfully' });
  } catch (error) {
    console.error('Error deleting bus by busNo:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get full details: Bus + Driver + Attender by busNo
exports.getBusDetailsByBusNo = async (req, res) => {
  try {
    const busNo = req.params.busNo;
    const bus = await Bus.findOne({ busNo });
    const driver = await Driver.findOne({ busAssignedNo: busNo });
    const attender = await Attender.findOne({ assignedBusNo: busNo });

    if (!bus || !driver || !attender) {
      return res.status(404).json({ message: 'Bus or associated driver/attender not found' });
    }

    res.status(200).json({ bus, driver, attender });
  } catch (error) {
    console.error('Error fetching bus details:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
