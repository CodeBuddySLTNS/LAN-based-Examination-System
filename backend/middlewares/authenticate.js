const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const secretKey = process.env.SYSTEM_SECRET_KEY;

    if (authHeader && authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, secretKey, (err, verifiedToken) => {
        console.log("token", verifiedToken);
        next();
      });
    }
    next();
  } catch (e) {
    next();
  }
};

module.exports = authenticate;
