const Attender = require('../models/Attender');
const jwt = require('jsonwebtoken');

// Register Attender (Admin only)
exports.registerAttender = async (req, res) => {
    try {
      const { attenderId, name, email, password, role, assignedBusNo, contact } = req.body;
  
      // Check if attender already exists
      const existingAttender = await Attender.findOne({ email });
      if (existingAttender) {
        return res.status(400).json({ message: 'Attender already exists with this email' });
      }
  
      // Create new attender
      const attender = new Attender({
        attenderId,
        name,
        email,
        password,
        role,
        assignedBusNo,
        contact,
      });
  
      await attender.save();
      res.status(201).json({ message: 'Attender registered successfully', attender });
  
    } catch (error) {
      console.error('Error registering attender:', error); // More detailed error logging
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  

// Login Attender
exports.loginAttender = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const attender = await Attender.findOne({ email });
    if (!attender) return res.status(401).json({ message: 'Invalid email' });

    if (attender.role.toLowerCase() !== (role || '').toLowerCase()) {
      return res.status(403).json({ message: 'Access denied for this role' });
    }

    const isMatch = await attender.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign(
      { id: attender._id, role: attender.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      token,
      attender: {
        id: attender._id,
        attenderId: attender.attenderId,
        name: attender.name,
        email: attender.email,
        role: attender.role,
        assignedBusNo: attender.assignedBusNo,
        contact: attender.contact
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// PUT /api/attenders/:id - Update attender by ID
// exports.updateAttender = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedAttender = await Attender.findByIdAndUpdate(   { attenderId }, req.body, { new: true });
//     if (!updatedAttender) {
//       return res.status(404).json({ message: 'Attender not found' });
//     }
//     res.status(200).json({ message: 'Attender updated successfully', attender: updatedAttender });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// // DELETE /api/attenders/:id - Delete attender by ID
// exports.deleteAttender = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await Attender.findByIdAndDelete(attenderId);
//     if (!deleted) {
//       return res.status(404).json({ message: 'Attender not found' });
//     }
//     res.status(200).json({ message: 'Attender deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };
// @desc    Get all attenders
// @route   GET /api/attenders
// @access  Admin only

// controllers/attenderController.js


// Replace your updateAttender/deleteAttender exports with:

// PUT /api/attenders/:attenderId
exports.updateAttenderByAttenderId = async (req, res) => {
  try {
    const { attenderId } = req.params;
    const updated = await Attender.findOneAndUpdate(
      { attenderId },
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Attender not found' });
    }
    res.json({ message: 'Attender updated', attender: updated });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE /api/attenders/:attenderId
exports.deleteAttenderByAttenderId = async (req, res) => {
  try {
    const { attenderId } = req.params;
    const deleted = await Attender.findOneAndDelete({ attenderId });
    if (!deleted) {
      return res.status(404).json({ message: 'Attender not found' });
    }
    res.json({ message: 'Attender deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllAttenders = async (req, res) => {
  try {
    const attenders = await Attender.find();
    res.status(200).json(attenders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get attender by ID
// @route   GET /api/attenders/:attenderId
// @access  Admin only
exports.getAttenderById = async (req, res) => {
  try {
    const attender = await Attender.findOne({ attenderId: req.params.attenderId });
    if (!attender) {
      return res.status(404).json({ message: 'Attender not found' });
    }
    res.status(200).json(attender);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
