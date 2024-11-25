// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const Employer = require('../models/employer'); // Ensure this path is correct

// const router = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecret';

// // Middleware to authenticate JWT for protected routes
// const authenticateJWT = (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1];
  
//   if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
  
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.employer = decoded;
//     next();
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid token.' });
//   }
// };

// // Employer Registration Route
// router.post('/register', async (req, res) => {
//   try {
//     const { username, email, password, companyName } = req.body;
//     if (!username || !email || !password || !companyName) {
//       return res.status(400).json({ message: 'All fields are required.' });
//     }

//     // Check if employer already exists
//     const existingEmployer = await Employer.findOne({ email });
//     if (existingEmployer) {
//       return res.status(400).json({ message: 'Employer with this email already exists.' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new Employer instance
//     const newEmployer = new Employer({
//       username,
//       email,
//       password: hashedPassword,
//       companyName,
//     });

//     // Save to the Employer collection
//     await newEmployer.save();
//     res.status(201).json({ message: 'Employer registered successfully!' });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to register employer.', error: err.message });
//   }
// });

// // Employer Login Route
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if employer exists
//     const employer = await Employer.findOne({ email });
//     if (!employer) {
//       return res.status(400).json({ message: 'Invalid email or password.' });
//     }

//     // Verify password
//     const isMatch = await bcrypt.compare(password, employer.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid email or password.' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ id: employer._id, email: employer.email }, JWT_SECRET, { expiresIn: '1h' });
//     res.status(200).json({ message: 'Login successful!', token });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to login.', error: err.message });
//   }
// });

// // Get Employer Details (protected route)
// router.get('/profile', authenticateJWT, async (req, res) => {
//   try {
//     const employer = await Employer.findById(req.employer.id).select('-password');
//     if (!employer) {
//       return res.status(404).json({ message: 'Employer not found.' });
//     }
//     res.status(200).json(employer);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to retrieve employer details.', error: err.message });
//   }
// });


// // routes/employer.js

// // Add this route to get the list of all employers
// router.get('/', async (req, res) => {
//   try {
//     const employers = await Employer.find().select('-password'); // Exclude passwords
//     res.status(200).json(employers);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch employers.', error: err.message });
//   }
// });



// // Delete Employer Route
// router.delete('/:id', authenticateJWT, async (req, res) => {
//   try {
//     const employerId = req.params.id;

//     // Find and delete the employer by ID
//     const deletedEmployer = await Employer.findByIdAndDelete(employerId);

//     if (!deletedEmployer) {
//       return res.status(404).json({ message: 'Employer not found.' });
//     }

//     res.status(200).json({ message: 'Employer deleted successfully.' });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to delete employer.', error: err.message });
//   }
// });

// module.exports = router;


// Import necessary modules


const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Employer = require('../models/employer'); // Ensure this path is correct

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecret';

// Middleware to authenticate JWT for protected routes
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.employer = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
// Employer Registration Route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, companyName } = req.body;
    if (!username || !email || !password || !companyName) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if employer already exists
    const existingEmployer = await Employer.findOne({ email });
    if (existingEmployer) {
      return res.status(400).json({ message: 'Employer with this email already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new employer
    const newEmployer = new Employer({
      username,
      email,
      password: hashedPassword,
      companyName,
    });

    await newEmployer.save();
    console.log("New employer saved:", newEmployer); // Log the saved employer for verification

    res.status(201).json({ message: 'Employer registered successfully!', employer: newEmployer });
  } catch (err) {
    console.error("Error registering employer:", err); // Log any registration errors
    res.status(500).json({ message: 'Failed to register employer.', error: err.message });
  }
});




// Employer Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if employer exists
    const employer = await Employer.findOne({ email });
    if (!employer) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, employer.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: employer._id, email: employer.email }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful!', token });
  } catch (err) {
    res.status(500).json({ message: 'Failed to login.', error: err.message });
  }
});

// Get list of all employers (for admin access)
router.get('/', async (req, res) => {
  try {
    const employers = await Employer.find().select('-password'); // Exclude passwords for security
    if (!employers || employers.length === 0) {
      return res.status(404).json({ message: 'No employers found.' });
    }
    console.log("Employers retrieved:", employers); // Log the retrieved list
    res.status(200).json(employers);
  } catch (err) {
    console.error("Error fetching employers:", err); // Log any errors
    res.status(500).json({ message: 'Failed to fetch employers.', error: err.message });
  }
});



// Get list of all employers (for admin access)
router.get('/', async (req, res) => {
  try {
    const employers = await Employer.find().select('-password'); // Exclude passwords
    res.status(200).json(employers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch employers.', error: err.message });
  }
});

// Delete Employer Route

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployer = await Employer.findByIdAndDelete(id);

    if (!deletedEmployer) {
      return res.status(404).json({ message: 'Employer not found' });
    }

    res.status(200).json({ message: 'Employer deleted successfully' });
  } catch (error) {
    console.error('Error deleting employer:', error);
    res.status(500).json({ message: 'Error deleting employer', error });
  }
});


module.exports = router;


