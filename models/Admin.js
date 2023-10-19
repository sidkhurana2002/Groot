// models/Admin.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  jwtToken: {
    type: String,
  },
});

adminSchema.methods.generateAuthToken = function () {
  const admin = this;
  const token = jwt.sign({ adminId: admin._id }, config.jwtSecret, {
    expiresIn: "1h",
  });
  admin.jwtToken = token;
  return token;
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
