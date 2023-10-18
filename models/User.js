const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
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
  profile: {
    name: String,
    bio: String,
    resident_location: String,
    socialMedia: [
      {
        platform: String,
        handle: String,
      },
    ],
    achievements: [
      {
        title: String,
        description: String,
      },
    ],
    progress: {
      totalPoints: {
        type: Number,
        default: 0,
      },
      experience: String,
    },
  },
  trips: [
    {
      tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip",
      },
    },
  ],
  challenges: [
    {
      challengeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Challenge",
      },
    },
  ],
  rewards: {
    points: {
      type: Number,
      default: 0,
    },
  },
});

userSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
    expiresIn: "1h",
  });
  user.jwtToken = token;
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
