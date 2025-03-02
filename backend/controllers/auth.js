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
const expiration = 12 * 60 * 60;

const login = async (req, res) => {
  // Validate the request body
  const { error, value } = validateLogin(req.body);
  console.log(req.body);
  if (error) {
    throw new CustomError(error.message, BAD_REQUEST);
  }

  const userExist = await User.checkUser(value.username);

  if (userExist) {
    const isMatch = await bcrypt.compare(value.password, userExist.password);
    if (isMatch) {
      const id = userExist.id;
      const token = generateToken({ id });
      return res.json({ id, token });
    }

    throw new CustomError("Incorrect Password", CONFLICT);
  }
  throw new CustomError("User doesn't exist", NOT_FOUND);
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
  res.status(CREATED).json({ result });
};

module.exports = { login, signup };
