// models/Ticket.js
const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  challengeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Challenge", // Reference to the Challenge model
    required: true,
  },
  ticketPhoto: {
    type: String, // Assuming the ticket photo is a file path or URL
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"], // You can customize the status options
    default: "pending",
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
