const fs = require("fs/promises");
const path = require("path");
const CustomError = require("../utils/customError");

const createSession = async (examId, sessionData) => {
  const sessionPath = path.join(__dirname, "temp", `exam-${examId}.json`);
  try {
    await fs.writeFile(sessionPath, JSON.stringify(sessionData, null, 2));
  } catch (error) {
    console.log("Error creating session:", error);
  }
};

const getSession = async (examId) => {
  try {
    const sessionPath = path.join(__dirname, "temp", `exam-${examId}.json`);
    return JSON.parse(await fs.readFile(sessionPath, "utf-8"));
  } catch (error) {
    console.log("Error getting session:", error);
    return null;
  }
};

const getAllUsersTakingExam = async (examId) => {
  try {
    const sessionPath = path.join(__dirname, "temp", `exam-${examId}.json`);
    return JSON.parse(await fs.readFile(sessionPath, "utf-8")).usersTakingExam;
  } catch (error) {
    return null;
  }
};

const addUserTakingExam = async (examId, user) => {
  try {
    const sessionPath = path.join(__dirname, "temp", `exam-${examId}.json`);
    const session = JSON.parse(await fs.readFile(sessionPath, "utf-8"));
    let notFound = true;
    session.usersTakingExam.forEach((u) => {
      if (u.id === user.id) return (notFound = false);
    });

    if (notFound) {
      session.usersTakingExam.push(user);
      await fs.writeFile(sessionPath, JSON.stringify(session, null, 2));
    }
  } catch (error) {
    console.log("Error Adding UserTakingExam:", error);
    return null;
  }
};

const updateUsersTakingExam = async (examId, userId, property, value) => {
  try {
    if (property) {
      const sessionPath = path.join(__dirname, "temp", `exam-${examId}.json`);
      const session = JSON.parse(await fs.readFile(sessionPath, "utf-8"));

      switch (property) {
        case "progress":
          session.usersTakingExam = session.usersTakingExam.map((user) => {
            if (user.id === userId) {
              return { ...user, progress: value };
            }
            return user;
          });
          break;

        case "completed":
          session.completed = value || session.completed;
          break;
      }

      await fs.writeFile(sessionPath, JSON.stringify(session, null, 2));
    }
  } catch (error) {
    console.log("Error Adding UserTakingExam:", error);
    return null;
  }
};

module.exports = {
  createSession,
  getSession,
  addUserTakingExam,
  getAllUsersTakingExam,
  updateUsersTakingExam,
};
