const { Server } = require("socket.io");
const handler = require("./events-handler");

const activeUsers = new Object();

const socketConnection = (server) => {
  const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    // handle connection event
    handler.onconnect({ socket, activeUsers });

    // handle start exam event
    socket.on("startExam", (data) =>
      handler.startExam({ socket, activeUsers, data })
    );

    // handle exam event
    socket.on("takeExam", (examId) =>
      handler.takeExam({ socket, activeUsers, examId })
    );

    // handle exam progress event
    socket.on("examProgress", (data) =>
      handler.examProgress({ socket, activeUsers, data })
    );

    // handle finish exam event
    socket.on("finishExam", (data) =>
      handler.finishExam({ socket, activeUsers, data })
    );

    // handle user disconnected
    socket.on("disconnect", () => handler.disconnect({ socket, activeUsers }));
  });
};

module.exports = socketConnection;
