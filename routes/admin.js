const express = require("express");
const router = express.Router();
const adminController = require("../controllers/challengeController");

router.post("/addChallenge", adminController.addChallenge);
router.get("/getChallenges", adminController.getChallenges);

module.exports = router;
