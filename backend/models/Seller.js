const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  businessName: { type: String, required: true },
  mobile: {
    type: String,
    required: true,
    validate: {
      validator: v => /^\d{10}$/.test(v),
      message: 'Phone number must be 10 digits',
    },
  },
  address: { type: String, required: true },
  logo: { type: String, required: true }, // base64 image
  brandColor: { type: String, default: '#3B82F6' },
  permits: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Seller', sellerSchema);
