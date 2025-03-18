const { BAD_REQUEST } = require("../constants/statusCodes");
const SubjectModel = require("../database/models/subject");
const CustomError = require("../utils/customError");

const Subject = new SubjectModel();

const subjects = async (req, res) => {
  const subjects = await Subject.getAll();
  res.send(subjects || []);
};

const addSubject = async (req, res) => {
  const { courseCode, subjectName } = req.body;
  const { userId } = res.locals;

  if (courseCode && subjectName) {
    const result = await Subject.addSubject(userId, courseCode, subjectName);
    return res.json({ result });
  }

  throw new CustomError(
    "Course code and name of the subject is required.",
    BAD_REQUEST
  );
};

const editSubject = async (req, res) => {
  const { courseCode, subjectName } = req.body;

  if (!courseCode && !subjectName) {
    throw new CustomError(
      "Course code and subject name is required.",
      BAD_REQUEST
    );
  }

  const result = await Subject.editSubject();
  res.json({ message: "Updated Successfully", result });
};

const deleteSubject = async (req, res) => {
  const { subjectId } = req.body;

  const userId = res.locals.userId;
  const result = await Subject.deleteSubject(subjectId, userId);
  res.json({ message: "Deleted Successfully", result });
};

module.exports = {
  subjects,
  addSubject,
  editSubject,
  deleteSubject,
};
