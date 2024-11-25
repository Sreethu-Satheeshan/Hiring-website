const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Folder name in your Cloudinary account
    allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed file formats
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
