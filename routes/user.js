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
router.get("/localLeaderboard", userController.getLocalLeaderboard);
router.get("/globalLeaderboard", userController.getGlobalLeaderboard);
router.get("/totalPointsandusers", userController.getTotalPointsAndUsers);

module.exports = router;
