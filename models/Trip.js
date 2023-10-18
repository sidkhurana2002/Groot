// models/Trip.js
const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
  },
  startLocation: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  endLocation: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  distance: {
    type: Number,
  },
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
