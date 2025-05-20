// models/Attendance.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },

  // renamed to match controller payload:
  boardingHome:   { type: Date, default: null },
  boardingSchool: { type: Date, default: null },
  droppingSchool: { type: Date, default: null },
  droppingHome:   { type: Date, default: null },

  status: {
    type: String,
    enum: ['Present', 'Absent'],
    required: true,
  },
  markedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attender',
    required: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Attendance', attendanceSchema);
