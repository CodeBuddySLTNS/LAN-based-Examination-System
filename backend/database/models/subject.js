const sqlQuery = require("../sqlQuery");
const { subjectsTableQuery } = require("../tableQueries");

class SubjectModel {
  async createSubjectsTable() {
    await sqlQuery(subjectsTableQuery);
  }

  async getAll() {
    await this.createSubjectsTable();
    const query = `SELECT * FROM subjects`;
    const result = await sqlQuery(query);
    return result;
  }

  async addSubject(userId, course_code, name) {
    await this.createSubjectsTable();
    const query = `INSERT INTO subjects (course_code, name, created_by)
        VALUES (?, ?, ?);`;
    const params = [course_code, name, userId];
    const result = await sqlQuery(query, params);
    return result;
  }

  async editQuestion(qdata) {
    const query = `INSERT INTO question_bank(
      subject, question_text, question_type, choices, correct_answer
      ) VALUES (?, ?, ?, ?, ?)`;
    const params = [
      qdata.subject,
      qdata.question,
      qdata.questionType,
      JSON.stringify(qdata.choices),
      JSON.stringify(qdata.correctAnswer),
    ];

    const result = await sqlQuery(query, params);
    return result;
  }

  async deleteQuestion(question_id) {
    const query = `DELETE FROM question_bank WHERE id = ? LIMIT 1`;
    const params = [question_id];
    const result = await sqlQuery(query, params);
    return result;
  }
}

module.exports = SubjectModel;
