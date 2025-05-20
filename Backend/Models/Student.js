const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true }
});

const shiftSchema = new mongoose.Schema({
  morningShift: { type: Boolean, default: false },
  afternoonShift: { type: Boolean, default: false }
});

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  studentFullName: { type: String, required: true },
  class: { type: String, required: true },
  address: { type: String, required: true },
  parents: [parentSchema],
  busNo: { type: String, required: false,default:null },
  attenderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Attender', required: true },
  shift: shiftSchema
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
