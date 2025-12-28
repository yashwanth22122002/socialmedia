const { query } = require("../utils/database");

/**
 * Follow model for managing user relationships
 */

/**
 * Follow a user
 * @param {number} followerId - ID of the user who is following
 * @param {number} followingId - ID of the user being followed
 * @returns {Promise<Object>} Follow record
 */
const followUser = async (followerId, followingId) => {
  if (followerId === followingId) {
    throw new Error("Users cannot follow themselves");
  }
  const result = await query(
    `INSERT INTO follows (follower_id, following_id)
     VALUES ($1, $2)
     ON CONFLICT (follower_id, following_id) DO NOTHING
     RETURNING *`,
    [followerId, followingId]
  );
  return result.rows[0];
};

/**
 * Unfollow a user
 * @param {number} followerId - ID of the user who is unfollowing
 * @param {number} followingId - ID of the user being unfollowed
 * @returns {Promise<boolean>} True if unfollowed, false otherwise
 */
const unfollowUser = async (followerId, followingId) => {
  const result = await query(
    `DELETE FROM follows
     WHERE follower_id = $1 AND following_id = $2
     RETURNING *`,
    [followerId, followingId]
  );
  return result.rowCount > 0;
};

/**
 * Get users that a user is following
 * @param {number} userId - User ID
 * @param {number} limit - Limit results
 * @param {number} offset - Pagination offset
 * @returns {Promise<Array>} List of followed users
 */
const getFollowing = async (userId, limit = 20, offset = 0) => {
  const result = await query(
    `SELECT u.id, u.username, u.full_name, f.created_at as followed_at
     FROM follows f
     JOIN users u ON f.following_id = u.id
     WHERE f.follower_id = $1
     ORDER BY f.created_at DESC
     LIMIT $2 OFFSET $3`,
    [userId, limit, offset]
  );
  return result.rows;
};

/**
 * Get followers of a user
 * @param {number} userId - User ID
 * @param {number} limit - Limit results
 * @param {number} offset - Pagination offset
 * @returns {Promise<Array>} List of followers
 */
const getFollowers = async (userId, limit = 20, offset = 0) => {
  const result = await query(
    `SELECT u.id, u.username, u.full_name, f.created_at as followed_at
     FROM follows f
     JOIN users u ON f.follower_id = u.id
     WHERE f.following_id = $1
     ORDER BY f.created_at DESC
     LIMIT $2 OFFSET $3`,
    [userId, limit, offset]
  );
  return result.rows;
};

/**
 * Check if user follows another user
 * @param {number} followerId 
 * @param {number} followingId 
 * @returns {Promise<boolean>}
 */
const isFollowing = async (followerId, followingId) => {
    const result = await query(
        `SELECT 1 FROM follows WHERE follower_id = $1 AND following_id = $2`,
        [followerId, followingId]
    );
    return result.rowCount > 0;
};

module.exports = {
  followUser,
  unfollowUser,
  getFollowing,
  getFollowers,
  isFollowing
};
