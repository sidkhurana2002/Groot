// // routes/trip.js
// const express = require("express");
// const router = express.Router();
// const tripController = require("../controllers/tripController");

// router.post("/addTrip", tripController.addTrip);

// module.exports = router;
// routes/trip.js

// const express = require("express");
// const router = express.Router();
// const tripController = require("../controllers/challengeController");

// router.post("/addTrip", tripController.addTrip);

// module.exports = router;
// routes/tripRoutes.js
const express = require("express");
const router = express.Router();
const challengeController = require("../controllers/challengeController");

router.post("/addTrip", challengeController.addTrip);

module.exports = router;
