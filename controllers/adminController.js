// controllers/adminController.js
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/User");

const registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const newAdmin = new Admin({
      username,
      passwordHash: hashedPassword,
    });
    await newAdmin.save();

    // Generate JWT token
    const token = newAdmin.generateAuthToken();

    // Set the JWT token in a cookie
    res.cookie("jwtToken", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour

    return res
      .status(200)
      .json({ message: "Admin registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare plaintext password to hashed passwordHash
    const isMatch = await bcrypt.compare(password, admin.passwordHash);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Admin matched, generate JWT token
    const token = jwt.sign({ adminId: admin._id }, config.jwtSecret, {
      expiresIn: "1h",
    });

    // Set cookie and send response
    res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 });
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const verifyDisabledStatus = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Set isdisabledverify to true
    user.profile.isdisabledverify = true;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "Disabled status verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  verifyDisabledStatus,
};
