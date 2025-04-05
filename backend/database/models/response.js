const { UNAUTHORIZED } = require("../../constants/statusCodes");
const CustomError = require("../../utils/customError");
const sqlQuery = require("../sqlQuery");
const { subjectsTableQuery, responsesTableQuery } = require("../tableQueries");

class ResponseModel {
  async createResponsesTable() {
    await sqlQuery(responsesTableQuery);
  }

  async getAll() {
    await this.createResponsesTable();
  }

  async getResponseById(id) {
    await this.createResponsesTable();
  }

  async addResponse(userId, course_code, name) {
    await this.createResponsesTable();
  }

  async addMultipleResponse(user_id, exam_id, responses) {
    await this.createResponsesTable();
    const query =
      "INSERT INTO responses (exam_id, student_id, question_id, answer, is_correct) VALUES ?;";
    const values = responses.map(({ questionId, answer }) => [
      exam_id,
      user_id,
      questionId,
      answer,
      null,
    ]);
    const result = await sqlQuery(query, [values]);
    return result;
  }

  async updateResponse(subject) {
    await this.createResponsesTable();
  }

  async deleteResponses(subjectId, userId) {
    await this.createResponsesTable();
  }
}

module.exports = ResponseModel;
