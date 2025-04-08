const { UNAUTHORIZED } = require("../../constants/statusCodes");
const CustomError = require("../../utils/customError");
const sqlQuery = require("../sqlQuery");
const { completedExamsTableQuery } = require("../tableQueries");

class CompletedExamModel {
  async createResponsesTable() {
    await sqlQuery(completedExamsTableQuery);
  }

  async getCompletedExamsById(user_id) {
    await sqlQuery(completedExamsTableQuery);
    const query = `SELECT * FROM completed_exams WHERE user_id = ?`;
    return await sqlQuery(query, [user_id]);
  }

  async completeExam(user_id, exam_id) {
    await sqlQuery(completedExamsTableQuery);
    const query = `INSERT INTO completed_exams (user_id, exam_id) VALUES (? , ?)`;
    return await sqlQuery(query, [user_id, exam_id]);
  }
}

module.exports = CompletedExamModel;
