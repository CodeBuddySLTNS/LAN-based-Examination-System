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
    const exams = await sqlQuery(`
      SELECT 
        e.*, 
        CONCAT(LPAD(e.duration_hours, 2, '0'), ' : ', LPAD(e.duration_minutes, 2, '0')) AS duration, 
        s.course_code,
        s.name as subject,
        u.name as examineer
      FROM exams e
      JOIN subjects s ON e.subject = s.course_code
      JOIN users u ON e.examiner_id = u.id
      ORDER BY e.start_time DESC
    `);

    const examIds = exams.map((exam) => exam.id);

    const examQuestionsRows = await sqlQuery(
      `
      SELECT exam_id, question_data FROM exam_questions WHERE exam_id IN (?)
    `,
      [examIds]
    );

    const questionMap = {};
    const allQuestionIds = new Set();

    for (const row of examQuestionsRows) {
      const questions = JSON.parse(row.question_data);
      questionMap[row.exam_id] = questions;
      questions.forEach((q) => allQuestionIds.add(q.questionId));
    }

    const questionBankRows =
      allQuestionIds.size > 0
        ? await sqlQuery(
            `
      SELECT * FROM question_bank WHERE id IN (?)
    `,
            [[...allQuestionIds]]
          )
        : [];

    const examsWithQuestions = exams.map((exam) => {
      const rawQuestions = questionMap[exam.id] || [];

      const questions = rawQuestions.map((q) => {
        const full = questionBankRows.find((row) => row.id === q.questionId);
        if (!full) return null;

        return {
          id: q.questionId,
          points: q.points,
          question_text: full.question_text,
          question_type: full.question_type,
          choices: full.choices ? JSON.parse(full.choices) : null,
          correct_answer: full.correct_answer
            ? JSON.parse(full.correct_answer)
            : null,
        };
      });

      return { ...exam, questions };
    });

    return examsWithQuestions;
  }

  async getExamById(examId) {
    await this.createExamTable();
    const exams = await sqlQuery(
      `
      SELECT 
        e.*, 
        CONCAT(LPAD(e.duration_hours, 2, '0'), ' : ', LPAD(e.duration_minutes, 2, '0')) AS duration, 
        s.course_code,
        s.name as subject,
        u.name as examineer
      FROM exams e
      JOIN subjects s ON e.subject = s.course_code
      JOIN users u ON e.examiner_id = u.id
      WHERE e.id = ?
    `,
      [examId]
    );

    const examIds = exams.map((exam) => exam.id);

    const examQuestionsRows = await sqlQuery(
      `
      SELECT exam_id, question_data FROM exam_questions WHERE exam_id IN (?)
    `,
      [examIds]
    );

    const questionMap = {};
    const allQuestionIds = new Set();

    for (const row of examQuestionsRows) {
      const questions = JSON.parse(row.question_data);
      questionMap[row.exam_id] = questions;
      questions.forEach((q) => allQuestionIds.add(q.questionId));
    }

    const questionBankRows =
      allQuestionIds.size > 0
        ? await sqlQuery(
            `
      SELECT * FROM question_bank WHERE id IN (?)
    `,
            [[...allQuestionIds]]
          )
        : [];

    const examsWithQuestions = exams.map((exam) => {
      const rawQuestions = questionMap[exam.id] || [];

      const questions = rawQuestions.map((q) => {
        const full = questionBankRows.find((row) => row.id === q.questionId);
        if (!full) return null;

        return {
          id: q.questionId,
          points: q.points,
          question_text: full.question_text,
          question_type: full.question_type,
          choices: full.choices ? JSON.parse(full.choices) : null,
          correct_answer: full.correct_answer
            ? JSON.parse(full.correct_answer)
            : null,
        };
      });

      return { ...exam, questions };
    });

    return examsWithQuestions;
  }

  async getExamsByDepartment(department, year) {
    await this.createExamTable();
    const exams = await sqlQuery(
      `
      SELECT 
        e.*, 
        CONCAT(LPAD(e.duration_hours, 2, '0'), ' : ', LPAD(e.duration_minutes, 2, '0')) AS duration, 
        s.course_code,
        s.name as subject,
        u.name as examineer
      FROM exams e
      JOIN subjects s ON e.subject = s.course_code
      JOIN users u ON e.examiner_id = u.id
      WHERE e.department = ? AND e.year = ?
      ORDER BY e.start_time DESC
    `,
      [department, year]
    );

    const examIds = exams.map((exam) => exam.id);

    const examQuestionsRows = await sqlQuery(
      `
      SELECT exam_id, question_data FROM exam_questions WHERE exam_id IN (?)
    `,
      [examIds]
    );

    const questionMap = {};
    const allQuestionIds = new Set();

    for (const row of examQuestionsRows) {
      const questions = JSON.parse(row.question_data);
      questionMap[row.exam_id] = questions;
      questions.forEach((q) => allQuestionIds.add(q.questionId));
    }

    const questionBankRows =
      allQuestionIds.size > 0
        ? await sqlQuery(
            `
      SELECT * FROM question_bank WHERE id IN (?)
    `,
            [[...allQuestionIds]]
          )
        : [];

    const examsWithQuestions = exams.map((exam) => {
      const rawQuestions = questionMap[exam.id] || [];

      const questions = rawQuestions.map((q) => {
        const full = questionBankRows.find((row) => row.id === q.questionId);
        if (!full) return null;

        return {
          id: q.questionId,
          points: q.points,
          question_text: full.question_text,
          question_type: full.question_type,
          choices: full.choices ? JSON.parse(full.choices) : null,
          correct_answer: full.correct_answer
            ? JSON.parse(full.correct_answer)
            : null,
        };
      });

      return { ...exam, questions };
    });

    return examsWithQuestions;
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
