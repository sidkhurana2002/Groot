// controllers/userController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the correct field name for the password hash
    const newUser = new User({ username, email, passwordHash: hashedPassword });
    await newUser.save();

    // Generate JWT token
    const token = newUser.generateAuthToken();

    // Set the JWT token in a cookie
    res.cookie("jwtToken", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour

    return res
      .status(201)
      .json({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare plaintext password to hashed passwordHash
    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // User matched, generate JWT token
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: "1h",
    });

    // Set cookie and send response
    res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 });
    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logoutUser = (req, res) => {
  try {
    // Clear the JWT token cookie to log the user out
    res.clearCookie("token");

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Edit user details
const editUser = async (req, res) => {
  try {
    // Verify JWT token from header
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, config.jwtSecret);
    const userId = decoded.userId;

    // Find user by id
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.profile.name = req.body.name || user.profile.name;
    user.profile.bio = req.body.bio || user.profile.bio;
    user.profile.resident_location =
      req.body.resident_location || user.profile.resident_location;
    user.profile.socialMedia = req.body.socialMedia || user.profile.socialMedia;

    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error editing user" });
  }
};
const deleteUser = async (req, res) => {
  try {
    // Verify JWT token from header
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, config.jwtSecret);
    const userId = decoded.userId;

    // Find user by id
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user
    await user.deleteOne();

    // Clear the JWT token cookie
    res.clearCookie("token");

    res.status(200).json({ message: "User account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user account" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  editUser,
  deleteUser,
};
