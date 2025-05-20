const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const attenderSchema = new mongoose.Schema({
  attenderId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, default: 'Attender' },
  assignedBusNo: { type: String, required: true },
  contact: { type: String, required: true }
}, { timestamps: true });

// Hash password before saving
attenderSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
attenderSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Attender', attenderSchema);
