// controllers/orderController.js
const Order = require("../models/Order");
const User = require("../models/User");
const Discount = require("../models/Discount");

const placeOrder = async (req, res) => {
  try {
    const { userId, products, applyDiscount } = req.body;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Calculate the total order amount based on product prices
    const orderAmount = products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);

    let discountApplied = 0;

    // Apply discount if requested and user has enough points
    if (applyDiscount && user.rewards.points > 0) {
      // Find available discounts (you may customize this based on your logic)
      const availableDiscounts = await Discount.find({
        pointsRequired: { $lte: user.rewards.points },
      }).sort({ pointsRequired: -1 });

      if (availableDiscounts.length > 0) {
        // Apply the highest available discount
        const maxDiscount = availableDiscounts[0];
        discountApplied = Math.min(maxDiscount.discountAmount, orderAmount);

        // Deduct points from the user
        user.rewards.points -= maxDiscount.pointsRequired;
        await user.save();
      }
    }

    // Calculate the final order amount after applying the discount
    const finalOrderAmount = orderAmount - discountApplied;

    // Create a new order with the totalPrice field
    const newOrder = new Order({
      userId,
      products,
      orderAmount: finalOrderAmount,
      discountApplied,
      totalPrice: finalOrderAmount, // Set totalPrice here
    });

    // Save the order to the database
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
