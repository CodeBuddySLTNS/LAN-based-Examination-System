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

const verifyAccount = async (req, res) => {
  console.log("verifyAccount");
  const { username, toVerify } = req.body;
  const result = await User.verifyUser(username, toVerify);

  if (result) {
    return res.json({ deleted: true, username, result });
  }

  throw new CustomError(
    `Unable to delete ${username}, it maybe because it is not found or internal server error.`,
    CONFLICT
  );
};

const deleteAccount = async (req, res) => {
  const { username } = req.body;
  const result = await User.deleteUser(username);
  console.log("deleteAccount");
  if (result) {
    return res.json({ deleted: true, username, result });
  }

  throw new CustomError(
    `Unable to delete ${username}, it maybe because it is not found or internal server error.`,
    CONFLICT
  );
};

module.exports = {
  users,
  userInfo,
  verifyAccount,
  deleteAccount,
};
