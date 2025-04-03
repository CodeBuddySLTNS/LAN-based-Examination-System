const Joi = require("joi");
const QuestionModel = require("../database/models/question");
const { validateQuestion } = require("../utils/validator");
const { CREATED, BAD_REQUEST, FORBIDDEN } = require("../constants/statusCodes");
const CustomError = require("../utils/customError");
const UserModel = require("../database/models/user");

const Question = new QuestionModel();
const User = new UserModel();

const questions = async (req, res) => {
  const questions = await Question.getAll();
  res.send(questions);
};

const questionInfo = async (req, res) => {
  const { qId } = req.query;
  console.log(req.query);
  const info = await Question.getQuestionInfo(qId);
  res.json({ info });
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
  const { questionId } = req.body;
  const { userId } = res.locals;

  const user = await User.getUserInfo(userId);
  const whitelist = ["Admin", "Faculty"];

  if (!whitelist.includes(user?.role)) {
    throw new CustomError(
      "You are not authorized to perform this action",
      FORBIDDEN
    );
  }

  if (!questionId || !userId) {
    throw new CustomError("Invalid request", BAD_REQUEST);
  }

  const result = await Question.deleteQuestion(questionId, userId);
  res.status(CREATED).send({
    action: "delete",
    message: `Question deleted successfully.`,
    result,
  });
};

const editQuestion = async (req, res) => {
  const result = await Question.editQuestion(req.body.questionId);
  res.status(CREATED).send({ action: "edit", result });
};

module.exports = {
  questions,
  questionInfo,
  addQuestion,
  deleteQuestion,
  editQuestion,
};
