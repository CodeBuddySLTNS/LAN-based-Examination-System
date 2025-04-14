const { createSession, getSession } = require("./sessions");

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

const startExam = async ({ socket, activeUsers, data }) => {
  console.log(data?.stop ? "exam stopped" : "exam started");
  const examId = data?.exam?.id;
  const endTime =
    Date.now() +
    (data?.exam?.duration_hours * 60 + data?.exam?.duration_minutes) *
      60 *
      1000;
  await createSession(examId, { examId, endTime });
  console.log(await getSession(examId));
  const userId = Object.keys(activeUsers).find(
    (id) => activeUsers[id].socketId === socket.id
  );
};

const takeExam = async ({ socket, activeUsers, examId }) => {
  const session = await getSession(examId);
  const userId = Object.keys(activeUsers).find(
    (id) => activeUsers[id].socketId === socket.id
  );

  console.log(
    activeUsers[userId].name + " is taking exam on examId: " + examId,
    session
  );
  socket.emit("examStatus", session);
};

const examProgress = ({ socket, activeUsers, data }) => {
  const userId = Object.keys(activeUsers).find(
    (id) => activeUsers[id].socketId === socket.id
  );

  console.log(
    `${activeUsers[userId].name} is on number ${data.progress} at examId: ${data.examId}`
  );
};

const finishExam = ({ socket, activeUsers, data }) => {
  console.log(data);
};

const disconnect = ({ socket, activeUsers }) => {
  const userId = Object.keys(activeUsers).find(
    (id) => activeUsers[id].socketId === socket.id
  );

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
