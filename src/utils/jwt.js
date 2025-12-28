const jwt = require("jsonwebtoken");
const logger = require("./logger");

/**
 * Generate JWT token for user authentication
 * @param {Object} payload - User data to encode in token
 * @returns {string} JWT token
 */
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
};

/**
 * Verify JWT token
 * @param {string} authHeader - Authorization header (Bearer <token>)
 * @returns {Object} Decoded token payload
 */
const verifyToken = (authHeader) => {
  try {
    if (!authHeader) {
      throw new Error("No authorization header");
    }
    
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("No token provided");
    }

    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    logger.critical("Token verification failed:", error.message);
    throw new Error("Invalid token");
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
