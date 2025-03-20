const sqlQuery = require("../sqlQuery");
const { examsTableQuery } = require("../tableQueries");

class ExamModel {
  async createExamTable() {
    await sqlQuery(examsTableQuery);
  }

  async getAll() {
    await this.createExamTable();
    const result = await sqlQuery(`
      SELECT 
        e.id, 
        e.subject, 
        e.title, 
        e.description, 
        CONCAT(LPAD(e.duration_hours, 2, '0'), ' : ', LPAD(e.duration_minutes, 2, '0')) AS duration, 
        e.start_time, 
        e.examiner_id,
        GROUP_CONCAT(eq.question_data) AS questions
      FROM exams e
      LEFT JOIN exam_questions eq ON e.id = eq.exam_id
      GROUP BY e.id
    `);
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
    const query = `INSERT INTO exams (subject, title, description, duration_hours, duration_minutes, start_time, examiner_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [
      examData.subject,
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
