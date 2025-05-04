const Seller = require('../models/Seller');

exports.createSeller = async (req, res) => {
  try {
    const seller = new Seller(req.body);
    await seller.save();
    res.status(201).json({ message: 'Seller created', seller });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message || 'Failed to create seller' });
  }
};
