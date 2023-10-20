// // const User = require("../models/User");
// // const Redeem = require("../models/Redeem");

// // const redeemPoints = async (req, res) => {
// //   try {
// //     const { userId, pointsToRedeem } = req.body;

// //     // Find the user by userId
// //     const user = await User.findById(userId);

// //     if (!user) {
// //       return res.status(404).json({ message: "User not found" });
// //     }

// //     // Check if the user has enough points to redeem
// //     if (user.rewards.points < pointsToRedeem) {
// //       return res.status(400).json({ message: "Insufficient points to redeem" });
// //     }

// //     // Update user's redeemed points and total points
// //     user.redeemedPoints += pointsToRedeem;
// //     user.rewards.points -= pointsToRedeem;

// //     // Save the updated user
// //     await user.save();

// //     // Create a Redeem record
// //     const redeem = new Redeem({
// //       userId: userId,
// //       pointsRedeemed: pointsToRedeem,
// //       redeemedUserId: req.user._id, // Assuming req.user contains the authenticated user's details
// //     });

// //     // Save the redeem record
// //     await redeem.save();

// //     res.status(200).json({ message: "Points redeemed successfully", user });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Internal server error" });
// //   }
// // };

// // module.exports = {
// //   redeemPoints,
// // };
// const User = require("../models/User");
// const Redeem = require("../models/Redeem");

// const redeemPoints = async (req, res) => {
//   try {
//     const { userId, pointsToRedeem } = req.body;

//     // Find the user by userId
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Check if the user has enough points to redeem
//     if (user.rewards.points < pointsToRedeem) {
//       return res.status(400).json({ message: "Insufficient points to redeem" });
//     }

//     // Update user's redeemed points and total points
//     // user.redeemedPoints += pointsToRedeem;
//     user.rewards.points -= pointsToRedeem;

//     // Save the updated user
//     await user.save();

//     // Create a Redeem record
//     const redeem = new Redeem({
//       userId: userId,
//       pointsRedeemed: pointsToRedeem,
//     });

//     // Save the redeem record
//     await redeem.save();

//     res.status(200).json({ message: "Points redeemed successfully", user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// module.exports = {
//   redeemPoints,
// };
