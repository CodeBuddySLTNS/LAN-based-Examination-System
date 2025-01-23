const  CustomError  = require("../utils/customError");
const { sqlQuery } = require("../database/sqlQuery");

module.exports.users = async (req, res) => {
  res.cookie("user", "JohnDoe", {
    httpOnly: true, // Cookie can only be accessed by the server
    sameSite: "None", // Allows cookie to be sent with same-site requests or top-level navigation
    maxAge: 3600000 // Cookie expiration time (1 hour)
  });
  return res.send({ status: true });

  const query = `SELECT * = require( users`;
  const result = await sqlQuery(query);
  res.json({ result });
};
