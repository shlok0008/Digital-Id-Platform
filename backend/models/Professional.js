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
  photo: { type: String, required: true }, // base64 string
  company: { type: String, required: true },
  address: { type: String, required: true },
  designation: { type: String, required: true },
  description: { type: String, required: true },
  logo: { type: String, required: true }, // base64 string

  // Social Media Links
  whatsapp: String,
  instagram: String,
  facebook: String,
  linkedin: String,
  twitter: String,
  website: String,
  location: String,

  // Product/Service Section with max 3 entries
  productsAndServices: {
    type: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true }, // base64 image
        price: { type: Number, required: true },
        currency: { type: String, required: true } // e.g., 'INR', 'USD'
      }
    ],
    validate: [arr => arr.length <= 3, 'Maximum of 3 products/services allowed']
  },

  // YouTube Video Links (max 4)
  youtubeLinks: {
    type: [String],
    validate: [arr => arr.length <= 4, '{PATH} exceeds the limit of 4']
  },

  // Payment Information
  paymentName: { type: String },
  paymentContact: {
    type: String,
    validate: {
      validator: v => !v || /^\d{10}$/.test(v),
      message: 'Payment contact must be 10 digits'
    }
  },
  qrCode: { type: String }, // base64 string

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Professional', professionalSchema);
