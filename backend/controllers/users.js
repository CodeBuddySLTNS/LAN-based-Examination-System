const CustomError = require("../utils/customError");
const sqlQuery = require("../database/sqlQuery");
const UserModel = require("../database/models/user");
const { CONFLICT, NOT_FOUND, FORBIDDEN } = require("../constants/statusCodes");

const User = new UserModel();

const users = async (req, res) => {
  const users = await User.getUsers();
  res.send(users);
};

const userInfo = async (req, res) => {
  const userId = res.locals.userId;
  const user = await User.getUserInfo(userId);

  if (user) {
    return res.json({ user });
  }

  throw new CustomError("User not found", NOT_FOUND);
};

const averageExamAccuracy = async (req, res) => {
  const userId = res.locals.userId;
  const results = await User.getAverageExamAccuracy(userId);
  res.send(results);
};

const verifyAccount = async (req, res) => {
  const { username, toVerify } = req.body;
  const userId = res.locals.userId;
  const user = await User.getUserInfo(userId);
  const whitelist = ["Admin", "Faculty"];

  if (!whitelist.includes(user?.role)) {
    throw new CustomError(
      "You are not authorized to perform this action",
      FORBIDDEN
    );
  }

  const result = await User.verifyUser(username, toVerify);

  if (result) {
    return res.json({ deleted: true, username, result });
  }

  throw new CustomError(
    `Unable to delete ${username}, it maybe because it is not found or server error.`,
    CONFLICT
  );
};

const editAccount = async (req, res) => {
  const { username, updateBody } = req.body;
  const userId = res.locals.userId;
  const user = await User.getUserInfo(userId);
  const whitelist = ["Admin", "Faculty"];

  if (!whitelist.includes(user?.role)) {
    throw new CustomError(
      "You are not authorized to perform this action",
      FORBIDDEN
    );
  }

  const updateArray = [];

  if (typeof updateBody === "object") {
    Object.entries(updateBody).map((f) => {
      updateArray.push(
        `${f[0]} = ${typeof f[1] === "number" ? f[1] : `"${f[1]}"`}`
      );
    });
  }

  const result = await User.editUser(username, updateArray.join(", "));

  if (result) {
    return res.json({ modified: true, username, result });
  }

  throw new CustomError(
    `Unable to edit ${username}, it maybe because it was not found or server error.`,
    CONFLICT
  );
};

const deleteAccount = async (req, res) => {
  const { username } = req.body;
  const userId = res.locals.userId;
  const user = await User.getUserInfo(userId);
  const whitelist = ["Admin", "Faculty"];

  if (!whitelist.includes(user?.role)) {
    throw new CustomError(
      "You are not authorized to perform this action",
      FORBIDDEN
    );
  }

  const result = await User.deleteUser(username);

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
  editAccount,
  deleteAccount,
  averageExamAccuracy,
};
