const jwt = require("jsonwebtoken");
const secretKey = process.env.SYSTEM_SECRET_KEY;
const defaultExpiry = 12 * 60 * 60;
module.exports.generateToken = (payload, expiryDate) => {
  return jwt.sign(payload, secretKey, { expiresIn: expiryDate || defaultExpiry });
};
