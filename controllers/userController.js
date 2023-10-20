// controllers/userController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

const registerUser = async (req, res) => {
  try {
    const { username, email, password, resident_location, name } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the correct field name for the password hash
    const newUser = new User({
      username,
      email,
      passwordHash: hashedPassword,
      profile: { resident_location, name }, // Include the resident_location and name
    });
    await newUser.save();

    // Generate JWT token
    const token = newUser.generateAuthToken();

    // Set the JWT token in a cookie
    res.cookie("jwtToken", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour

    return res
      .status(200)
      .json({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare plaintext password to hashed passwordHash
    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // User matched, generate JWT token
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: "1h",
    });

    // Set cookie and send response
    res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 });
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logoutUser = (req, res) => {
  try {
    // Clear the JWT token cookie to log the user out
    res.clearCookie("token");

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Edit user details
const editUser = async (req, res) => {
  try {
    // Verify JWT token from header
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, config.jwtSecret);
    const userId = decoded.userId;

    // Find user by id
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.profile.name = req.body.name || user.profile.name;
    user.profile.bio = req.body.bio || user.profile.bio;
    user.profile.resident_location =
      req.body.resident_location || user.profile.resident_location;
    user.profile.socialMedia = req.body.socialMedia || user.profile.socialMedia;

    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error editing user" });
  }
};
const deleteUser = async (req, res) => {
  try {
    // Verify JWT token from header
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, config.jwtSecret);
    const userId = decoded.userId;

    // Find user by id
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user
    await user.deleteOne();

    // Clear the JWT token cookie
    res.clearCookie("token");

    res.status(200).json({ message: "User account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user account" });
  }
};

// Get local leaderboard
// controllers/userController.js

// Get local leaderboard
// controllers/userController.js

// Get local leaderboard
const getLocalLeaderboard = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract resident_location from the user's profile
    const residentLocation = user.profile.resident_location;

    // Find users in the same location, including the specified user
    const localLeaderboard = await User.find({
      "profile.resident_location": residentLocation,
    })
      .sort({ "profile.progress.totalPoints": -1 }) // Sort by totalPoints in descending order
      .limit(100); // Limit the results to the top 10 users

    res.status(200).json({ localLeaderboard });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// controllers/userController.js

// Get global leaderboard
const getGlobalLeaderboard = async (req, res) => {
  try {
    // Find all users
    const globalLeaderboard = await User.find()
      .sort({ "profile.progress.totalPoints": -1 }) // Sort by totalPoints in descending order
      .limit(100); // Limit the results to the top 100 users

    res.status(200).json({ globalLeaderboard });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ... Other methods ...

// Get total points of all users and total number of users
// const getTotalPointsAndUsers = async (req, res) => {
//   try {
//     // Calculate the sum of totalPoints for all users
//     const totalPoints = await User.aggregate([
//       {
//         $group: {
//           _id: null,
//           totalPoints: { $sum: "$profile.progress.totalPoints" },
//         },
//       },
//     ]);

//     // Get the total number of users
//     const totalUsers = await User.countDocuments();

//     res.status(200).json({
//       totalPoints: totalPoints[0]?.totalPoints || 0,
//       totalUsers,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
const getTotalPointsAndUsers = async (req, res) => {
  try {
    // Calculate the sum of totalPoints for all users
    const totalPoints = await User.aggregate([
      {
        $group: {
          _id: null,
          totalPoints: { $sum: "$profile.progress.totalPoints" },
        },
      },
    ]);

    // Get the total number of users
    const totalUsers = await User.countDocuments();

    const { userId } = req.body;

    // Validate that userId is provided
    if (!userId) {
      return res
        .status(400)
        .json({ message: "User ID is required in the request body" });
    }

    // Find the user by ID and extract the resident_location
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const residentLocation = user.profile.resident_location;

    // Calculate the sum of totalPoints for users with the same resident_location
    const totallocalPoints = await User.aggregate([
      {
        $match: {
          "profile.resident_location": residentLocation,
        },
      },
      {
        $group: {
          _id: null,
          totalPoints: { $sum: "$profile.progress.totalPoints" },
          totalUsers: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      total_G_Points: totalPoints[0]?.totalPoints || 0,
      //total_G_Points: totalPoints,
      total_G_Users: totalUsers,
      residentLocation,
      total_L_Points: totallocalPoints[0]?.totalPoints || 0,
      total_L_Users: totallocalPoints[0]?.totalUsers || 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSplitLeaderboard = async (req, res) => {
  try {
    // Aggregate to group users by resident_location and calculate the sum of totalPoints
    const splitLeaderboard = await User.aggregate([
      {
        $group: {
          _id: "$profile.resident_location",
          totalPoints: { $sum: "$profile.progress.totalPoints" },
          users: {
            $push: {
              username: "$username",
              totalPoints: "$profile.progress.totalPoints",
            },
          },
        },
      },
      {
        $sort: { totalPoints: -1 },
      },
    ]);

    res.status(200).json({ splitLeaderboard });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the user information
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  editUser,
  deleteUser,
  getLocalLeaderboard,
  getGlobalLeaderboard,
  getTotalPointsAndUsers,
  getSplitLeaderboard,
  getUser,
};
