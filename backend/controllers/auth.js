const bcrypt = require("bcryptjs");
const UserModel = require("../database/models/user");
const CustomError = require("../utils/customError");
const { validateLogin, validateSignup } = require("../utils/validator");
const { generateToken } = require("../utils/generateToken");
const {
  BAD_REQUEST,
  NOT_FOUND,
  CREATED,
  CONFLICT,
} = require("../constants/statusCodes");

const User = new UserModel();
const expiresIn = 3 * 60 * 60; // 3 hours

const login = async (req, res) => {
  // Validate the request body
  const { error, value } = validateLogin(req.body);

  if (error) {
    throw new CustomError(error.message, BAD_REQUEST);
  }

  const userExist = await User.checkUser(value.username);

  if (userExist) {
    const isMatch = await bcrypt.compare(value.password, userExist.password);
    if (isMatch) {
      const id = userExist.id;
      const token = generateToken({ id }, expiresIn);
      const user = {
        id: userExist.id,
        name: userExist.name,
        username: userExist.username,
        department: userExist.department,
        year: userExist.year,
        role: userExist.role,
      };

      return res.json({ id, token, user });
    }

    throw new CustomError("Incorrect Password", CONFLICT, {
      password: "Incorrect password",
    });
  }
  throw new CustomError("User doesn't exist", NOT_FOUND, {
    username: "User doesn't exist",
  });
};

const signup = async (req, res) => {
  // Validate the request body
  const { error, value } = validateSignup(req.body);

  if (error) {
    throw new CustomError(error.message, BAD_REQUEST);
  }

  const saltRounds = 10;
  value.password = await bcrypt.hash(value.password, saltRounds);

  const result = await User.createUser(value);
  const userExist = await User.checkUser(value.username);
  const token = generateToken({ id: userExist.id }, expiresIn);
  const user = {
    id: userExist.id,
    name: userExist.name,
    username: userExist.username,
    department: userExist.department,
    year: userExist.year,
    role: userExist.role,
  };

  res.status(CREATED).json({ result, user, token });
};

module.exports = { login, signup };
