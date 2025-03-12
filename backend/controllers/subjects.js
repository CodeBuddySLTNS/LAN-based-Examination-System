const { BAD_REQUEST } = require("../constants/statusCodes");
const SubjectModel = require("../database/models/subject");
const CustomError = require("../utils/customError");

const Subject = new SubjectModel();

const subjects = async (req, res) => {
  const subjects = await Subject.getAll();
  res.send(subjects || []);
};

const addSubject = async (req, res) => {
  const { courseCode, name } = req.body;
  const { userId } = res.locals;

  if (courseCode && name) {
    const result = await Subject.addSubject(userId, courseCode, name);
    return res.json({ result });
  }

  throw new CustomError(
    "Course code and name of the subject is required.",
    BAD_REQUEST
  );
};

const editSubject = async (req, res) => {
  const result = await Subject.addSubject();
  res.json({ result });
};

const deleteSubject = async (req, res) => {
  const result = await Subject.addSubject();
  res.json({ result });
};

module.exports = {
  subjects,
  addSubject,
  editSubject,
  deleteSubject,
};
