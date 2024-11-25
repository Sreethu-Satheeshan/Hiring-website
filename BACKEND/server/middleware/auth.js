const jwt = require('jsonwebtoken');
const JWT_SECRET = 'sreethu';

// const auth = (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1];
  
//   if (!token) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }
  
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.employer = decoded; // `decoded` should contain `id` from token payload
//     next();
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid token.' });
//   }
// };



// const auth = (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');
//   if (!token) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.employer = decoded;
//     next();
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid token.' });
//   }
// };

// Middleware to authenticate JWT for protected routes
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.employer = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};



module.exports = auth;

//.....................................................................


// const jwt = require('jsonwebtoken');
// const User = require('../models/User'); // Assuming you're using a User model

// const JWT_SECRET = 'sreethu'; // Or you can use process.env.JWT_SECRET for better security

// // General Authentication Middleware (for any user)
// const auth = (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');
//   if (!token) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);  // Use your JWT_SECRET or environment variable
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid token.' });
//   }
// };

// // Admin Authentication Middleware (checks if the user is admin)
// const adminAuth = async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1]; // Extract token from header
//   if (!token) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET); // Use your JWT_SECRET or environment variable
//     req.user = decoded;

//     // Check if user is admin
//     const user = await User.findById(req.user.id);
//     if (!user || user.userType !== 'admin') {
//       return res.status(403).json({ message: 'Access denied. Admins only.' });
//     }

//     next();
//   } catch (error) {
//     res.status(400).json({ message: 'Invalid token.' });
//   }
// };

// module.exports = { auth, adminAuth };



//................................................................................



// const jwt = require('jsonwebtoken');
// const User = require('../models/User'); // Assuming you're using a User model

// const JWT_SECRET = process.env.JWT_SECRET || 'sreethu'; // Use environment variable for better security

// // General Authentication Middleware (for any user)
// const auth = (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');
//   if (!token) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);  // Use your JWT_SECRET or environment variable
//     req.user = decoded;
//     next();
//   } catch (err) {
//     console.error(err.stack);
//     res.status(400).json({ message: 'Invalid token.' });
//   }
// };

// // Admin Authentication Middleware (checks if the user is admin)
// const adminAuth = async (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');
//   if (!token) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET); // Use your JWT_SECRET or environment variable
//     req.user = decoded;

//     // Check if user is admin
//     const user = await User.findById(req.user.id);
//     if (!user || user.userType !== 'admin') {
//       return res.status(403).json({ message: 'Access denied. Admins only.' });
//     }

//     next();
//   } catch (error) {
//     console.error(error.stack);
//     res.status(400).json({ message: 'Invalid token.' });
//   }
// };

// module.exports = { auth, adminAuth };

