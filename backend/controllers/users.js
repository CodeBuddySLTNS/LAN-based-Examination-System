const CustomError = require("../utils/customError");
const sqlQuery = require("../database/sqlQuery");
const UserModel = require("../database/models/user");

const User = new UserModel();

const users = async (req, res) => {
  const query = `SELECT * FROM users`;
  const result = await sqlQuery(query);
  res.json({ users: "result" });
};

const userInfo = async (req, res) => {
  const userId = res.locals.userId;
  const user = User.getUserInfo(userId);

  res.json({ user });
};

const deleteAccount = async (req, res) => {
  console.log(req.params);
  const userId = "";
  const query = `DELETE FROM users WHERE id = ? LIMIT 1`;
  const result = await sqlQuery(query, [userId]);

  if (result.length === 0) {
    throw new CustomError("User not found", 404);
  }

  res.json({ user: result[0] });
};

module.exports = {
  users,
  userInfo,
  deleteAccount,
};
