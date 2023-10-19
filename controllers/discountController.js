// controllers/discountController.js
const Discount = require("../models/Redeem");

const addDiscount = async (req, res) => {
  try {
    const { pointsRequired, discountAmount } = req.body;

    // Create a new discount
    const newDiscount = new Discount({
      pointsRequired,
      discountAmount,
    });

    // Save the discount to the database
    await newDiscount.save();

    res.status(201).json({
      message: "Discount added successfully",
      discount: newDiscount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addDiscount,
};
