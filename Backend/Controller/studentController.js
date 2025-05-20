// controllers/studentController.js
const Student = require('../models/Student');

// Register new student
exports.registerStudent = async (req, res) => {
  try {
    const {
      studentId,
      studentFullName,
      class: studentClass,
      address,
      parents,
      
      attenderId,
      shift
    } = req.body;

    const newStudent = new Student({
      studentId,
      studentFullName,
      class: studentClass,
      address,
      parents,
      
      attenderId,
      shift
    });

    await newStudent.save();
    res.status(201).json({ message: 'Student registered successfully', student: newStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all students
// controllers/studentController.js
exports.getAllStudents = async (req, res) => {
  try {
    // if an admin, return everyone; otherwise, only your assigned students
    const filter = req.user.role === 'Admin'
      ? {}
      : { attenderId: req.user._id };

    const students = await Student
      .find(filter)
      .populate('attenderId', 'name');

    return res.json(students);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};


// Get student by studentId
exports.getStudentByStudentId = async (req, res) => {
  try {
    const student = await Student
      .findOne({ studentId: req.params.studentId.trim() })
      .populate('attenderId', 'name');

    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update student by studentId
exports.updateStudentByStudentId = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { studentId: req.params.studentId.trim() },
      req.body,
      { new: true }
    );

    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete student by studentId
exports.deleteStudentByStudentId = async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ studentId: req.params.studentId.trim() });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get student by MongoDB _id
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('attenderId', 'name');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) {
    console.error('Error fetching student by ID:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update student by MongoDB _id
exports.updateStudent = async (req, res) => {
  try {
    
    const updated = await Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true });
    console.log(req.params.studentId)
    if (!updated) return res.status(404).json({ message: 'Student not found' });
    res.json(updated);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete student by MongoDB _id
exports.deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// new: return students on this attender’s bus
exports.getStudentsForAttender = async (req, res) => {
  try {
    // req.user._id should be the Attender's MongoID
    const students = await Student
      .find({ attenderId: req.user._id })
      .populate('attenderId', 'name assignedBusNo');
    res.status(200).json(students);
  } catch (err) {
    console.error('Error fetching students for attender:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
