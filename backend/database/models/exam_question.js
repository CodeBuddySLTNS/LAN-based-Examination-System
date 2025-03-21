const sqlQuery = require("../sqlQuery");
const { examQuestionsTableQuery } = require("../tableQueries");

class ExamQuestionModel {
  async createExamQuestionTable() {
    await sqlQuery(examQuestionsTableQuery);
  }

  async getAll() {
    await this.createExamQuestionTable();
    return await sqlQuery(`SELECT * FROM exam_questions`);
  }

  async getExamQuestionById(id) {
    await this.createExamQuestionTable();
    const query = `SELECT * FROM exam_questions WHERE id = ? LIMIT 1`;
    const params = [id];
    return await sqlQuery(query, params);
  }

  async addExamQuestion(examId, questions) {
    await this.createExamQuestionTable();
    const query = `INSERT INTO exam_questions (exam_id, question_data) VALUES (?, ?)`;
    const params = [examId, JSON.stringify(questions)];
    return await sqlQuery(query, params);
  }

  async editExamQuestion(examId, questions) {
    await this.createExamQuestionTable();
    const query = `UPDATE exam_questions SET question_data = ? WHERE exam_id = ? LIMIT 1`;
    const params = [JSON.stringify(questions), examId];
    return await sqlQuery(query, params);
  }

  async deleteExamQuestion(examId) {
    await this.createExamQuestionTable();
    const query = `DELETE FROM exam_questions WHERE id = ? LIMIT 1`;
    const params = [examId];
    return await sqlQuery(query, params);
  }
}

module.exports = ExamQuestionModel;
