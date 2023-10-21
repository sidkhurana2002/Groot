// routes/communityPostRoutes.js
const express = require("express");
const router = express.Router();
const communityPostController = require("../controllers/communityPostController");

// API endpoint to add a new community post
router.post("/addCommunityPost", communityPostController.addCommunityPost);
router.post("/addComment", communityPostController.addComment);
router.get("/getAllPosts", communityPostController.getAllPosts);

// API endpoint to like a community post
router.post("/likePost", communityPostController.likePost);

module.exports = router;
