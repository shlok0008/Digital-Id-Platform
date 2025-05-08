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

// Controller to get a seller by ID
exports.getSellerById = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) {
      return res.status(404).json({ error: 'Seller not found' });
    }
    res.json(seller);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Controller to fetch all sellers
exports.getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch sellers' });
  }
};
