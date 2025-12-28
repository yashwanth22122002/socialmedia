const Comment = require("../models/comment");
const Post = require("../models/post");
const logger = require("../utils/logger");
const { validateComment } = require("../utils/validation");

/**
 * Create a comment
 */
const createComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = parseInt(req.params.postId);
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    // Check if post exists and comments are enabled
    const post = await Post.getPostById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (!post.comments_enabled) {
      return res.status(403).json({ error: "Comments are disabled for this post" });
    }

    const comment = await Comment.createComment(userId, postId, content);
    res.status(201).json(comment);
  } catch (error) {
    logger.error("Error creating comment:", error);
    res.status(500).json({ error: "Failed to create comment" });
  }
};

/**
 * Update a comment
 */
const updateComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const commentId = parseInt(req.params.id);
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    const updatedComment = await Comment.updateComment(commentId, userId, content);
    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found or unauthorized" });
    }

    res.json(updatedComment);
  } catch (error) {
    logger.error("Error updating comment:", error);
    res.status(500).json({ error: "Failed to update comment" });
  }
};

/**
 * Delete a comment
 */
const deleteComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const commentId = parseInt(req.params.id);

    const success = await Comment.deleteComment(commentId, userId);
    if (!success) {
      return res.status(404).json({ error: "Comment not found or unauthorized" });
    }

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    logger.error("Error deleting comment:", error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
};

/**
 * Get comments for a post
 */
const getPostComments = async (req, res) => {
  try {
    const postId = parseInt(req.params.postId);
    const comments = await Comment.getPostComments(postId);
    res.json(comments);
  } catch (error) {
    logger.error("Error getting comments:", error);
    res.status(500).json({ error: "Failed to get comments" });
  }
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getPostComments,
};
