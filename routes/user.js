const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const challengeController = require("../controllers/challengeController");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);
router.put("/edit", userController.editUser);
router.delete("/delete", userController.deleteUser);
//router.post("/completeChallenge", challengeController.completeChallenge);
router.post("/addTrip", async (req, res) => {
  await challengeController.addTrip(req, res);
});
// Add these lines after the existing routes
router.post("/localLeaderboard", userController.getLocalLeaderboard);
router.post("/globalLeaderboard", userController.getGlobalLeaderboard);
router.post("/totalPointsandusers", userController.getTotalPointsAndUsers);
router.get("/splitLeaderboard", userController.getSplitLeaderboard);
router.post("/getUser", userController.getUser);
router.post("/postTicket", userController.postTicket);
router.post("/updateTicketStatus", userController.updateTicketStatus);

// Add this line after the existing routes
router.post(
  "/challengeLeaderboard",
  challengeController.getChallengeLeaderboard
);
router.post("/createRequest", challengeController.createRequest);
router.post("/requests-in-radius", challengeController.getRequestsInRadius);
router.post("/update-journey-status", challengeController.updateJourneyStatus);

router.post(
  "/earning_history",
  challengeController.getChallenge_user_earning_history
);
router.post("/like_Product", userController.likeProduct);
router.post("/dislike_Product", userController.dislikeProduct);
router.get("/getallusers", userController.getAllUsers);
router.get("/totaldistance", userController.getTotalDistance);

module.exports = router;
