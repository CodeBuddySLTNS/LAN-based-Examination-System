const sqlQuery = require("../sqlQuery");

class QuestionModel {
  async getAll() {
    const query = `SELECT * FROM questions`;
    const result = await sqlQuery(query);
    return result;
  }
  
  async add(user_id,question, correct_ans, incorrect_ans) {
    const query = `INSERT INTO questions(
      user_id, question, correct_answer, incorrect_answer
      ) VALUES (?, ?, ?, ?)`;
    const params = [user_id, question, correct_ans, incorrect_ans];
    const result = await sqlQuery(query, params);
    return result;
  }
  
  async update(question, correct_ans, incorrect_ans) {
    const query = `INSERT INTO questions(
      user_id, question, correct_answer, incorrect_answer
      ) VALUES (?, ?, ?)`;
    const params = [question, correct_ans, incorrect_ans];
    const result = await sqlQuery(query, params);
    return result;
  }
  
  async remove(question, correct_ans, incorrect_ans) {
    const query = `INSERT INTO questions(
      user_id, question, correct_answer, incorrect_answer
      ) VALUES (?, ?, ?)`;
    const params = [question, correct_ans, incorrect_ans];
    const result = await sqlQuery(query, params);
    return result;
  }
}

module.exports = QuestionModel;
