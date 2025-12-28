const { query } = require("../utils/database");

/**
 * Like model for managing post likes
 */

/**
 * Like a post
 * @param {number} userId 
 * @param {number} postId 
 * @returns {Promise<Object>}
 */
const likePost = async (userId, postId) => {
  const result = await query(
    `INSERT INTO likes (user_id, post_id)
     VALUES ($1, $2)
     ON CONFLICT (user_id, post_id) DO NOTHING
     RETURNING *`,
    [userId, postId]
  );
  return result.rows[0];
};

/**
 * Unlike a post
 * @param {number} userId 
 * @param {number} postId 
 * @returns {Promise<boolean>}
 */
const unlikePost = async (userId, postId) => {
  const result = await query(
    `DELETE FROM likes
     WHERE user_id = $1 AND post_id = $2
     RETURNING *`,
    [userId, postId]
  );
  return result.rowCount > 0;
};

/**
 * Get likes count for a post
 * @param {number} postId 
 * @returns {Promise<number>}
 */
const getPostLikesCount = async (postId) => {
  const result = await query(
    `SELECT COUNT(*) as count FROM likes WHERE post_id = $1`,
    [postId]
  );
  return parseInt(result.rows[0].count);
};

/**
 * Check if user has liked a post
 * @param {number} userId 
 * @param {number} postId 
 * @returns {Promise<boolean>}
 */
const hasUserLikedPost = async (userId, postId) => {
  const result = await query(
    `SELECT 1 FROM likes WHERE user_id = $1 AND post_id = $2`,
    [userId, postId]
  );
  return result.rowCount > 0;
};

module.exports = {
  likePost,
  unlikePost,
  getPostLikesCount,
  hasUserLikedPost
};
