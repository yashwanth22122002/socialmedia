const jwt = require('jsonwebtoken');
require('dotenv').config();

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInVzZXJuYW1lIjoidGVzdHVzZXI0IiwiaWF0IjoxNzY2ODE1OTgxLCJleHAiOjE3NjY5MDIzODF9.m6dESr7y7fZa5m57ghw30FVx_qlRGRhem-qCw_vZ1zc";
const secret = process.env.JWT_SECRET;

console.log("Testing Token:", token);
console.log("Using Secret:", secret);

try {
    const decoded = jwt.verify(token, secret);
    console.log("✅ Token is VALID!");
    console.log("Decoded payload:", decoded);
} catch (error) {
    console.error("❌ Token verification FAILED:");
    console.error(error.message);
}
