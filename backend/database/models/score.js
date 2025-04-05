const { UNAUTHORIZED } = require("../../constants/statusCodes");
const CustomError = require("../../utils/customError");
const sqlQuery = require("../sqlQuery");
const { ScoresTableQuery } = require("../tableQueries");

class ScoreModel {
  async createResponsesTable() {
    await sqlQuery(ScoresTableQuery);
  }

  async calculateScore(student_id, exam_id) {
    await this.createResponsesTable();
    const query = `
        INSERT INTO student_scores (student_id, exam_id, total_score, max_score, percentage)
        SELECT 
          r.student_id, 
          r.exam_id,
          SUM(IF(r.is_correct, JSON_UNQUOTE(JSON_EXTRACT(eq.question_data, '$[*].points')), 0)) AS total_score,
          SUM(JSON_UNQUOTE(JSON_EXTRACT(eq.question_data, '$[*].points'))) AS max_score,
          (SUM(IF(r.is_correct, JSON_UNQUOTE(JSON_EXTRACT(eq.question_data, '$[*].points')), 0)) / 
            SUM(JSON_UNQUOTE(JSON_EXTRACT(eq.question_data, '$[*].points')))) * 100 AS percentage
        FROM responses r
        JOIN exam_questions eq ON eq.exam_id = r.exam_id
        WHERE r.student_id = ? AND r.exam_id = ?
        GROUP BY r.student_id, r.exam_id
        ON DUPLICATE KEY UPDATE 
          total_score = VALUES(total_score), 
          max_score = VALUES(max_score), 
          percentage = VALUES(percentage);
    `;
    const result = await sqlQuery(query, [student_id, exam_id]);
  }
}

module.exports = ScoreModel;
