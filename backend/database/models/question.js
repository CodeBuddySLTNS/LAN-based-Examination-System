const sqlQuery = require("../sqlQuery");
const { questionBankTableQuery } = require("../tableQueries");

class QuestionModel {
  async createQuestionsTable() {
    await sqlQuery(questionBankTableQuery);
  }

  async getAll() {
    await this.createQuestionsTable();
    const query = `SELECT qb.*, u.name as created_by FROM question_bank qb
      JOIN users u ON qb.created_by = u.id`;
    const result = await sqlQuery(query);
    return result;
  }

  async addQuestion(qdata) {
    await this.createQuestionsTable();
    let query, params;

    if (qdata.questionType === "multiple_choice") {
      query = `INSERT INTO question_bank(
        subject, question_text, question_type, choices, correct_answer, created_by
        ) VALUES (?, ?, ?, ?, ?, ?)`;
      params = [
        qdata.subject,
        qdata.question,
        qdata.questionType,
        JSON.stringify(qdata.choices),
        JSON.stringify(qdata.correctAnswer),
        qdata.userId,
      ];
    } else {
      query = `INSERT INTO question_bank(
        subject, question_text, question_type, correct_answer, created_by
        ) VALUES (?, ?, ?, ?, ?)`;
      params = [
        qdata.subject,
        qdata.question,
        qdata.questionType,
        JSON.stringify(qdata.correctAnswer),
        qdata.userId,
      ];
    }

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

module.exports = QuestionModel;
