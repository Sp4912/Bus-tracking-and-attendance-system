// controllers/adminController.js
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// POST /api/admin/login
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Invalid email' });

    // Check role
    if (admin.role !== role) {
      return res.status(403).json({ message: 'Access denied for this role' });
    }

    // Verify password
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    // Generate JWT
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // after
res.json({
  token,
  user: {
    id: admin._id,
    role: admin.role
  }
});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
