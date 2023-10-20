// controllers/productController.js
const Product = require("../models/Product");

const addProduct = async (req, res) => {
  try {
    const { name, description, price, quantityAvailable, imageUrl } = req.body;

    // Create a new product
    const newProduct = new Product({
      name,
      description,
      price,
      quantityAvailable,
      imageUrl,
    });

    // Save the product to the database
    await newProduct.save();

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.body.productId;

  try {
    // Validate that productId is provided
    if (!productId) {
      return res
        .status(400)
        .json({ message: "Product ID is required in the request body" });
    }

    // Find the product by ID and delete it
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  deleteProduct,
};
