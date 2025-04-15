const {
  createSession,
  getSession,
  addUserTakingExam,
  getAllUsersTakingExam,
  updateUsersTakingExam,
} = require("./sessions");

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

const takeExam = async ({ io, socket, activeUsers, examId }) => {
  const session = await getSession(examId);
  const userId = Object.keys(activeUsers).find(
    (id) => activeUsers[id].socketId === socket.id
  );

  console.log(
    activeUsers[userId].name + " is taking exam on examId: " + examId,
    session
  );

  const user = {
    id: activeUsers[userId].id,
    name: activeUsers[userId].name,
    completed: false,
    progress: 1,
  };

  await addUserTakingExam(examId, user);

  // send to the mobile app (students)
  socket.emit("examStatus", session);
  // send to the web app (faculty)
  io.emit("userTakingExam", { ...session, user: activeUsers[userId] });
};

const examProgress = async ({ socket, activeUsers, data }) => {
  await updateUsersTakingExam(
    data.examId,
    data.userId,
    "progress",
    data.progress
  );
  const users = await getAllUsersTakingExam(data.examId);
  socket.emit("allUsersTakingExam", users);
};

const finishExam = async ({ socket, activeUsers, data }) => {
  await updateUsersTakingExam(data.examId, data.userId, "completed", true);
  const users = await getAllUsersTakingExam(data.examId);
  socket.emit("allUsersTakingExam", users);
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
  takeExam,
  examProgress,
  finishExam,
  disconnect,
};
