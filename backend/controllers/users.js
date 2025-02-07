const CustomError = require("../utils/customError");
const sqlQuery = require("../database/sqlQuery");

const users = async (req, res) => {
  const query = `SELECT * FROM users`;
  const result = await sqlQuery(query);
  res.json({ users: result });
};

const userInfo = async (req, res) => {
  return res.json({ name: "renz", username: "renz05", password: "1234" });
  const username = req.params.username;
  const query = `SELECT * FROM users WHERE username = ? LIMIT 1`;
  const result = await sqlQuery(query, [username]);
  const user = result[0];
  delete user.password;
  res.json(user);
};

module.exports = {
  users,
  userInfo
};
