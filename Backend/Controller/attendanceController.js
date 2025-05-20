// controllers/attendanceController.js
const Attendance = require('../models/Attendance');
const Student    = require('../models/Student');
const { sendSMS }= require('../utils/notificationHelper');

function convertTimeStringToDate(timeStr) {
  if (!timeStr) return null;
  const [h,m] = timeStr.split(':').map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}

exports.markAttendance = async (req, res) => {
  try {
    const {
      studentId,
      date = Date.now(),
      boardingHome,
      boardingSchool,
      droppingSchool,
      droppingHome,
      status
    } = req.body;

    const dayOnly = new Date(date);
    dayOnly.setHours(0,0,0,0);

    const query = { student: studentId, date: dayOnly };
    const update = {
      $setOnInsert: { student: studentId, date: dayOnly, markedBy: req.user._id, status },
      $set: {
        ...(boardingHome   && { boardingHome:   convertTimeStringToDate(boardingHome)   }),
        ...(boardingSchool && { boardingSchool: convertTimeStringToDate(boardingSchool) }),
        ...(droppingSchool && { droppingSchool: convertTimeStringToDate(droppingSchool) }),
        ...(droppingHome   && { droppingHome:   convertTimeStringToDate(droppingHome)   }),
      }
    };

    const attendance = await Attendance.findOneAndUpdate(
      query, update,
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    if (status === 'Present') {
      const student = await Student.findById(studentId).select('studentFullName parents');
      const msgDate = dayOnly.toLocaleDateString();
      const phases = [
        ['boardingHome',   'boarded from home at'],
        ['boardingSchool', 'boarded at school at'],
        ['droppingSchool', 'dropped at school at'],
        ['droppingHome',   'dropped at home at']
      ];
      for (const [field, text] of phases) {
        if (attendance[field]) {
          const t = attendance[field].toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
          const msg = `Your child ${student.studentFullName} ${text} ${t} on ${msgDate}.`;
          student.parents.forEach(p => sendSMS(p.contact, msg));
        }
      }
    }

    return res.status(201).json(attendance);
  } catch (err) {
    console.error('Error marking attendance:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// Attender-only: list your students
exports.getMyBusStudents = async (req, res) => {
  try {
    const students = await Student
      .find({ attenderId: req.user._id })
      .select('studentFullName class address shift');
    return res.json(students);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Attender-only: list your attendance records
exports.getMyAttendanceRecords = async (req, res) => {
  try {
    const records = await Attendance
      .find({ markedBy: req.user._id })
      .populate('student', 'studentFullName')
      .sort({ date: -1 });
    return res.json(records);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Admin-only: view all
// controllers/attendanceController.js

exports.getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance
      .find()
      // include `class` on the student
      .populate('student', 'studentFullName studentId class')
      .populate('markedBy', 'name');
    return res.json(records);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};



// Admin-only: view one
exports.getAttendanceById = async (req, res) => {
  try {
    const rec = await Attendance
      .findById(req.params.id)
      .populate('student', 'studentFullName studentId')
      .populate('markedBy', 'name');
    if (!rec) return res.status(404).json({ message: 'Not found' });
    res.json(rec);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
