const { Server } = require("socket.io");
const handler = require("./events-handler");
const webappHandler = require("./webapp-event-listeners");

const activeUsers = new Object();

const socketConnection = (server) => {
  const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    // handle connection event
    handler.onconnect({ socket, activeUsers });

    /* For Web App (Faculty) event listeners */

    // handle start exam event
    socket.on("startExam", (data) =>
      webappHandler.startExam({ io, socket, activeUsers, data })
    );

    // for fetching the current users taking exam
    socket.on("getUsersTakingExam", (examId) =>
      webappHandler.usersTakingExam({ io, socket, activeUsers, examId })
    );

    /* For Mobile App (Students) event listeners */

    // handle exam event
    socket.on("takeExam", (examId) =>
      handler.takeExam({ io, socket, activeUsers, examId })
    );

    // handle exam progress event
    socket.on("examProgress", (data) =>
      handler.examProgress({ io, socket, activeUsers, data })
    );

    // handle finish exam event
    socket.on("finishExam", (data) =>
      handler.finishExam({ io, socket, activeUsers, data })
    );

    // handle user disconnected
    socket.on("disconnect", () => handler.disconnect({ socket, activeUsers }));
  });
};

module.exports = socketConnection;
