const ExamModel = require("../database/models/exam");

const Exam = new ExamModel();

const exams = async (req, res) => {
  const exams = await Exam.getAll();
  res.send(exams);
};

module.exports = { exams };
