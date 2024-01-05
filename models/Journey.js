// models/Journey.js
const mongoose = require("mongoose");

const journeySchema = new mongoose.Schema({
  start_latitude: {
    type: Number,
    required: true,
  },
  start_longitude: {
    type: Number,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  end_location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "complete"],
    default: "pending",
  },
  contact: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date_time: {
    type: Date,
    default: Date.now,
  },
  exservicemen_userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

const Journey = mongoose.model("Journey", journeySchema);

module.exports = Journey;
