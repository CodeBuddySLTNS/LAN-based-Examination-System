const sqlQuery = require("../sqlQuery");

class UserModel {
  // creates users table if it doesn't exist
  async createUsersTable() {
    const usersTableQuery = `CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      username VARCHAR(15) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      department VARCHAR(255) NOT NULL,
      year INT NOT NULL,
      role VARCHAR(15) NOT NULL DEFAULT 'user',
      isVerified BOOL DEFAULT false
    )`;
    await sqlQuery(usersTableQuery);
  }

  // insert new user to users table
  async createUser(payload) {
    await this.createUsersTable(); // creates users table if it doesn't exist
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
      payload.department,
      payload.year,
    ]);

    return result;
  }

  // edit a user from users table
  async editUser(username) {
    await this.createUsersTable(); // creates users table if it doesn't exist
    const query = `UPDATE users SET name = "Garcia, Andres D." WHERE username = ? LIMIT 1`;
    const result = await sqlQuery(query, [username]);
    console.log(result);
    if (result) {
      if (result?.affectedRows > 0) {
        return result;
      }
      return null;
    }
    return null;
  }

  // deletes a user from users table
  async deleteUser(username) {
    await this.createUsersTable(); // creates users table if it doesn't exist
    const query = `DELETE FROM users WHERE username = ? LIMIT 1`;
    const result = await sqlQuery(query, [username]);

    if (result) {
      if (result?.affectedRows > 0) {
        return result;
      }
      return null;
    }
    return null;
  }

  // verif or unverify a user
  async verifyUser(username, toVerify) {
    await this.createUsersTable(); // creates users table if it doesn't exist
    const query = `UPDATE users SET isVerified = ${
      toVerify ? 1 : 0
    } WHERE username = ? LIMIT 1`;
    const result = await sqlQuery(query, [username]);

    if (result) {
      if (result?.affectedRows > 0) {
        return result;
      }
      return null;
    }
    return null;
  }

  async getUserInfo(userId) {
    await this.createUsersTable(); // creates users table if it doesn't exist
    const query = `SELECT id, name, username, department, year, role
    FROM users WHERE id = ? LIMIT 1`;
    const result = await sqlQuery(query, [userId]);

    if (result) {
      if (result.length > 0) {
        return result[0];
      }
      return null;
    }
    return null;
  }

  // check if a user exists in users table
  async checkUser(username) {
    await this.createUsersTable(); // creates users table if it doesn't exist
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

  // check if a user exists in users table
  async getUserInfo(userId) {
    await this.createUsersTable(); // creates users table if it doesn't exist
    const query = `SELECT id, name, username, department, year, role
    FROM users WHERE id = ? LIMIT 1`;
    const result = await sqlQuery(query, [userId]);

    if (result) {
      if (result.length > 0) {
        return result[0];
      }
      return null;
    }
    return null;
  }
}

module.exports = UserModel;
