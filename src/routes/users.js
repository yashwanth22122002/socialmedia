/**
 * @file users.js
 * @description User management routes (Search, Profile, Follows)
 * @author Yash
 */
const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const userController = require("../controllers/users");

const router = express.Router();

// Public routes
router.get("/search", userController.searchUsers);
router.get("/:id", userController.getUserProfile);
router.get("/:id/followers", userController.getFollowers);
router.get("/:id/following", userController.getFollowing);

// Protected routes
router.post("/:id/follow", authenticateToken, userController.followUser);
router.delete("/:id/follow", authenticateToken, userController.unfollowUser);

module.exports = router;
