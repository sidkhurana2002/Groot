// controllers/productController.js
const Product = require("../models/Product");
const User = require("../models/User");

const addProduct = async (req, res) => {
  try {
    const { name, description, price, quantityAvailable, imageUrl, category } =
      req.body;

    // Create a new product
    const newProduct = new Product({
      name,
      description,
      price,
      quantityAvailable,
      imageUrl,
      category,
      rating: 0,
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
    const { userId } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch all products from the database
    const products = await Product.find();

    // Sort products based on the total difference between likes and dislikes for all categories
    const sortedProducts = products.sort((a, b) => {
      const categoriesA = a.categories || [];
      const categoriesB = b.categories || [];

      const allCategories = Array.from(
        new Set([...categoriesA, ...categoriesB])
      );

      const totalDifferenceA = allCategories.reduce((total, category) => {
        const likesCount =
          user.user_likes.find((like) => like.category === category)?.count ||
          0;
        const dislikesCount =
          user.user_dislike.find((dislike) => dislike.category === category)
            ?.count || 0;

        return total + (likesCount - dislikesCount);
      }, 0);

      const totalDifferenceB = allCategories.reduce((total, category) => {
        const likesCount =
          user.user_likes.find((like) => like.category === category)?.count ||
          0;
        const dislikesCount =
          user.user_dislike.find((dislike) => dislike.category === category)
            ?.count || 0;

        return total + (likesCount - dislikesCount);
      }, 0);

      return totalDifferenceB - totalDifferenceA; // Sort in descending order of the total difference
    });

    res.status(200).json({ sortedProducts });
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
