// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { check, validationResult } = require('express-validator');
// const User = require('../models/User'); // Candidate collection
// const Employer = require('../models/employer'); 

// // Employer collection

// const router = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET || 'sreethu';

// // Register route
// router.post(
//   '/register',
//   [
//     check('username', 'Username is required').not().isEmpty(),
//     check('email', 'Please include a valid email').isEmail(),
//     check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
//     // check('companyName', 'Company name is required for employers').optional().not().isEmpty()
//      // Optional check for companyName
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { username, email, password, companyName } = req.body;

//     try {
//       // Check if the user or employer already exists
//       const existingUser = await User.findOne({ email });
//       const existingEmployer = await Employer.findOne({ email });

//       if (existingUser || existingEmployer) {
//         return res.status(400).json({ message: 'User or employer already exists' });
//       }

//       // Hash the password
//       const hashedPassword = await bcrypt.hash(password, 10);

//       let newUser;

//       // Determine which model to use based on whether companyName is provided
//       if (companyName) {
//         // If companyName is provided, save as Employer
//         newUser = new Employer({
//           username,
//           email,
//           password: hashedPassword,
//           companyName
//         });
//       } else {
//         // Save as User if no companyName is provided
//         newUser = new User({
//           username,
//           email,
//           password: hashedPassword
//         });
//       }

//       await newUser.save();

//       // Create a JWT payload and sign it
//       const payload = { id: newUser.id };
//       const token = jwt.sign(payload, JWT_SECRET, {
//         expiresIn: '1h'
//       });

//       // Send response with token
//       res.status(201).json({ token, userId: newUser.id });
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server error');
//     }
//   }
// );

// // Login route
// // router.post(
// //   '/login',
// //   [

// //     check('email', 'Please include a valid email').isEmail(),
// //     check('password', 'Password is required').exists(),
// //     check('userType', 'User type is required').isIn(['candidate', 'employer']) // Add validation for user type
// //   ],
// //   async (req, res) => {
// //     const errors = validationResult(req);
// //     if (!errors.isEmpty()) {
// //       return res.status(400).json({ errors: errors.array() });
// //     }

// //     const { email, password, userType } = req.body;

// //     try {
// //       // Determine collection based on userType
// //       let user;
// //       if (userType === 'candidate') {
// //         console.log('Attempting to find candidate in User collection');
// //         user = await User.findOne({ email });
// //       } else if (userType === 'employer') {
// //         console.log('Attempting to find employer in Employer collection');
// //         user = await Employer.findOne({ email });
// //       }

// //       if (!user) {
// //         console.log('User not found in specified collection');
// //         return res.status(400).json({ message: 'Invalid credentials' });
// //       }

// //       // Verify password
// //       const isMatch = await bcrypt.compare(password, user.password);
// //       if (!isMatch) {
// //         console.log('Password mismatch');
// //         return res.status(400).json({ message: 'Invalid credentials' });
// //       }

// //       // Create a JWT token and respond with it
// //       const payload = { id: user.id, userType }; // Include user type in payload
// //       const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

// //       // Respond with token and additional employer info if applicable
// //       const response = { token };
// //       if (userType === 'employer') {
// //         response.companyName = user.companyName;
// //       }

// //       console.log('Login successful');
// //       res.json(response);
// //     } catch (err) {
// //       console.error(err.message);
// //       res.status(500).send('Server error');
// //     }
// //   }
// // );

// // module.exports = router;

// router.post(
//   '/login',
//   [
//     check('email', 'Please include a valid email').isEmail(),
//     check('password', 'Password is required').exists(),
//     check('userType', 'User type is required').isIn(['candidate', 'employer']) // Validate user type
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password, userType } = req.body;

//     try {
//       // Determine collection based on userType
//       let user;
//       if (userType === 'candidate') {
//         console.log('Attempting to find candidate in User collection');
//         user = await User.findOne({ email });
//       } else if (userType === 'employer') {
//         console.log('Attempting to find employer in Employer collection');
//         user = await Employer.findOne({ email });
//       }

//       if (!user) {
//         console.log('User not found in specified collection');
//         return res.status(400).json({ message: 'Invalid credentials' });
//       }

//       // Verify password
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         console.log('Password mismatch');
//         return res.status(400).json({ message: 'Invalid credentials' });
//       }

//       // Create a JWT token and respond with it
//       const payload = { id: user.id, userType }; // Include user type in payload
//       const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

//       // Respond with token, name, and additional employer info if applicable
//       const response = { token, name: user.username || user.name }; // Assuming `username` or `name` stores the user's name
//       if (userType === 'employer') {
//         response.companyName = user.companyName;
//       }

//       console.log('Login successful');
//       res.json(response);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server error');
//     }
//   }
// );

// module.exports = router;

//...........................................................

// authRoute.js
// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { check, validationResult } = require('express-validator');
// const User = require('../models/User'); // Assuming 'User' is the candidate collection
// const Employer = require('../models/employer'); // Assuming 'Employer' is the employer collection

// const router = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET || 'sreethu';

// // Register route
// router.post(
//   '/register',
//   [
//     check('username', 'Username is required').not().isEmpty(),
//     check('email', 'Please include a valid email').isEmail(),
//     check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { username, email, password, companyName } = req.body;

//     try {
//       // Check if user or employer already exists
//       const existingUser = await User.findOne({ email });
//       const existingEmployer = await Employer.findOne({ email });

//       if (existingUser || existingEmployer) {
//         return res.status(400).json({ message: 'User or employer already exists' });
//       }

//       // Hash the password
//       const hashedPassword = await bcrypt.hash(password, 10);

//       let newUser;
//       if (companyName) {
//         // Register as Employer if companyName is provided
//         newUser = new Employer({
//           username,
//           email,
//           password: hashedPassword,
//           companyName
//         });
//       } else {
//         // Register as User if no companyName is provided
//         newUser = new User({
//           username,
//           email,
//           password: hashedPassword,
//           disability,
//         });
//       }

//       await newUser.save();

//       // Create a JWT token
//       const payload = { id: newUser.id };
//       const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

//       res.status(201).json({ token, userId: newUser.id });
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server error');
//     }
//   }
// );

// // Login route
// router.post(
//   '/login',
//   [
//     check('email', 'Please include a valid email').isEmail(),
//     check('password', 'Password is required').exists(),
//     check('userType', 'User type is required').isIn(['candidate', 'employer'])
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password, userType } = req.body;

//     try {
//       // Check user type and retrieve the correct user
//       let user;
//       if (userType === 'candidate') {
//         user = await User.findOne({ email });
//       } else if (userType === 'employer') {
//         user = await Employer.findOne({ email });
//       }

//       if (!user) {
//         return res.status(400).json({ message: 'Invalid credentials' });
//       }

//       // Verify password
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(400).json({ message: 'Invalid credentials' });
//       }

//       // Create a JWT token
//       const payload = { id: user.id, userType };
//       const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

//       const response = { token, name: user.username || user.name };
//       if (userType === 'employer') {
//         response.companyName = user.companyName;
//       }

//       res.json(response);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server error');
//     }
//   }
// );

// module.exports = router;

//..............................................................................

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Employer = require('../models/employer');
const JWT_SECRET = process.env.JWT_SECRET || 'sreethu';

router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, disabilityType, companyName, userType } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      const existingEmployer = await Employer.findOne({ email });

      if (existingUser || existingEmployer) {
        return res.status(400).json({ message: 'User or employer already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      let newUser;

      if (userType === 'employer') {
        newUser = new Employer({
          username,
          email,
          password: hashedPassword,
          companyName
        });
      } else {
        newUser = new User({
          username,
          email,
          password: hashedPassword,
          disabilityType,
          userType,
          
        });
      }

      await newUser.save();

      const payload = { id: newUser.id };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({ token, userId: newUser.id });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);


// Login route

router.post('/login', async (req, res) => {
  const { email, password, userType } = req.body;

  // Find the user in the database
  let user;
  if (userType === 'candidate') {
    user = await User.findOne({ email });
  } else if (userType === 'employer') {
    user = await Employer.findOne({ email });
  }

  if (!user) {
    return res.status(400).json({ message: 'User not found with provided credentials.' });
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Password mismatch.' });
  }

  // Generate JWT token (example)
  const token = jwt.sign({ id: user._id, name: user.username }, 'sreethu', {
    expiresIn: '1h',
  });

  res.json({ token, name: user.username });
});

module.exports = router;
