const { createSession } = require("./sessions");

const onconnect = ({ socket, activeUsers }) => {
  const query = socket.handshake.query;
  if (!activeUsers[query.id]) {
    const user = {
      id: query.id,
      name: query.name,
      username: query.username,
      department: query.department,
      year: query.year,
      role: query.role,
      isVerified: query.isVerified,
      socketId: socket.id,
    };
    activeUsers[query.id] = user;
    console.log(socket.handshake.query.name, "connected");
  }
};

const startExam = ({ socket, activeUsers, data }) => {
  console.log(
    activeUsers[socket.id].name + " is taking exam on examId: " + data
  );
};

const takeExam = async ({ socket, activeUsers, data }) => {
  // await createSession(12, { examId: 12, endTime: Date.now() });
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
  const userId = Object.keys(activeUsers).find(
    (id) => activeUsers[id].socketId === socket.id
  );
  console.log(typeof userId);

  if (userId) console.log(activeUsers[userId].name, "disconnected.");
  delete activeUsers[userId];
};

module.exports = {
  onconnect,
  startExam,
  takeExam,
  examProgress,
  finishExam,
  disconnect,
};
