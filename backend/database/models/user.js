const sqlQuery = require("../sqlQuery");
const {
  usersTableQuery,
  completedExamsTableQuery,
} = require("../tableQueries");
const CompletedExamModel = require("./completed_exam");
const ScoreModel = require("./score");

const CompletedExam = new CompletedExamModel();
const Score = new ScoreModel();

class UserModel {
  // creates users table if it doesn't exist
  async createUsersTable() {
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
  async editUser(username, updateString) {
    await this.createUsersTable(); // creates users table if it doesn't exist
    const query = `UPDATE users SET ${updateString} WHERE username = ? LIMIT 1`;
    const result = await sqlQuery(query, [username]);

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
    await this.createUsersTable();
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

  // verify or unverify a user
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

  // get all users from users table
  async getUsers() {
    await this.createUsersTable();
    const query = `SELECT id, name, username, department, year, role, isVerified FROM users`;
    const users = await sqlQuery(query);
    return users;
  }

  // check if a user exists in users table
  async getUserInfo(userId) {
    await this.createUsersTable();
    const query = `SELECT id, name, username, department, year, role, isVerified
    FROM users WHERE id = ? LIMIT 1`;
    const result = await sqlQuery(query, [userId]);

    if (result) {
      if (result.length > 0) {
        const completedExams = await CompletedExam.getCompletedExamsById(
          userId
        );
        if (completedExams)
          return { ...result[0], completed_exams: completedExams };

        return result[0];
      }
      return null;
    }
    return null;
  }

  // check if a user exists in users table
  async checkUser(username) {
    await this.createUsersTable();
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

  async getAverageExamAccuracy(userId) {
    await sqlQuery(completedExamsTableQuery);
    const scores = await Score.getScoresByStudentId(userId);

    let totalPercentage = 0;

    scores.forEach((score) => {
      totalPercentage += parseFloat(score.percentage);
    });

    const average_accuracy = (totalPercentage / scores.length).toFixed(2);

    return { average_accuracy };
  }
}

module.exports = UserModel;
