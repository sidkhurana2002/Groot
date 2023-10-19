const express = require("express");
const router = express.Router();
const adminController = require("../controllers/challengeController");
const adminnController = require("../controllers/adminController");

router.post("/addChallenge", adminController.addChallenge);
router.get("/getChallenges", adminController.getChallenges);

router.post("/register", adminnController.registerAdmin);
router.post("/login", adminnController.loginAdmin);

module.exports = router;
