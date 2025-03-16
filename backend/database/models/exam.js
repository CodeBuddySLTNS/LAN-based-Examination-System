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

  async addExam() {
    await this.createExamTable();
  }
}

module.exports = ExamModel;
