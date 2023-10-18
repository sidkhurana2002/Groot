// models/Analytics.js
const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  patterns: {
    frequentRoutes: [
      {
        startLocation: String,
        endLocation: String,
        count: Number,
      },
    ],
  },
});

const Analytics = mongoose.model("Analytics", analyticsSchema);

module.exports = Analytics;
