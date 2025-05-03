const BuyerCard = require('../models/BuyerCard');

exports.createBuyerCard = async (req, res) => {
  try {
    // Filter empty product codes
    req.body.productCodes = req.body.productCodes.filter(code => code.trim() !== '');
    const buyerCard = new BuyerCard(req.body);
    await buyerCard.save();
    res.status(201).json(buyerCard);
  } catch (err) {
    handleErrors(res, err);
  }
};