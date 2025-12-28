const Like = require("../models/like");
const Post = require("../models/post");
const logger = require("../utils/logger");

/**
 * Like a post
 */
const likePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = parseInt(req.params.postId);

    // Check if post exists
    const post = await Post.getPostById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    await Like.likePost(userId, postId);
    res.json({ message: "Post liked successfully" });
  } catch (error) {
    logger.error("Error liking post:", error);
    res.status(500).json({ error: "Failed to like post" });
  }
};

/**
 * Unlike a post
 */
const unlikePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = parseInt(req.params.postId);

    await Like.unlikePost(userId, postId);
    res.json({ message: "Post unliked successfully" });
  } catch (error) {
    logger.error("Error unliking post:", error);
    res.status(500).json({ error: "Failed to unlike post" });
  }
};

/**
 * Get likes for a post
 */
const getPostLikes = async (req, res) => {
  try {
    const postId = parseInt(req.params.postId);
    const count = await Like.getPostLikesCount(postId);
    res.json({ count });
  } catch (error) {
    logger.error("Error getting post likes:", error);
    res.status(500).json({ error: "Failed to get post likes" });
  }
};

module.exports = {
  likePost,
  unlikePost,
  getPostLikes,
};
