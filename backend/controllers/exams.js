const { BAD_REQUEST } = require("../constants/statusCodes");
const ExamModel = require("../database/models/exam");
const CustomError = require("../utils/customError");
const { validateExam } = require("../utils/validator");

const Exam = new ExamModel();

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
  res.send(result);
};

const editExam = async (req, res) => {
  const { error, value } = validateExam(req.body);
  const userId = res.locals.userId;

  if (error) {
    throw new CustomError(error.message, BAD_REQUEST, error);
  }

  const result = await Exam.editExam(userId, value);
  res.send(result);
};

const deleteExam = async (req, res) => {
  const userId = res.locals.userId;
  const examId = req.params.id;

  const result = await Exam.deleteExam(userId, examId);
  res.send(result);
};

module.exports = { exams, addExam, editExam, deleteExam };
