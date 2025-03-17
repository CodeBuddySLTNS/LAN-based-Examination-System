const sqlQuery = require("../sqlQuery");
const { examQuestionsTableQuery } = require("../tableQueries");

class ExamQuestionModel {
  async createExamQuestionTable() {
    await sqlQuery(examQuestionsTableQuery);
  }

  async getAll() {
    await this.createExamQuestionTable();
    const result = await sqlQuery(`SELECT * FROM exam_questions`);
    return result;
  }

  async getExamQuestionById(id) {
    await this.createExamQuestionTable();
    const query = `SELECT * FROM exam_questions WHERE id = ? LIMIT 1`;
    const params = [id];
    const result = await sqlQuery(query, params);
    return result;
  }

  async addExamQuestion(examId, questions) {
    await this.createExamQuestionTable();
    const query = `INSERT INTO exam_questions (exam_id, question_data) VALUES (?, ?)`;
    const params = [examId, JSON.stringify(questions)];
    const result = await sqlQuery(query, params);
    return result;
  }

  async editExamQuestion(examId, questions) {
    await this.createExamQuestionTable();
    const query = `UPDATE exam_questions SET question_data = ? WHERE id = ? LIMIT 1`;
    const params = [JSON.stringify(questions), examId];
    const result = await sqlQuery(query, params);
    return result;
  }

  async deleteExamQuestion(examId) {
    await this.createExamQuestionTable();
    const query = `DELETE FROM exam_questions WHERE id = ? LIMIT 1`;
    const params = [examId];
    const result = await sqlQuery(query, params);
    return result;
  }
}

module.exports = ExamQuestionModel;
