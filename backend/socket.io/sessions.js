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
    return null;
  }
};

module.exports = { createSession, getSession };
