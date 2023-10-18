// // controllers/leaderboardController.js

// const User = require("../models/User");

// // Get local leaderboard
// const getLocalLeaderboard = async (req, res) => {
//   try {
//     const { residentLocation } = req.user.profile; // Assuming user is authenticated and user data is available in req.user

//     const localLeaderboard = await User.find({
//       "profile.resident_location": {
//         $regex: new RegExp(residentLocation, "i"),
//       },
//     })
//       .sort({ "profile.progress.totalPoints": -1 })
//       .limit(10); // Limiting to the top 10 users, adjust as needed

//     res.status(200).json({ localLeaderboard });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Get global leaderboard
// const getGlobalLeaderboard = async (req, res) => {
//   try {
//     const globalLeaderboard = await User.find()
//       .sort({ "profile.progress.totalPoints": -1 })
//       .limit(10); // Limiting to the top 10 users, adjust as needed

//     res.status(200).json({ globalLeaderboard });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// module.exports = {
//   getLocalLeaderboard,
//   getGlobalLeaderboard,
// };
