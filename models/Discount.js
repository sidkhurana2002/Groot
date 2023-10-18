const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
  pointsRequired: {
    type: Number,
    required: true,
  },
  discountAmount: {
    type: Number,
    required: true,
  },
});

const Discount = mongoose.model("Discount", discountSchema);

module.exports = Discount;
