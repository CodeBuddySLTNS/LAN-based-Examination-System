const sqlQuery = require("../sqlQuery");

class UserModel {
  constructor() {
    this.checkUser = checkUser;
    this.createUser = createUser;
  }
}

// check if a user exists in users table
async function checkUser(username) {
  const query = `SELECT * FROM users WHERE username = ? LIMIT 1`;
  const result = await sqlQuery(query, [username]);
  if (result) {
    if (result.length > 0) {
      return result[0];
    }
    return null;
  }
  return null;
}

// insert new user to users table
async function createUser(payload) {
  const query = `INSERT INTO users (
    name,
    username,
    password
  ) VALUES ( ?, ?, ?);`;
  const result = await sqlQuery(query, [
    payload.name,
    payload.username,
    payload.password
  ]);
  return result;
}

module.exports = UserModel;
