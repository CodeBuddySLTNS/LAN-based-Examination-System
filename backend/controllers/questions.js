const Joi = require("joi");
const QuestionModel = require("../database/models/question");
const { validateQuestion } = require("../utils/validator");
const { CREATED, BAD_REQUEST } = require("../constants/statusCodes");
const CustomError = require("../utils/customError");

const Question = new QuestionModel();

const questions = async (req, res) => {
  const result = await Question.getAll();
  res.json({ result });
};

const addQuestion = async (req, res) => {
  const { error, value } = validateQuestion(req.body);

  if (error) {
    throw new CustomError(error.message, BAD_REQUEST);
  }

  const q = value.question;
  const correct = JSON.stringify([value.correctAnswer]);
  const incorrect = JSON.stringify([value.incorrectAnswer]);

  const result = await Question.add(1, q, correct, incorrect);
  res.status(CREATED).send(result);
};

const deleteQuestion = async (req, res) => {
  res.send("deleteQuestion");
};

const editQuestion = async (req, res) => {
  res.send("editQuestion");
};

module.exports = {
  questions,
  addQuestion,
  deleteQuestion,
  editQuestion
};
