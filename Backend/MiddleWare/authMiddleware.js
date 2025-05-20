
// // // middleware/authMiddleware.js
// // const jwt = require('jsonwebtoken');
// // const Admin = require('../models/Admin');

// // // Protect middleware: verify JWT and attach admin user
// // exports.protect = async (req, res, next) => {
// //   let token;
// //   if (
// //     req.headers.authorization &&
// //     req.headers.authorization.startsWith('Bearer')
// //   ) {
// //     try {
// //       token = req.headers.authorization.split(' ')[1];
// //       const decoded = jwt.verify(token, process.env.JWT_SECRET);

// //       // Load admin user
// //       req.user = await Admin.findById(decoded.id).select('-password');
// //       return next();
// //     } catch (err) {
// //       return res.status(401).json({ message: 'Not authorized, token failed' });
// //     }
// //   }
// //   res.status(401).json({ message: 'Not authorized, no token' });
// // };

// // // Admin only middleware
// // exports.adminOnly = (req, res, next) => {
// //   if (req.user && req.user.role === 'Admin') {
// //     return next();
// //   }
// //   res.status(403).json({ message: 'Access denied, admin only' });
// // };
// // middleware/authMiddleware.js
// const jwt = require('jsonwebtoken');
// const Admin = require('../models/Admin');
// const Attender = require('../models/Attender');
// const Driver = require('../models/Driver');

// exports.protect = async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     try {
//       token = req.headers.authorization.split(' ')[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Load the right model based on role
//       if (decoded.role === 'Admin') {
//         req.user = await Admin.findById(decoded.id).select('-password');
//       } else if (decoded.role === 'Attender') {
//         req.user = await Attender.findById(decoded.id).select('-password');
//       } else if (decoded.role === 'Driver') {
//         req.user = await Driver.findById(decoded.id).select('-password');
//       }

//       if (!req.user) {
//         return res.status(401).json({ message: 'User not found' });
//       }

//       next();
//     } catch (err) {
//       return res.status(401).json({ message: 'Not authorized, token failed' });
//     }
//   } else {
//     return res.status(401).json({ message: 'Not authorized, no token' });
//   }
// };

// // Admin-only stays the same
// exports.adminOnly = (req, res, next) => {
//   if (req.user && req.user.role === 'Admin') {
//     return next();
//   }
//   res.status(403).json({ message: 'Access denied, admin only' });
// };
// exports.attenderOnly = (req, res, next) => {
//   if (req.user.role !== 'Attender') {
//     return res.status(403).json({ message: 'Attenders only' });
//   }
//   next();
// };
const jwt      = require('jsonwebtoken');
const Admin    = require('../models/Admin');
const Attender = require('../models/Attender');
const Driver   = require('../models/Driver');

exports.protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // pick correct model
    let userModel;
    switch ((decoded.role || '').toLowerCase()) {
      case 'admin':    userModel = Admin; break;
      case 'attender': userModel = Attender; break;
      case 'driver':   userModel = Driver; break;
      default:
        return res.status(401).json({ message: 'Invalid role in token' });
    }
    req.user = await userModel.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }
    next();
  } catch (err) {
    console.error('Auth error:', err);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

exports.adminOnly = (req, res, next) => {
  if (req.user.role?.toLowerCase() === 'admin') {
    return next();
  }
  res.status(403).json({ message: 'Access denied, admin only' });
};

exports.attenderOnly = (req, res, next) => {
  if (req.user.role?.toLowerCase() === 'attender') {
    return next();
  }
  res.status(403).json({ message: 'Access denied, attenders only' });
};
