// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantityAvailable: {
    type: Number,
    default: 0,
  },
  imageUrl: String,
  category: {
    type: String,
    // You might want to add validation or enum values based on your specific categories
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
