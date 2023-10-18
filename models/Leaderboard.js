// models/Leaderboard.js
const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  users: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      points: Number,
    },
  ],
});

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);

module.exports = Leaderboard;
