// // controllers/leaderboardController.js
// const Leaderboard = require("../models/Leaderboard");
// const User = require("../models/User");

// const getLocalLeaderboard = async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     // Find the user to get their location
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const userLocation = user.profile.resident_location;

//     // Find the local leaderboard for the user's location
//     const localLeaderboard = await Leaderboard.findOne({
//       location: userLocation,
//     });

//     if (!localLeaderboard) {
//       return res
//         .status(404)
//         .json({
//           message: "Local leaderboard not found for the user's location",
//         });
//     }

//     // Sort users based on points in descending order
//     const sortedUsers = localLeaderboard.users.sort(
//       (a, b) => b.points - a.points
//     );

//     res.json({
//       localLeaderboard: { location: userLocation, users: sortedUsers },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// module.exports = {
//   getLocalLeaderboard,
// };
