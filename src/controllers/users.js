const User = require("../models/user");
const Follow = require("../models/follow");
const logger = require("../utils/logger");

/**
 * Search for users
 */
const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: "Search query 'q' is required" });
    }
    const users = await User.findUsersByName(q);
    res.json(users);
  } catch (error) {
    logger.error("Error searching users:", error);
    res.status(500).json({ error: "Failed to search users" });
  }
};

/**
 * Get user profile
 */
const getUserProfile = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await User.getUserProfile(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    logger.error("Error getting user profile:", error);
    res.status(500).json({ error: "Failed to get user profile" });
  }
};

/**
 * Follow a user
 */
const followUser = async (req, res) => {
  try {
    const followerId = req.user.id;
    const followingId = parseInt(req.params.id);

    if (followerId === followingId) {
      return res.status(400).json({ error: "You cannot follow yourself" });
    }

    // Check if user exists
    const userToFollow = await User.getUserById(followingId);
    if (!userToFollow) {
      return res.status(404).json({ error: "User not found" });
    }

    await Follow.followUser(followerId, followingId);
    res.json({ message: "Successfully followed user" });
  } catch (error) {
    logger.error("Error following user:", error);
    res.status(500).json({ error: "Failed to follow user" });
  }
};

/**
 * Unfollow a user
 */
const unfollowUser = async (req, res) => {
  try {
    const followerId = req.user.id;
    const followingId = parseInt(req.params.id);

    await Follow.unfollowUser(followerId, followingId);
    res.json({ message: "Successfully unfollowed user" });
  } catch (error) {
    logger.error("Error unfollowing user:", error);
    res.status(500).json({ error: "Failed to unfollow user" });
  }
};

/**
 * Get followers of a user
 */
const getFollowers = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const followers = await Follow.getFollowers(userId);
    res.json(followers);
  } catch (error) {
    logger.error("Error getting followers:", error);
    res.status(500).json({ error: "Failed to get followers" });
  }
};

/**
 * Get users followed by a user
 */
const getFollowing = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const following = await Follow.getFollowing(userId);
    res.json(following);
  } catch (error) {
    logger.error("Error getting following:", error);
    res.status(500).json({ error: "Failed to get following" });
  }
};

module.exports = {
  searchUsers,
  getUserProfile,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
};
