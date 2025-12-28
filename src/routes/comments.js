/**
 * @file comments.js
 * @description Routes for managing post comments
 * @author Yash
 */
const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const commentController = require("../controllers/comments");

const router = express.Router();

// Public routes
router.get("/post/:postId", commentController.getPostComments);

// Protected routes
router.post("/post/:postId", authenticateToken, commentController.createComment);
router.put("/:id", authenticateToken, commentController.updateComment);
router.delete("/:id", authenticateToken, commentController.deleteComment);

module.exports = router;
