const fs = require("fs/promises");
const path = require("path");
const { getAllUsersTakingExam, createSession } = require("./sessions");

const startExam = async ({ socket, activeUsers, data }) => {
  try {
    const examId = data?.exam?.id;
    const endTime =
      Date.now() +
      (data?.exam?.duration_hours * 60 + data?.exam?.duration_minutes) *
        60 *
        1000;
    await createSession(examId, {
      examId,
      endTime,
      examinerId: data?.exam?.examiner_id,
      usersTakingExam: [],
    });
  } catch (error) {
    console.log("Error in starting exam:", error);
  }
};

const usersTakingExam = async ({ socket, activeUsers, examId }) => {
  try {
    const sessionPath = path.join(__dirname, "temp", `exam-${examId}.json`);
    const users = await getAllUsersTakingExam(examId);
    socket.emit("allUsersTakingExam", users);
  } catch (error) {
    console.log("Error fetching users taking exam:", error);
  }
};

module.exports = { startExam, usersTakingExam };
