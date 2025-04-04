const ExamModel = require("../database/models/exam");
const ExamQuestionModel = require("../database/models/exam_question");
const CustomError = require("../utils/customError");
const { validateExam, validateMultiResponse } = require("../utils/validator");
const { BAD_REQUEST, SUCCESS, FORBIDDEN } = require("../constants/statusCodes");
const UserModel = require("../database/models/user");
const ResponseModel = require("../database/models/response");

const User = new UserModel();
const Exam = new ExamModel();
const ExamQuestion = new ExamQuestionModel();
const Response = new ResponseModel();

const exams = async (req, res) => {
  const exams = await Exam.getAll();
  res.send(exams);
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

const handleMultipleSubmissions = async (req, res) => {
  const { error, value } = validateMultiResponse(req.body);
  const userId = res.locals.userId;

  if (error) {
    throw new CustomError(error.message, BAD_REQUEST);
  }

  console.log(value);

  const result = await Response.addMultipleResponse(
    userId,
    value.examId,
    value.responses
  );
  res.send(result);
};

module.exports = {
  exams,
  addExam,
  editExam,
  deleteExam,
  handleMultipleSubmissions,
};
