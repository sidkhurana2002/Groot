// models/Challenge.js
const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  challenge_distance: {
    type: Number,
    required: true,
  },
  challenge_points: {
    type: Number,
    required: true,
  },
  transportType: {
    type: String,
  },
  challengeImage: {
    type: String,
  },
  challengeAgeLimit: {
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
    },
  },
  lastDateToComplete: {
    type: Date,
  },
  users: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      completed: Boolean,
      completionDate: Date,
    },
  ],
});

const Challenge = mongoose.model("Challenge", challengeSchema);

module.exports = Challenge;
