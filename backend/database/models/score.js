const { UNAUTHORIZED } = require("../../constants/statusCodes");
const CustomError = require("../../utils/customError");
const sqlQuery = require("../sqlQuery");
const { ScoresTableQuery } = require("../tableQueries");

class ScoreModel {
  async createScoresTable() {
    await sqlQuery(ScoresTableQuery);
  }

  async addStudentScore(user_id, exam_id, total_score, max_score) {
    await this.createScoresTable();
    const query = `INSERT INTO student_scores (student_id, exam_id, total_score, max_score)
      VALUES (?, ?, ?, ?)`;
    return await sqlQuery(query, [user_id, exam_id, total_score, max_score]);
  }

  async getScoresByStudentId(student_id) {
    await this.createScoresTable();
    const query = `SELECT * FROM student_scores WHERE student_id = ?`;
    return await sqlQuery(query, [student_id]);
  }
}

module.exports = ScoreModel;
