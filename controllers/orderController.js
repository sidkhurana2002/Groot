const Order = require("../models/Order");
const User = require("../models/User");
const Redeem = require("../models/Redeem");
const Product = require("../models/Product");

const placeOrder = async (req, res) => {
  try {
    const { userId, products, redeemPoints } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Calculate total price of the order
    const totalPrice = products.reduce((total, product) => {
      // Check if the product structure is valid
      if (product && product.product && product.product.price) {
        return total + product.quantity * product.product.price;
      } else {
        // Log a warning for invalid product structure
        console.warn("Invalid product structure for one or more items");
        return total;
      }
    }, 0);

    // Check if the user has enough points to redeem
    if (redeemPoints > 0 && user.rewards.points >= redeemPoints) {
      // Deduct redeemed points from the user's rewards
      user.rewards.points -= redeemPoints;

      // Create a new Redeem entry
      const redeem = new Redeem({
        userId,
        pointsRedeemed: redeemPoints,
      });

      // Save the redeem entry
      await redeem.save();
    }

    // Create a new order
    const newOrder = new Order({
      userId,
      products,
      totalPrice,
    });

    // Save the order
    await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  placeOrder,
};
