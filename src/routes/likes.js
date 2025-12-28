/**
 * @file likes.js
 * @description Routes for managing post likes
 * @author Yash
 */
const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const likeController = require("../controllers/likes");

const router = express.Router();

// Public routes
router.get("/:postId", likeController.getPostLikes);

// Protected routes
router.post("/:postId", authenticateToken, likeController.likePost);
router.delete("/:postId", authenticateToken, likeController.unlikePost);

module.exports = router;
