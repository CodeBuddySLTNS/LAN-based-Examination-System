const CustomError = require("../utils/customError");
const sqlQuery = require("../database/sqlQuery");

const users = async (req, res) => {
  const query = `SELECT * FROM users`;
  const result = await sqlQuery(query);
  res.json({ users: result });
};

const userInfo = async (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM users WHERE id = ${id} LIMIT 1`;
  const result = await sqlQuery(query);
  if (result.length === 0) {
    throw new CustomError("User not found", 404);
  }
  console.log(result[0]);
  res.json({ user: result[0] });
};

module.exports = {
  users,
  userInfo,
};
