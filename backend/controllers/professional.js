const Professional = require('../models/Professional');

exports.createProfessional = async (req, res) => {
  try {
    const professional = new Professional(req.body);
    await professional.save();
    res.status(201).json(professional);
  } catch (err) {
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
};