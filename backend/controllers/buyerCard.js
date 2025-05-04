const BuyerCard = require('../models/BuyerCard');

exports.createBuyerCard = async (req, res) => {
  try {
    const { name, email, phone, address, brandColor, productCodes } = req.body;

    // Validate required fields manually (optional but improves clarity)
    if (!name || !email || !phone || !address || !brandColor) {
      return res.status(400).json({ error: 'All fields except product codes are required.' });
    }

    // Sanitize productCodes (remove empty strings, trim whitespace)
    const cleanedCodes = (productCodes || []).map(code => code.trim()).filter(code => code);
    const buyerCard = new BuyerCard({ name, email, phone, address, brandColor, productCodes: cleanedCodes });

    await buyerCard.save();
    res.status(201).json(buyerCard);
  } catch (err) {
    handleErrors(res, err);
  }
};

// Reusable error handler
function handleErrors(res, err) {
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({ errors: messages });
  }

  if (err.code === 11000) {
    const duplicateField = Object.keys(err.keyValue)[0];
    return res.status(400).json({ error: `${duplicateField} already exists.` });
  }

  console.error('Server Error:', err);
  res.status(500).json({ error: 'Server error. Please try again later.' });
}
