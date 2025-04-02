const { UNAUTHORIZED } = require("../../constants/statusCodes");
const CustomError = require("../../utils/customError");
const sqlQuery = require("../sqlQuery");
const { subjectsTableQuery } = require("../tableQueries");

class SubjectModel {
  async createSubjectsTable() {
    await sqlQuery(subjectsTableQuery);
  }

  async getAll() {
    await this.createSubjectsTable();
    const query = `SELECT s.*, u.name as created_by FROM subjects s JOIN users u ON u.id = s.created_by`;
    const result = await sqlQuery(query);
    return result;
  }

  async getSubjectById(id) {
    await this.createSubjectsTable();
    const query = `SELECT *  FROM subjects WHERE id = ?`;
    const result = await sqlQuery(query, [id]);
    return result[0];
  }

  async addSubject(userId, course_code, name) {
    await this.createSubjectsTable();
    const query = `INSERT INTO subjects (course_code, name, created_by)
        VALUES (?, ?, ?);`;
    const params = [course_code, name, userId];
    const result = await sqlQuery(query, params);
    return result;
  }

  async editSubject(subject) {
    const query = `INSERT INTO subjects( course_code, name ) VALUES (?, ?)`;
    const params = [subject.courseCode, subject.subjectName];
    const result = await sqlQuery(query, params);
    return result;
  }

  async deleteSubject(subjectId, userId) {
    const query = `DELETE FROM subjects WHERE id = ? LIMIT 1`;
    const params = [subjectId];
    const result = await sqlQuery(query, params);
    return result;
  }
}

module.exports = SubjectModel;
