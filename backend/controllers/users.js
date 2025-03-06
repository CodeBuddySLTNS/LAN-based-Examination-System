const CustomError = require("../utils/customError");
const sqlQuery = require("../database/sqlQuery");
const UserModel = require("../database/models/user");
const { CONFLICT, NOT_FOUND } = require("../constants/statusCodes");

const User = new UserModel();

const users = async (req, res) => {
  const query = `SELECT * FROM users`;
  const result = await sqlQuery(query);
  res.json({ users: result });
};

const userInfo = async (req, res) => {
  const userId = res.locals.userId;
  const user = await User.getUserInfo(userId);

  if (user) {
    return res.json({ user });
  }

  throw new CustomError("User not found", NOT_FOUND);
};

const deleteAccount = async (req, res) => {
  const username = req.params.username;
  const deleted = await User.deleteUser(username);

  if (deleted) {
    return res.json({ deleted: true, username });
  }

  throw new CustomError(
    `Unable to delete ${username}, it maybe because it is not found or internal server error.`,
    CONFLICT
  );
};

module.exports = {
  users,
  userInfo,
  deleteAccount,
};
