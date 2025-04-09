const fs = require("fs").promises;
const path = require("path");

const createSession = async (examId, sessionData) => {
  const sessionPath = path.join(examId, ".json");
  try {
    await fs.writeFile(sessionPath, JSON.stringify(sessionData, null, 2));
  } catch (error) {
    console.log("Error creating session:", error);
  }
};

module.exports = { createSession };
