const Joi = require("joi");
const QuestionModel = require("../database/models/question");
const { validateQuestion } = require("../utils/validator");
const { CREATED, BAD_REQUEST } = require("../constants/statusCodes");
const CustomError = require("../utils/customError");

const Question = new QuestionModel();

const questions = async (req, res) => {
  const questions = await Question.getAll();
  res.json({ questions });
};

const addQuestion = async (req, res) => {
  const { error, value } = validateQuestion(req.body);
  const userId = res.locals.userId;

  if (error) {
    throw new CustomError(error.message, BAD_REQUEST);
  }

  const result = await Question.addQuestion({ userId, ...value });
  res.status(CREATED).send(result);
};

const deleteQuestion = async (req, res) => {
  const result = await Question.deleteQuestion(req.body.questionId);
  res.status(CREATED).send(result);
};

const editQuestion = async (req, res) => {
  const result = await Question.editQuestion(req.body.questionId);
  res.status(CREATED).send(result);
};

module.exports = {
  questions,
  addQuestion,
  deleteQuestion,
  editQuestion,
};
