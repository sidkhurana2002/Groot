const express = require("express");
const router = express.Router();
const adminController = require("../controllers/challengeController");
const adminnController = require("../controllers/adminController");
const RedeemController = require("../controllers/RedeemController");

router.post("/addChallenge", adminController.addChallenge);
router.get("/getChallenges", adminController.getChallenges);

router.post("/register", adminnController.registerAdmin);
router.post("/login", adminnController.loginAdmin);
router.get("/redeemtotal", RedeemController.getTotalRedeemPoints);

module.exports = router;
