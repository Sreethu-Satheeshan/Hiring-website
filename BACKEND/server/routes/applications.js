// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const Application = require('../models/Application');
// const router = express.Router();

// // Set up storage for multer to specify upload destination and filename format
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, '../uploads');
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + '-' + file.originalname);
//   },
// });

// // Set up multer middleware to handle file uploads for specified fields
// const upload = multer({ storage });

// // POST endpoint for submitting an application
// router.post(
//   '/',
//   upload.fields([
//     { name: 'disabilityCertificate', maxCount: 1 },
//     { name: 'resume', maxCount: 1 },
//   ]),
//   async (req, res) => {
//     console.log("POST /api/applications route hit");

//     try {
//       // Destructure all form data
//       const { name, email, phoneNumber, gender, qualification, disabilityType, workMode } = req.body;

//       // Check if files are present in the request
//       const disabilityCertificate = req.files['disabilityCertificate'] ? req.files['disabilityCertificate'][0].path : null;
//       const resume = req.files['resume'] ? req.files['resume'][0].path : null;

//       // Validate required fields
//       if (!name || !email || !phoneNumber || !gender || !qualification || !disabilityType || !workMode || !disabilityCertificate || !resume) {
//         return res.status(400).json({ message: 'All fields are required, including files.' });
//       }

//       // Create a new application instance with form data and file paths
//       const newApplication = new Application({
//         name,
//         email,
//         phoneNumber,
//         gender,
//         qualification,
//         disabilityType,
//         workMode, // Save workMode
//         disabilityCertificate,
//         resume,
//       });

//       // Save the application to MongoDB
//       await newApplication.save();

//       // Respond with success message
//       res.status(201).json({ message: 'Application submitted successfully.' });
//     } catch (err) {
//       console.error('Error submitting application:', err.message, err.stack);
//       res.status(500).json({ message: 'An unexpected error occurred.' });
//     }
//   }
// );

// // GET endpoint to fetch all candidates
// router.get('/candidates', async (req, res) => {
//   try {
//     const candidates = await Application.find(); // Fetch all applications from the database
//     res.json(candidates); // Return the list of applications
//   } catch (err) {
//     console.error('Error fetching candidates:', err.message, err.stack);
//     res.status(500).json({ message: 'Error fetching candidates' });
//   }
// });


// router.get('/uploaded-files', async (req, res) => {
//   try {
//     const applications = await Application.find({}, 'name disabilityCertificate resume');
//     res.status(200).json(applications);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching files', error });
//   }
// });

// module.exports = router;

//...................................................................

// routes/applicationRoutes.js

// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const Application = require('../models/Application');
// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, '../uploads');
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage });

// router.post(
//   '/',
//   upload.fields([
//     { name: 'disabilityCertificate', maxCount: 1 },
//     { name: 'resume', maxCount: 1 },
//   ]),
//   async (req, res) => {
//     console.log("POST /api/applications route hit");

//     try {
//       const { name, email, phoneNumber, gender, qualification, disabilityType, workMode, companyName, jobTitle} = req.body;

//       const disabilityCertificate = req.files['disabilityCertificate'] ? req.files['disabilityCertificate'][0].path : null;
//       const resume = req.files['resume'] ? req.files['resume'][0].path : null;

//       if (!name || !email || !phoneNumber || !gender || !qualification || !disabilityType || !workMode || !companyName || !jobTitle || !disabilityCertificate || !resume) {
//         return res.status(400).json({ message: 'All fields are required, including files.' });
//       }

//       const newApplication = new Application({
//         name,
//         email,
//         phoneNumber,
//         gender,
//         qualification,
//         disabilityType,
//         workMode,
//         companyName,
//         jobTitle,
//         disabilityCertificate,
//         resume,
//       });

//       await newApplication.save();

//       res.status(201).json({ message: 'Application submitted successfully.' });
//     } catch (err) {
//       console.error('Error submitting application:', err.message, err.stack);
//       res.status(500).json({ message: 'An unexpected error occurred.' });
//     }


//     // routes/applicationRoutes.js

// router.get('/candidates', async (req, res) => {
//   try {
//     const candidates = await Application.find({}, 'name email phoneNumber companyName jobTitle disabilityCertificate resume');
//     res.json(candidates);
//   } catch (err) {
//     console.error('Error fetching candidates:', err.message, err.stack);
//     res.status(500).json({ message: 'Error fetching candidates' });
//   }
// });

//   }
  
// );


//..................................................................


const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Application = require('../models/Application');
const Job = require('../models/job');
const auth = require('../middleware/auth');

// Create uploads directory if it doesn't exist
const uploadDir = path.resolve(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create separate folders for different file types
    const folder = file.fieldname === 'disabilityCertificate' ? 'certificates' : 'resumes';
    const dir = `uploads/${folder}`;
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  },
  filename: (req, file, cb) => {
    // Create unique filename with timestamp and original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Allow only specific file types
  const allowedFileTypes = {
    'disabilityCertificate': ['application/pdf', 'image/jpeg', 'image/png'],
    'resume': ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  };

  if (allowedFileTypes[file.fieldname].includes(file.mimetype)) {
  } else {
    cb(new Error(`Invalid file type for ${file.fieldname}. Allowed types: ${allowedFileTypes[file.fieldname].join(', ')}`), false);
  }
};

// Configure multer upload
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Middleware to handle file upload errors
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size too large. Maximum size is 5MB.' });
    }
    return res.status(400).json({ message: err.message });
  } else if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};

// Validation middleware
const validateApplication = async (req, res, next) => {
  try {
    // Check if all required fields are present
    const requiredFields = ['name', 'email', 'phoneNumber', 'gender', 'qualification', 'workMode', 'disabilityType', 'jobId'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(req.body.phoneNumber)) {
      return res.status(400).json({ message: 'Invalid phone number format' });
    }

    // Check if job exists
    const job = await Job.findById(req.body.jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if job has expired
    if (new Date(job.expirationDate) < new Date()) {
      return res.status(400).json({ message: 'This job posting has expired' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Error validating application', error: error.message });
  }
};



// POST - Submit new application
router.post('/', 
  auth,
  upload.fields([
    { name: 'disabilityCertificate', maxCount: 1 },
    { name: 'resume', maxCount: 1 }
  ]),
  handleUploadError,
  validateApplication,
  async (req, res) => {
    try {
      // Create new application
      const application = new Application({
        jobId: req.body.jobId,
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        gender: req.body.gender,
        qualification: req.body.qualification,
        workMode: req.body.workMode,
        disabilityType: req.body.disabilityType,
        disabilityCertificatePath: `uploads/certificates/${req.files['disabilityCertificate'][0].filename}`, resumePath: `uploads/resumes/${req.files['resume'][0].filename}`,
        jobTitle: req.body.jobTitle,
        companyName: req.body.companyName,
        status: 'pending',
        appliedAt: new Date()
      });

      const savedApplication = await application.save();

      res.status(201).json({
        message: 'Application submitted successfully',
        application: savedApplication
      });
    } catch (error) {
      // Clean up uploaded files if application save fails
      if (req.files) {
        Object.values(req.files).forEach(fileArray => {
          fileArray.forEach(file => {
            fs.unlinkSync(file.path);
          });
        });
      }
      res.status(500).json({ message: 'Error submitting application', error: error.message });
    }
});

// Add this to your backend routes
// router.get('/api/test-file/:filename', (req, res) => {
//   const filePath = path.join(__dirname, 'uploads', req.params.filename);
//   res.sendFile(filePath);
// });
router.get('/api/test-file/:filename', (req, res) => {
  const fileName = req.params.filename;

  // Validate filename to prevent directory traversal attacks
  if (!fileName || fileName.includes('..')) {
    return res.status(400).send('Invalid file name');
  }

  const filePath = path.join(uploadsDir, fileName);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(err.status || 500).send('File not found or cannot be served.');
    }
  });
});




// GET - Get all applications (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('jobId', 'title company')
      .sort({ appliedAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications', error: error.message });
  }
});

// GET - Get user's applications
router.get('/my-applications', auth, async (req, res) => {
  try {
    const applications = await Application.find({ email: req.user.email })
      .populate('jobId', 'title company')
      .sort({ appliedAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching your applications', error: error.message });
  }
});

// GET - Get specific application
router.get('/:id', auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('jobId', 'title company description requirements');
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if user has permission to view this application
    if (req.user.role !== 'admin' && application.email !== req.user.email) {
      return res.status(403).json({ message: 'Unauthorized to view this application' });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching application', error: error.message });
  }
});

// GET - Get specific application
// router.get('/:id', auth, async (req, res) => {
//   try {
//     const application = await Application.findById(req.params.id)
//       .populate('jobId', 'title company description requirements');
    
//     if (!application) {
//       return res.status(404).json({ message: 'Application not found' });
//     }

//     // Check if user has permission to view this application
//     if (req.user.role !== 'admin' && application.email !== req.user.email) {
//       return res.status(403).json({ message: 'Unauthorized to view this application' });
//     }

//     res.json(application);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching application', error: error.message });
//   }
// });



router.get('/api/applications/:id', async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


// PATCH - Update application status (admin only)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized to update application status' });
    }

    const { status } = req.body;
    const validStatuses = ['pending', 'reviewed', 'accepted', 'rejected'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error updating application status', error: error.message });
  }
});

// DELETE - Delete application (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized to delete applications' });
    }

    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Delete associated files
    if (fs.existsSync(application.disabilityCertificatePath)) {
      fs.unlinkSync(application.disabilityCertificatePath);
    }
    if (fs.existsSync(application.resumePath)) {
      fs.unlinkSync(application.resumePath);
    }

    await Application.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting application', error: error.message });
  }
});

module.exports = router;