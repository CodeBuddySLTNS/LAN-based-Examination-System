const { UNAUTHORIZED } = require("../../constants/statusCodes");
const CustomError = require("../../utils/customError");
const sqlQuery = require("../sqlQuery");
const { subjectsTableQuery, responsesTableQuery } = require("../tableQueries");
const ExamModel = require("./exam");
const ScoreModel = require("./score");

const Exam = new ExamModel();
const Score = new ScoreModel();

class ResponseModel {
  async createResponsesTable() {
    await sqlQuery(responsesTableQuery);
  }

  async getAll() {
    await this.createResponsesTable();
  }

  async getResponseById(id) {
    await this.createResponsesTable();
  }

  async addResponse(userId, course_code, name) {
    await this.createResponsesTable();
  }

  async addMultipleResponse(user_id, exam_id, responses) {
    await this.createResponsesTable();
    const query =
      "INSERT INTO responses (exam_id, student_id, question_id, answer, is_correct) VALUES ?;";
    const values = responses.map(({ questionId, answer }) => [
      exam_id,
      user_id,
      questionId,
      answer,
      null,
    ]);
    const result = await sqlQuery(query, [values]);
    return result;
  }

  async checkAnswers(student_id, exam_id) {
    await this.createResponsesTable();
    const exam = await Exam.getExamById(exam_id);
    const questions = exam[0]?.questions;

    const resQuery = `SELECT * FROM responses WHERE student_id = ? AND exam_id = ?`;
    const responses = await sqlQuery(resQuery, [student_id, exam_id]);

    let total_score = 0;
    const correctResponseIDs = [];

    questions?.forEach((q) => {
      switch (q.question_type) {
        case "multiple_choice":
          let isCorrect;
          responses.forEach((r) => {
            if (isCorrect) return;
            const answers = JSON.parse(r.answer || "[]");
            answers?.forEach((answer) => {
              if (q.correct_answer.includes(answer)) {
                isCorrect = true;
                correctResponseIDs.push(r.id);
              }
            });
          });
          if (isCorrect) total_score += 1;
          break;

        case "identification":
          console.log("identifcation");
          break;
        case "enumeration":
          console.log("enumeration");
          break;

        default:
          break;
      }
    });

    await Score.addStudentScore(
      student_id,
      exam_id,
      total_score,
      questions.length
    );

    return {
      total_score,
      max_score: questions.length,
    };
  }

  async deleteResponses(subjectId, userId) {
    await this.createResponsesTable();
  }
}

module.exports = ResponseModel;
