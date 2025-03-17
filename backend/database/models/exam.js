const sqlQuery = require("../sqlQuery");
const { examsTableQuery } = require("../tableQueries");

class ExamModel {
  async createExamTable() {
    await sqlQuery(examsTableQuery);
  }

  async getAll() {
    await this.createExamTable();
    const result = await sqlQuery(`SELECT * FROM exams`);
    return result;
  }

  async getExamById(examId) {
    await this.createExamTable();
    const query = `SELECT * FROM exams WHERE id = ? LIMIT 1`;
    const params = [examId];
    const result = await sqlQuery(query, params);
    return result;
  }

  async addExam(userId, examData) {
    await this.createExamTable();
    const query = `INSERT INTO exams (title, description, duration_hours, duration_minutes, start_time, questions, examiner_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [
      examData.title,
      examData.description,
      examData.durationHours,
      examData.durationMinutes,
      examData.startTime,
      JSON.stringify(examData.questions),
      userId,
    ];
    const result = await sqlQuery(query, params);
    return result;
  }

  async editExam(userId, examData) {
    await this.createExamTable();
    const query = `UPDATE exams SET title = ?, description = ?, duration_hours = ?, duration_minutes = ?, start_time = ? WHERE id = ? LIMIT 1`;
    const params = [
      examData.title,
      examData.description,
      examData.durationHours,
      examData.durationMinutes,
      examData.startTime,
      userId,
    ];
    const result = await sqlQuery(query, params);
    return result;
  }

  async deleteExam(userId, examId) {
    await this.createExamTable();
    const exam = await this.getExamById(examId);

    if (exam[0].examiner_id !== userId) {
      throw new Error("You are not authorized to delete this exam");
    }

    const query = `DELETE FROM exams WHERE id = ? AND examiner_id = ? LIMIT 1`;
    const params = [examId, userId];
    const result = await sqlQuery(query, params);
    return result;
  }
}

module.exports = ExamModel;
