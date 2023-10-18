// // controllers/authController.js
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const User = require("../models/User");

// // Replace 'your-secret-key' with a strong, unique secret key
// const JWT_SECRET = "your-secret-key";

// const generateToken = (userId) => {
//   // Generate a JWT token with the user ID
//   return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if the user exists
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     // Check if the provided password is correct
//     const passwordMatch = await bcrypt.compare(password, user.passwordHash);

//     if (!passwordMatch) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     // Generate a JWT token
//     const token = generateToken(user._id);

//     // Send the token as a cookie
//     res.cookie("jwtToken", token, { httpOnly: true, maxAge: 3600000 }); // Max age is set to 1 hour

//     // You may also send the token in the response if needed
//     // res.json({ token });

//     // Send a success response
//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: "Server Error" });
//   }
// };

// module.exports = { login };
