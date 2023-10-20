// controllers/communityPostController.js
const CommunityPost = require("../models/CommunityPost");

const addCommunityPost = async (req, res) => {
  try {
    const { userId, content } = req.body;

    // Validate that userId and content are provided
    if (!userId || !content) {
      return res.status(400).json({
        message: "User ID and content are required in the request body",
      });
    }

    // Create a new community post
    const communityPost = new CommunityPost({
      userId,
      content,
    });

    // Save the community post
    await communityPost.save();

    res
      .status(201)
      .json({ message: "Community post added successfully", communityPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const addComment = async (req, res) => {
  try {
    const { postId, userId, comment } = req.body;

    // Validate that postId, userId, and comment are provided
    if (!postId || !userId || !comment) {
      return res.status(400).json({
        message:
          "Post ID, User ID, and comment are required in the request body",
      });
    }

    // Find the community post by ID
    const communityPost = await CommunityPost.findById(postId);

    if (!communityPost) {
      return res.status(404).json({ message: "Community post not found" });
    }

    // Add the comment to the community post
    communityPost.comments.push({ userId, comment });

    // Save the updated community post
    await communityPost.save();

    res
      .status(200)
      .json({ message: "Comment added successfully", communityPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const likePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    // Check if the post exists
    const post = await CommunityPost.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user has already liked the post
    if (post.likedBy.some((likedUserId) => likedUserId.equals(userId))) {
      return res
        .status(400)
        .json({ message: "You've already liked this post" });
    }

    // Add the user to the likedBy array and update likes count
    post.likedBy.push(userId);
    post.likes += 1;

    // Save the updated post
    await post.save();

    res.status(200).json({ message: "Post liked successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addCommunityPost,
  addComment,
  likePost,
};
