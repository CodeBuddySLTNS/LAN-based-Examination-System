const QuestionModel = require("../database/models/question");
const Question = new QuestionModel();
const { CREATED } = require("../constants/statusCodes");

const questions = async (req, res) => {
  const result = await Question.getAll();
  res.json({ result });
};

const addQuestion = async (req, res) => {
  const q = "Who is Renz?";
  const correct = JSON.stringify(["He is a dev."]);
  const incorrect = JSON.stringify([
    "He is idiot.",
    "He is noob.",
    "He is broke."
  ]);
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
