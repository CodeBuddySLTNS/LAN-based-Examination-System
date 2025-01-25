const CustomError = require("../utils/customError");
const { sqlQuery, usersTableQuery } = require("../database/sqlQuery");

const users = async (req, res) => {
  console.log(res.locals.userId);
  const query = `SELECT * FROM users`;
  const result = await sqlQuery(query);
  res.json({ users: result });
};

const userInfo = async (req, res) => {
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
