// // // models/User.js
// // const mongoose = require('mongoose');
// // const bcrypt = require('bcryptjs');

// // const UserSchema = new mongoose.Schema({
// //   username: {
// //     type: String,
// //     required: true,
// //     trim: true
// //   },
// //   email: {
// //     type: String,
// //     required: true,
// //     unique: true,
// //     trim: true
// //   },
// //   password: {
// //     type: String,
// //     required: true
// //   },
 

// //   // Additional fields for candidates can be added here, e.g., qualifications, skills, etc.
// //   createdAt: {
// //     type: Date,
// //     default: Date.now
// //   },

// //   employerId: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: 'Employer',
// //     required: false, // Set to false for testing
// // }
// // });

// // UserSchema.pre('save', async function (next) {
// //   if (this.isModified('password')) {
// //     const salt = await bcrypt.genSalt(10);
// //     this.password = await bcrypt.hash(this.password, salt);
// //   }
// //   next();
// // });

// // module.exports = mongoose.model('User', UserSchema);

// //...................................................................................................................................

// // models/User.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const UserSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   disabilityType: {
//     type: String,
//     required: false, // Optional field for candidates with disabilities
//     trim: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   employerId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Employer',
//     required: false // Set to false for testing
//   }
// });

// UserSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   }
//   next();
// });

// module.exports = mongoose.model('User', UserSchema);


//...........................................................................................................................
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  disabilityType: {
    type: String,
    required: function() { return this.userType === 'candidate'; }, // Required only for candidates
    trim: true
  },
  userType: {
    type: String,
    enum: ['candidate', 'employer'],
    required: true
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);
