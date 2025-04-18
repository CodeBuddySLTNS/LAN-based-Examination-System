const ExamModel = require("../database/models/exam");
const ExamQuestionModel = require("../database/models/exam_question");
const CustomError = require("../utils/customError");
const { validateExam, validateMultiResponse } = require("../utils/validator");
const { BAD_REQUEST, SUCCESS, FORBIDDEN } = require("../constants/statusCodes");
const UserModel = require("../database/models/user");
const ResponseModel = require("../database/models/response");
const CompletedExamModel = require("../database/models/completed_exam");

const User = new UserModel();
const Exam = new ExamModel();
const ExamQuestion = new ExamQuestionModel();
const Response = new ResponseModel();
const CompletedExam = new CompletedExamModel();

const exams = async (req, res) => {
  const { id, department, year } = req.query;

  if (id) return res.send(polishExamResponse(await Exam.getExamById(id)));

  if (department && year)
    return res.send(
      polishExamResponse(await Exam.getExamsByDepartment(department, year))
    );

  const exams = polishExamResponse(await Exam.getAll());

  res.send(exams);

  function polishExamResponse(exams) {
    exams.forEach((exam) => {
      exam.duration = `${exam.duration_hours} ${
        exam.duration_hours > 1 ? "hours" : "hour"
      } ${
        exam.duration_minutes ? ` and ${exam.duration_minutes} minutes` : ""
      }`;
      exam.is_started = exam.is_started === 1 ? true : false;
      exam.is_expired = exam.is_expired === 1 ? true : false;
    });
    return exams;
  }
};

const addExam = async (req, res) => {
  const { error, value } = validateExam(req.body);
  const userId = res.locals.userId;

  if (error) {
    throw new CustomError(error.message, BAD_REQUEST, error);
  }

  const result = await Exam.addExam(userId, value);
  await ExamQuestion.addExamQuestion(result.insertId, value.questions);
  res.send(result);
};

const editExam = async (req, res) => {
  const isQuestionsOnly = req.params.mode === "questions";
  const { error, value } = validateExam(req.body);
  const userId = res.locals.userId;

  if (error) {
    throw new CustomError(error.message, BAD_REQUEST, error);
  }

  if (isQuestionsOnly) {
    const result = await ExamQuestion.editExamQuestion(
      value.examId,
      value.questions
    );

    return res.json({ message: "Questions updated successfully.", result });
  }

  const result = await Exam.editExam(userId, value);
  res.json(result);
};

const deleteExam = async (req, res) => {
  const userId = res.locals.userId;
  const examId = req.params.id;
  const user = await User.getUserInfo(userId);
  const whitelist = ["Admin", "Faculty"];

  if (!whitelist.includes(user?.role)) {
    throw new CustomError(
      "You are not authorized to perform this action",
      FORBIDDEN
    );
  }

  const result = await Exam.deleteExam(userId, examId);
  console.log(result);
  res.send({ message: "Successfully deleted.", result });
};

const startExam = async (req, res) => {
  const { examId, stop } = req.body;

  if (examId) {
    return res.send(await Exam.startExam(examId, stop));
  }

  throw new CustomError("Exam Id is required.", BAD_REQUEST);
};

const expireExam = async (req, res) => {
  const { examId, enable } = req.body;
  console.log(req.body);
  if (examId) {
    return res.send(await Exam.expireExam(examId, enable));
  }

  throw new CustomError("Exam Id is required.", BAD_REQUEST);
};

const handleMultipleSubmissions = async (req, res) => {
  const { error, value } = validateMultiResponse(req.body);
  const userId = res.locals.userId;

  if (error) {
    throw new CustomError(error.message, BAD_REQUEST);
  }

  await Response.addMultipleResponse(userId, value.examId, value.responses);
  await CompletedExam.completeExam(userId, value.examId);
  const results = await Response.checkAnswers(userId, value.examId);
  res.send(results);
};

module.exports = {
  exams,
  addExam,
  editExam,
  deleteExam,
  startExam,
  expireExam,
  handleMultipleSubmissions,
};
