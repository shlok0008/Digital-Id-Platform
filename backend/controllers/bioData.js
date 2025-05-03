const BioData = require('../models/BioData');

exports.createBioData = async (req, res) => {
  try {
    const bioData = new BioData(req.body);
    await bioData.save();
    res.status(201).json(bioData);
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
    return res.status(400).json({ 
      error: `${Object.keys(err.keyValue)[0]} already exists`
    });
  }
  res.status(500).json({ error: 'Server error' });
}