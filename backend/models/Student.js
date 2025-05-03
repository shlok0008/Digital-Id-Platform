const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  // Student Info
  name: { type: String, required: [true, 'Full name is required'] },
  age: { 
    type: Number, 
    required: true,
    min: [5, 'Age must be at least 5'],
    max: [25, 'Age must be less than 25']
  },
  student_contact: { 
    type: String, 
    required: true,
    validate: {
      validator: v => /^\d{10}$/.test(v),
      message: 'Phone number must be 10 digits'
    }
  },
  student_email: { 
    type: String, 
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email']
  },
  photo: { type: String, required: true },

  // School Info
  school: { type: String, required: true },
  id_number: { type: String, required: true, unique: true },
  logo: { type: String, required: true },
  address: { type: String, required: true },

  // Parent Info
  parent_contact: { 
    type: String, 
    required: true,
    validate: {
      validator: v => /^\d{10}$/.test(v),
      message: 'Phone number must be 10 digits'
    }
  },
  parent_email: {
    type: String,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email']
  },

  // Social Links
  instagram: String,
  facebook: String,
  linkedin: String,
  twitter: String,
  website: String,

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);