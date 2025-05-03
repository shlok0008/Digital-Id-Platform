const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  year: Number,
  specialization: String
});

const bioDataSchema = new mongoose.Schema({
  // Personal Info
  fullName: { type: String, required: true },
  dob: { type: Date, required: true },
  height: { type: Number, min: 100, max: 250 },
  weight: { type: Number, min: 30, max: 200 },
  photo: { type: String, required: true },
  religion: String,
  motherTongue: { type: String, required: true },
  nationality: { type: String, required: true },
  location: { type: String, required: true },

  // Contact & Education
  phone: { 
    type: String, 
    required: true,
    validate: {
      validator: v => /^\d{10}$/.test(v),
      message: 'Phone number must be 10 digits'
    }
  },
  email: { 
    type: String, 
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email']
  },
  address: { type: String, required: true },
  education: [educationSchema],

  // Family & Attributes
  parents: String,
  siblings: String,
  personality: String,
  hobbies: String,
  preferences: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BioData', bioDataSchema);