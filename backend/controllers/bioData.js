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

exports.getAllBioData = async (req, res) => {
  try {
    const profiles = await BioData.find().sort({ createdAt: -1 });
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch BioData profiles.' });
  }
};

exports.getBioDataById = async (req, res) => {
  try {
    const profile = await BioData.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: 'BioData profile not found' });
    }
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch BioData profile' });
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