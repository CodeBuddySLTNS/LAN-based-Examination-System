const {} = require("../database/sqlQuery");

const questions = async (req, res) => {
  res.json({
    questions: []
  });
};

const addQuestion = async (req, res) => {
  res.send("addQuestion");
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
