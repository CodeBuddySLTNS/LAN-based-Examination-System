const { FORBIDDEN } = require("../../constants/statusCodes");
const CustomError = require("../../utils/customError");
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
        e.*, 
        CONCAT(LPAD(e.duration_hours, 2, '0'), ' : ', LPAD(e.duration_minutes, 2, '0')) AS duration, 
        eq.id as exam_question_id,
        s.course_code,
        s.name as subject,
        u.name as examineer,
        GROUP_CONCAT(eq.question_data) AS questions
      FROM exams e
      JOIN subjects s ON e.subject = s.course_code
      JOIN users u ON e.examiner_id = u.id
      LEFT JOIN exam_questions eq ON e.id = eq.exam_id
      GROUP BY e.id
    `);
    return result;
  }

  async getExamById(examId) {
    await this.createExamTable();
    const query = `SELECT 
        e.*, 
        CONCAT(LPAD(e.duration_hours, 2, '0'), ' : ', LPAD(e.duration_minutes, 2, '0')) AS duration, 
        eq.id as exam_question_id,
        s.course_code,
        s.name as subject,
        u.name as examineer,
        GROUP_CONCAT(eq.question_data) AS questions
      FROM exams e
      JOIN subjects s ON e.subject = s.course_code
      JOIN users u ON e.examiner_id = u.id
      LEFT JOIN exam_questions eq ON e.id = eq.exam_id
      WHERE e.id = ?
      GROUP BY e.id LIMIT 1`;
    const params = [examId];
    const result = await sqlQuery(query, params);
    return result;
  }

  async getExamsByDepartment(department, year) {
    await this.createExamTable();
    const query = `SELECT 
        e.*, 
        CONCAT(LPAD(e.duration_hours, 2, '0'), ' : ', LPAD(e.duration_minutes, 2, '0')) AS duration, 
        eq.id as exam_question_id,
        s.course_code,
        s.name as subject,
        u.name as examineer,
        GROUP_CONCAT(eq.question_data) AS questions
      FROM exams e
      JOIN subjects s ON e.subject = s.course_code
      JOIN users u ON e.examiner_id = u.id
      LEFT JOIN exam_questions eq ON e.id = eq.exam_id
      WHERE e.department = ? AND e.year = ?
      GROUP BY e.id`;
    const params = [department, year];
    const result = await sqlQuery(query, params);
    return result;
  }

  async setCompletedExamById(examId) {
    await this.createExamTable();
    const query = `SELECT * FROM exams WHERE id = ? LIMIT 1`;
    const params = [examId];
    const result = await sqlQuery(query, params);
    return result;
  }

  async addExam(userId, examData) {
    await this.createExamTable();
    const query = `INSERT INTO exams (subject, department, year, label, description, duration_hours, duration_minutes, start_time, examiner_id) VALUES (?, ?, ?, ?, ?, ?, ?,?, ?)`;
    const params = [
      examData.subject,
      examData.department,
      examData.year,
      examData.label,
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
    const query = `UPDATE exams SET label = ?, description = ?, duration_hours = ?, duration_minutes = ?, start_time = ? WHERE id = ? LIMIT 1`;
    const params = [
      examData.label,
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
    const query = `DELETE FROM exams WHERE id = ? LIMIT 1`;
    const params = [examId, userId];
    const result = await sqlQuery(query, params);
    return result;
  }
}

module.exports = ExamModel;
