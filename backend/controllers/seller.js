const Seller = require('../models/Seller');

exports.createSeller = async (req, res) => {
  try {
    const {
      owner,
      businessName,
      mobile,
      address,
      logo,
      brandColor,
      permits,
    } = req.body;

    // Basic validation
    if (!owner || !businessName || !mobile || !address || !logo) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    const seller = new Seller({
      owner,
      businessName,
      mobile,
      address,
      logo,
      brandColor,
      permits,
    });

    await seller.save();
    res.status(201).json({ message: 'Seller created successfully', seller });
  } catch (err) {
    console.error('Create Seller Error:', err);
    res.status(500).json({ error: 'Server Error: Unable to create seller' });
  }
};
