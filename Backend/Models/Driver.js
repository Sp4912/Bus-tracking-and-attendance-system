// models/Driver.js
const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  driverId: { type: String, required: true, unique: true },     // Unique driver ID
  name: { type: String, required: true },                        // Driver's name
  contact: { type: String, required: true },                     // Driver's contact number
  busAssignedNo: { type: String, required: true },               // Assigned bus number
  route: { type: String, required: true }                         // Route assigned to the driver
}, { timestamps: true });

// Export Driver model
module.exports = mongoose.model('Driver', driverSchema);
