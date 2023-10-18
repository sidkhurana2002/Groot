// server.js
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const productRoutes = require("./routes/productRoutes");
const discountRoutes = require("./routes/discountRoutes");
const orderRoutes = require("./routes/orderRoutes"); // Import the order routes
//const tripRoutes = require("./routes/trip");
//const distanceRoutes = require("./routes/distanceRoutes");
//const tripRoutes = require("./routes/user");

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Use routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/discounts", discountRoutes);
app.use("/api/orders", orderRoutes);
//app.use("/api/trip", tripRoutes);
//app.use("/api/distance", distanceRoutes);
//app.use("/api/trip", tripRoutes);

// Start the server
const PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
