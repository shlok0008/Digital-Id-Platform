const BuyerCard = require('../models/BuyerCard');

// Create a new buyer card
exports.createBuyerCard = async (req, res) => {
  try {
    const { name, email, phone, address, brandColor, productCodes } = req.body;

    if (!name || !email || !phone || !address || !brandColor) {
      return res.status(400).json({ error: 'All fields except product codes are required.' });
    }

    const cleanedCodes = (productCodes || []).map(code => code.trim()).filter(code => code);
    const buyerCard = new BuyerCard({ name, email, phone, address, brandColor, productCodes: cleanedCodes });

    await buyerCard.save();
    res.status(201).json(buyerCard);
  } catch (err) {
    handleErrors(res, err);
  }
};

// Fetch all buyer cards
exports.getAllBuyerCards = async (req, res) => {
  try {
    const buyerCards = await BuyerCard.find();

    if (!buyerCards || buyerCards.length === 0) {
      return res.status(404).json({ error: 'No buyer cards found' });
    }

    res.status(200).json(buyerCards);
  } catch (err) {
    handleErrors(res, err);
  }
};

// Fetch a single buyer card by its ID
exports.getBuyerCardById = async (req, res) => {
  try {
    const { id } = req.params;
    const buyerCard = await BuyerCard.findById(id);

    if (!buyerCard) {
      return res.status(404).json({ error: 'Buyer card not found' });
    }

    res.status(200).json(buyerCard);
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
