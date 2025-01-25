const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const secretKey = process.env.SYSTEM_SECRET_KEY;

    if (authHeader && authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];
      if (token) {
        jwt.verify(token, secretKey, (err, verifiedToken) => {
          if (err) {
            return next();
          }
          res.locals.userId = verifiedToken.id;
          next();
        });
      } else {
        next();
      }
    } else {
      next();
    }
  } catch (e) {
    next();
  }
};

module.exports = authenticate;
