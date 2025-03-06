const jwt = require("jsonwebtoken");
const { FORBIDDEN } = require("../constants/statusCodes");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const secretKey = process.env.SYSTEM_SECRET_KEY;

    // Allow login and signup without token
    if (req.url === "/auth/login" || req.url === "/auth/signup") {
      return next();
    }

    if (authHeader && authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];
      if (token) {
        jwt.verify(token, secretKey, (err, verifiedToken) => {
          if (err) {
            console.log("not logged in:", token);
            return res.status(FORBIDDEN).json({ message: "Invalid token" });
          }
          res.locals.userId = verifiedToken.id;
          next();
          console.log("logged in");
        });
      } else {
        return res.status(FORBIDDEN).json({ message: "Invalid token" });
      }
    } else {
      return res.status(FORBIDDEN).json({ message: "Invalid token" });
    }
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = authenticate;
