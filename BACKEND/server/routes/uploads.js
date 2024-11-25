const express = require('express');
const upload = require('../middleware/multer'); // Import the multer setup
const router = express.Router();

router.post('/uploads', upload.single('file'), (req, res) => {
    try {
      const file = req.file;
      res.status(200).json({
        message: 'File uploaded successfully',
        url: file.path,      // Cloudinary URL
        public_id: file.filename, // Cloudinary public ID
      });
    } catch (error) {
      res.status(500).json({ error: 'File upload failed', details: error.message });
    }
  });

  router.post('/uploads', upload.single('resume'), (req, res) => {
    if (req.file) {
        res.status(200).json({ filePath: `/uploads/resumes/${req.file.filename}` });
    } else {
        res.status(400).json({ error: 'File upload failed' });
    }
});

  

module.exports = router;
