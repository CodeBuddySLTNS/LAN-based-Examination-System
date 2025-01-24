const CustomError = require("../utils/customError");
const { sqlQuery, usersTableQuery } = require("../database/sqlQuery");

module.exports.users = async (req, res) => {
  const query = `SELECT * FROM users`;
  const result = await sqlQuery(query);
  res.json({users: result});
};

module.exports.userInfo = async (req, res) => {
  const username = req.params.username;
  const query = `SELECT * FROM users WHERE username = ? LIMIT 1`;
  const result = await sqlQuery(query, [username]);
  const user = result[0];
  delete user.password;
  res.json(user);
};
