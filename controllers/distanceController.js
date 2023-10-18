// // controllers/distanceController.js
// const geolib = require("geolib");

// const calculateDistance = (req, res) => {
//   try {
//     const { start, end } = req.body;

//     // Calculate the distance using the Haversine formula
//     const distance = geolib.getDistance(
//       { latitude: start.latitude, longitude: start.longitude },
//       { latitude: end.latitude, longitude: end.longitude }
//     );

//     // Convert distance to kilometers
//     const distanceInKm = distance / 1000;
// //
//     res.status(200).json({ distance: distanceInKm });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// module.exports = {
//   calculateDistance,
// };
