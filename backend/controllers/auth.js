const bcrypt = require("bcryptjs");
const CustomError = require("../utils/customError");
const { validateLogin, validateSignup } = require("../utils/validator");
const { generateToken } = require("../utils/generateToken");
const { sqlQuery, checkUser, createUser } = require("../database/sqlQuery");
const {
  BAD_REQUEST,
  NOT_FOUND,
  CREATED,
  CONFLICT
} = require("../constants/statusCodes");

const expiration = 12 * 60 * 60;

module.exports.login = async (req, res) => {
  const { error, value } = validateLogin(req.body);

  if (error) {
    throw new CustomError(error.message, BAD_REQUEST);
  }

  const userExist = await checkUser(value.username);

  if (userExist) {
    const isMatch = await bcrypt.compare(value.password, userExist.password);
    if (isMatch) {
      const id = userExist.id;
      const token = generateToken({ id });
      return res.json({ id, token });
    }

    throw new CustomError("Incorrect Password", CONFLICT);
  }
  return res.status(NOT_FOUND).send("doesn't exist");
};

module.exports.signup = async (req, res) => {
  const { error, value } = validateSignup(req.body);

  if (error) {
    throw new CustomError(error.message, BAD_REQUEST);
  }

  const saltRounds = 10;
  value.password = await bcrypt.hash(value.password, saltRounds);

  const result = await createUser(value);
  res.status(CREATED).send(result);
};
