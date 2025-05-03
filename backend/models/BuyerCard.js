const mongoose = require('mongoose');

const buyerCardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email']
  },
  phone: { 
    type: String, 
    required: true,
    validate: {
      validator: v => /^\d{10}$/.test(v),
      message: 'Phone number must be 10 digits'
    }
  },
  brandColor: { type: String, default: '#3B82F6' },
  address: { type: String, required: true },
  productCodes: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BuyerCard', buyerCardSchema);