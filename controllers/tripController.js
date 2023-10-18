// // controllers/tripController.js
// const Trip = require("../models/Trip");

// const addTrip = async (req, res) => {
//   try {
//     const { userId, startLocation, endLocation, distance } = req.body;

//     // Set the date to the current date
//     const currentDate = new Date();

//     // Create a new trip
//     const newTrip = new Trip({
//       userId,
//       date: currentDate,
//       startLocation,
//       endLocation,
//       distance,
//     });

//     // Save the trip to the database
//     await newTrip.save();

//     res.status(201).json({
//       message: "Trip information added successfully",
//       trip: newTrip,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// module.exports = {
//   addTrip,
// };
