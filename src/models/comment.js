const { query } = require("../utils/database");

/**
 * Comment model for managing post comments
 */

/**
 * Create a comment
 * @param {number} userId 
 * @param {number} postId 
 * @param {string} content 
 * @returns {Promise<Object>}
 */
const createComment = async (userId, postId, content) => {
  const result = await query(
    `INSERT INTO comments (user_id, post_id, content)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [userId, postId, content]
  );
  return result.rows[0];
};

/**
 * Update a comment
 * @param {number} id 
 * @param {number} userId 
 * @param {string} content 
 * @returns {Promise<Object>}
 */
const updateComment = async (id, userId, content) => {
  const result = await query(
    `UPDATE comments
     SET content = $1, updated_at = NOW()
     WHERE id = $2 AND user_id = $3
     RETURNING *`,
    [content, id, userId]
  );
  return result.rows[0];
};

/**
 * Delete a comment
 * @param {number} id 
 * @param {number} userId 
 * @returns {Promise<boolean>}
 */
const deleteComment = async (id, userId) => {
  const result = await query(
    `DELETE FROM comments
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
    [id, userId]
  );
  return result.rowCount > 0;
};

/**
 * Get comments for a post
 * @param {number} postId 
 * @param {number} limit 
 * @param {number} offset 
 * @returns {Promise<Array>}
 */
const getPostComments = async (postId, limit = 20, offset = 0) => {
  const result = await query(
    `SELECT c.id, c.content, c.created_at, c.updated_at,
            u.id as user_id, u.username, u.full_name
     FROM comments c
     JOIN users u ON c.user_id = u.id
     WHERE c.post_id = $1
     ORDER BY c.created_at ASC
     LIMIT $2 OFFSET $3`,
    [postId, limit, offset]
  );
  return result.rows;
};

/**
 * Get comment by ID
 * @param {number} id 
 * @returns {Promise<Object>}
 */
const getCommentById = async (id) => {
  const result = await query(
    `SELECT * FROM comments WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getPostComments,
  getCommentById
};
