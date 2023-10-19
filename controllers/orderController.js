// controllers/orderController.js
const Order = require("../models/Order");
const User = require("../models/User");
const Discount = require("../models/Redeem");
const Product = require("../models/Product");

const placeOrder = async (req, res) => {
  try {
    const { userId, products, totalPrice } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Validate product IDs and retrieve product details
    const productDetails = await Promise.all(
      products.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) {
          return res
            .status(404)
            .json({ error: `Product not found with ID ${item.productId}` });
        }
        return {
          productId: product._id,
          quantity: item.quantity,
          price: product.price,
        };
      })
    );

    // Calculate total price
    const calculatedTotalPrice = productDetails.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);

    // Check if the provided total price matches the calculated total price
    if (calculatedTotalPrice !== totalPrice) {
      return res.status(400).json({ error: "Invalid total price" });
    }

    // Create the order
    const order = new Order({
      userId,
      products: productDetails,
      totalPrice,
    });

    await order.save();

    return res.status(201).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  placeOrder,
};
