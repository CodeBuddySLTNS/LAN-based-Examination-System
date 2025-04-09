const { createSession } = require("./sessions");

const onconnect = ({ socket, activeUsers }) => {
  if (!activeUsers[socket.id]) {
    const query = socket.handshake.query;
    const user = {
      id: query.id,
      name: query.name,
      username: query.username,
      department: query.department,
      year: query.year,
      role: query.role,
      isVerified: query.isVerified,
    };
    activeUsers[socket.id] = user;
    console.log(socket.handshake.query.name, "connected");
  }
};

const startExam = ({ socket, activeUsers, data }) => {
  console.log(
    activeUsers[socket.id].name + " is taking exam on examId: " + data
  );
};

const takeExam = async ({ socket, activeUsers, data }) => {
  await createSession(12, { examId: 12, endTime: Date.now() });
  console.log(
    activeUsers[socket.id].name + " is taking exam on examId: " + data
  );
};

const examProgress = ({ socket, activeUsers, data }) => {
  console.log(
    `${activeUsers[socket.id].name} is on number ${data.progress} at examId: ${
      data.examId
    }`
  );
};

const finishExam = ({ socket, activeUsers, data }) => {
  console.log(data);
};

const disconnect = ({ socket, activeUsers }) => {
  if (activeUsers[socket.id])
    console.log(activeUsers[socket.id].name, "disconnected.");
};

module.exports = {
  onconnect,
  startExam,
  takeExam,
  examProgress,
  finishExam,
  disconnect,
};
