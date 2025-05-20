const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busNo: { type: String, required: true, unique: true },
  route: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Bus', busSchema);
