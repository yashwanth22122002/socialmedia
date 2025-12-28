const { query } = require("../utils/database");

/**
 * Post Model
 * 
 * Handles database operations for posts, including creation, retrieval, deletion,
 * and feed generation.
 */

/**
 * Create a new post
 * @param {Object} postData - Post data
 * @returns {Promise<Object>} Created post
 */
const createPost = async ({
  user_id,
  content,
  media_url,
  comments_enabled = true,
}) => {
  const result = await query(
    `INSERT INTO posts (user_id, content, media_url, comments_enabled, created_at, is_deleted)
     VALUES ($1, $2, $3, $4, NOW(), false)
     RETURNING id, user_id, content, media_url, comments_enabled, created_at`,
    [user_id, content, media_url, comments_enabled],
  );

  return result.rows[0];
};

/**
 * Get post by ID
 * @param {number} postId - Post ID
 * @returns {Promise<Object|null>} Post object or null
 */
const getPostById = async (postId) => {
  const result = await query(
    `SELECT p.*, u.username, u.full_name,
     (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as likes_count,
     (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comments_count
     FROM posts p
     JOIN users u ON p.user_id = u.id
     WHERE p.id = $1 AND p.is_deleted = FALSE`,
    [postId],
  );

  return result.rows[0] || null;
};

/**
 * Get posts by user ID
 * @param {number} userId - User ID
 * @param {number} limit - Number of posts to fetch
 * @param {number} offset - Offset for pagination
 * @returns {Promise<Array>} Array of posts
 */
const getPostsByUserId = async (userId, limit = 20, offset = 0) => {
  const result = await query(
    `SELECT p.*, u.username, u.full_name,
     (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as likes_count,
     (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comments_count
     FROM posts p
     JOIN users u ON p.user_id = u.id
     WHERE p.user_id = $1 AND p.is_deleted = FALSE
     ORDER BY p.created_at DESC
     LIMIT $2 OFFSET $3`,
    [userId, limit, offset],
  );

  return result.rows;
};

/**
 * Delete a post
 * @param {number} postId - Post ID
 * @param {number} userId - User ID (for ownership verification)
 * @returns {Promise<boolean>} Success status
 */
const deletePost = async (postId, userId) => {
  const result = await query(
    "UPDATE posts SET is_deleted = true WHERE id = $1 AND user_id = $2",
    [postId, userId],
  );

  return result.rowCount > 0;
};

/**
 * Get feed posts (posts from followed users + self)
 * 
 * This query fetches posts where the author is either the current user OR
 * someone the current user follows. It also includes metadata like like/comment counts
 * and whether the current user has liked the post.
 * 
 * @param {number} userId - Current user ID
 * @param {number} limit 
 * @param {number} offset 
 * @returns {Promise<Array>}
 */
const getFeedPosts = async (userId, limit = 20, offset = 0) => {
  const result = await query(
    `SELECT p.*, u.username, u.full_name,
     (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as likes_count,
     (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comments_count,
     EXISTS(SELECT 1 FROM likes WHERE post_id = p.id AND user_id = $1) as has_liked
     FROM posts p
     JOIN users u ON p.user_id = u.id
     WHERE (p.user_id = $1 OR p.user_id IN (SELECT following_id FROM follows WHERE follower_id = $1))
       AND p.is_deleted = FALSE
     ORDER BY p.created_at DESC
     LIMIT $2 OFFSET $3`,
    [userId, limit, offset]
  );
  return result.rows;
};

module.exports = {
  createPost,
  getPostById,
  getPostsByUserId,
  deletePost,
  getFeedPosts
};
