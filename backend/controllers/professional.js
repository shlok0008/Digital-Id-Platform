const Professional = require('../models/Professional');

exports.createProfessional = async (req, res) => {
  try {
    const {
      productsAndServices,
      youtubeLinks
    } = req.body;

    // Validate max 3 products/services
    if (productsAndServices && productsAndServices.length > 3) {
      return res.status(400).json({ error: 'You can only add up to 3 products/services' });
    }

    // Validate max 4 YouTube links
    if (youtubeLinks && youtubeLinks.length > 4) {
      return res.status(400).json({ error: 'You can only add up to 4 YouTube links' });
    }

    const professional = new Professional(req.body);
    await professional.save();
    res.status(201).json(professional);
    console.log('Received data:', req.body);

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


// Get all professionals
exports.getAllProfessionals = async (req, res) => {
  try {
    const professionals = await Professional.find().sort({ createdAt: -1 });
    res.status(200).json(professionals);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single professional
exports.getProfessionalById = async (req, res) => {
  try {
    const professional = await Professional.findById(req.params.id);
    
    if (!professional) {
      return res.status(404).json({ message: 'Professional not found' });
    }
    
    res.status(200).json(professional);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
