const sqlQuery = require("../sqlQuery");

class UserModel {
  // creates users table if it doesn't exist
  async createUsersTable() {
    const usersTableQuery = `CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      username VARCHAR(15) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
      department VARCHAR(255) NOT NULL,
      year INT NOT NULL,
      role VARCHAR(15) NOT NULL DEFAULT 'user',
    )`;
    await sqlQuery(usersTableQuery);
  }

  // check if a user exists in users table
  async checkUser(username) {
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
  async createUser(payload) {
    const query = `INSERT INTO users (
    name,
    username,
    password,
    department,
    year
  ) VALUES ( ?, ?, ?, ?, ?);`;

    const result = await sqlQuery(query, [
      payload.name,
      payload.username,
      payload.password,
      payload.department || "BSIT",
      payload.year || 2,
    ]);
    return result;
  }
}

module.exports = UserModel;
