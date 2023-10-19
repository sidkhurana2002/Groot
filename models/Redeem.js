// const mongoose = require("mongoose");

// const discountSchema = new mongoose.Schema({
//   pointsRequired: {
//     type: Number,
//     required: true,
//   },
//   discountAmount: {
//     type: Number,
//     required: true,
//   },
// });

// const Discount = mongoose.model("Discount", discountSchema);

// module.exports = Discount;
const mongoose = require("mongoose");

const redeemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  pointsRedeemed: {
    type: Number,
    required: true,
  },
  datetime: {
    type: Date,
    default: Date.now,
  },
});

const Redeem = mongoose.model("Redeem", redeemSchema);

module.exports = Redeem;
