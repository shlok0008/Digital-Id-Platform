const mongoose = require('mongoose');

const professionalSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  mobile: { 
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
  photo: { type: String, required: true },
  company: { type: String, required: true },
  address: { type: String, required: true },
  services: { type: String, required: true },
  logo: { type: String, required: true },
  whatsapp: String,
  instagram: String,
  facebook: String,
  linkedin: String,
  twitter: String,
  website: String,
  location: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Professional', professionalSchema);