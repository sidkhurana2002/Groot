// models/Badge.js
const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({
  badgeImage: String,
  badgeName: String,
  experienceLevel: String,
  minimumPointsToClaim: Number,
});

const Badge = mongoose.model("Badge", badgeSchema);

module.exports = Badge;
